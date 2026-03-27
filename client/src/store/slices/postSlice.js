import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';
import { uploadFile, removeFile } from '../../utils/supabase';
import { setAlert } from './alertSlice';

// Transform a raw Supabase post row into the shape components expect
const transformPost = (row) => ({
  ...row,
  _id: row.id,
  image: row.image_path ?? null,
  locationState: {
    center: row.location_center ?? [],
    zoom: row.location_zoom ?? 17,
  },
  user: row.profiles
    ? {
        _id: row.profiles.id,
        name: row.profiles.name,
        locality: row.profiles.locality ?? null,
      }
    : { _id: row.user_id, name: '' },
  createdAt: row.created_at,
  comments: row.comments ?? [],
});

const POST_SELECT = `
  *,
  profiles!user_id (
    id, name,
    locality:localities ( locality, locality_unique )
  )
`;

const POST_DETAIL_SELECT = `
  *,
  profiles!user_id (
    id, name,
    locality:localities ( locality, locality_unique )
  ),
  comments (
    id, text, user_id, created_at,
    profiles!user_id ( name )
  )
`;

export const getAllPosts = createAsyncThunk(
  'post/getAll',
  async (_, { dispatch, rejectWithValue }) => {
    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .order('created_at', { ascending: false });

    if (error) {
      dispatch(setAlert('Please try again...', 'danger'));
      return rejectWithValue(error.message);
    }
    return data.map(transformPost);
  }
);

export const getPost = createAsyncThunk(
  'post/getOne',
  async (postId, { dispatch, rejectWithValue }) => {
    const { data, error } = await supabase
      .from('posts')
      .select(POST_DETAIL_SELECT)
      .eq('id', postId)
      .single();

    if (error) {
      dispatch(setAlert('Please try again...', 'danger'));
      return rejectWithValue(error.message);
    }

    const post = transformPost(data);
    // Normalise comments shape for components
    post.comments = (data.comments ?? [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((c) => ({
        ...c,
        _id: c.id,
        name: c.profiles?.name ?? '',
        date: c.created_at,
      }));
    return post;
  }
);

export const createPost = createAsyncThunk(
  'post/create',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Upload image if provided
      let imagePath = null;
      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        imagePath = await uploadFile('post-images', path, imageFile);
      }

      const locationState = JSON.parse(formData.get('locationState') || '{"center":[],"zoom":17}');

      const payload = {
        title: formData.get('title'),
        text: formData.get('text'),
        tag: formData.get('tag'),
        urgency: formData.get('urgency'),
        status: formData.get('status') || 'open',
        user_id: user.id,
        image_path: imagePath,
        location_center: locationState.center,
        location_zoom: locationState.zoom,
      };

      const { data, error } = await supabase
        .from('posts')
        .insert(payload)
        .select(POST_SELECT)
        .single();

      if (error) throw new Error(error.message);
      return transformPost(data);
    } catch (err) {
      dispatch(setAlert('Please try again...', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  'post/edit',
  async ({ formData, postId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Check if a new image file was supplied
      let imagePath = formData.get('image');
      const isFileObject = imagePath instanceof File && imagePath.size > 0;
      if (isFileObject) {
        const ext = imagePath.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        imagePath = await uploadFile('post-images', path, imagePath);
      } else {
        // Keep existing image_path
        const { data: existing } = await supabase
          .from('posts').select('image_path').eq('id', postId).single();
        imagePath = existing?.image_path ?? null;
      }

      const locationState = JSON.parse(formData.get('locationState') || '{"center":[],"zoom":17}');

      const payload = {
        title: formData.get('title'),
        text: formData.get('text'),
        tag: formData.get('tag'),
        urgency: formData.get('urgency'),
        status: formData.get('status'),
        image_path: imagePath,
        location_center: locationState.center,
        location_zoom: locationState.zoom,
      };

      const { data, error } = await supabase
        .from('posts')
        .update(payload)
        .eq('id', postId)
        .select(POST_SELECT)
        .single();

      if (error) throw new Error(error.message);
      return { post: transformPost(data), id: postId };
    } catch (err) {
      dispatch(setAlert('Connection error! Please try again...', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  'post/uploadImage',
  async ({ formData, postId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const imageFile = formData.get('image');
      if (!imageFile || imageFile.size === 0) throw new Error('No file');

      const ext = imageFile.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const publicUrl = await uploadFile('post-images', path, imageFile);

      // Remove old image if any
      const { data: existing } = await supabase
        .from('posts').select('image_path').eq('id', postId).single();
      if (existing?.image_path) await removeFile('post-images', existing.image_path);

      const { data, error } = await supabase
        .from('posts')
        .update({ image_path: publicUrl })
        .eq('id', postId)
        .select(POST_SELECT)
        .single();

      if (error) throw new Error(error.message);
      return { postId, post: transformPost(data) };
    } catch (err) {
      dispatch(setAlert('Please try again...', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const removePost = createAsyncThunk(
  'post/remove',
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      // Delete image from storage first
      const { data: existing } = await supabase
        .from('posts').select('image_path').eq('id', postId).single();
      if (existing?.image_path) await removeFile('post-images', existing.image_path);

      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) throw new Error(error.message);
      return postId;
    } catch (err) {
      dispatch(setAlert('Post Error!', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ formData, postId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles').select('name').eq('id', user.id).single();

      const { data, error } = await supabase
        .from('comments')
        .insert({ post_id: postId, user_id: user.id, text: formData.text })
        .select('id, text, user_id, created_at')
        .single();

      if (error) throw new Error(error.message);
      dispatch(setAlert('Comment added!', 'success'));
      return { ...data, _id: data.id, name: profile?.name ?? '', date: data.created_at };
    } catch (err) {
      dispatch(setAlert('Connection error! Please try again...', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  'post/removeComment',
  async ({ postId, commentId }, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('comments').delete().eq('id', commentId);
      if (error) throw new Error(error.message);
      dispatch(setAlert('Comment removed!', 'success'));
      return commentId;
    } catch (err) {
      dispatch(setAlert('Connection Error! Please try again...', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: null,
    loading: true,
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload.postId ? action.payload.post : p
        );
        state.loading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload.id ? action.payload.post : p
        );
        state.loading = false;
      })
      .addCase(removePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
        state.loading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.post) {
          state.post = {
            ...state.post,
            comments: [action.payload, ...(state.post.comments ?? [])],
          };
        }
        state.loading = false;
      })
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        if (state.post) {
          const id = action.payload;
          state.post = {
            ...state.post,
            comments: state.post.comments.filter((c) => c._id !== id && c.id !== id),
          };
        }
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.startsWith('post/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});

export default postSlice.reducer;
