import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';
import { setAlert } from './alertSlice';

// Fetch the current session user + their profile row
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return rejectWithValue('No session');

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, role, locality:localities(locality, locality_unique)')
      .eq('id', user.id)
      .single();

    if (profileError) return rejectWithValue(profileError.message);

    return {
      _id: user.id,
      id: user.id,
      email: user.email,
      name: profile.name,
      role: profile.role,
      locality: profile.locality,
    };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { dispatch, rejectWithValue }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      dispatch(setAlert(error.message, 'danger', 3500, true));
      return rejectWithValue(error.message);
    }
    dispatch(loadUser());
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (formData, { dispatch, rejectWithValue }) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // These are stored in auth.users.raw_user_meta_data
        // The DB trigger reads them to create the profile row
        data: {
          name: formData.name,
          locality: formData.locality, // locality_unique string
        },
      },
    });
    if (error) {
      dispatch(setAlert(error.message, 'danger'));
      return rejectWithValue(error.message);
    }
    dispatch(
      setAlert(
        'Verification email sent. Please check your inbox (and spam folder).',
        'success',
        10000
      )
    );
  }
);

export const sendVerification = createAsyncThunk(
  'auth/sendVerification',
  async (email, { rejectWithValue }) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) return rejectWithValue(error.message);
  }
);

export const logout = () => async (dispatch) => {
  await supabase.auth.signOut();
  dispatch(authSlice.actions.loggedOut());
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedin: false,
    loading: true,
    user: null,
    needsVerification: false,
    error: {},
  },
  reducers: {
    loggedOut: (state) => {
      state.loading = false;
      state.isLoggedin = false;
      state.user = null;
      state.error = {};
    },
    // Called by App.js when Supabase fires onAuthStateChange
    sessionRestored: (state) => {
      state.loading = false;
    },
    enableVerification: (state) => {
      state.loading = false;
      state.needsVerification = true;
    },
    accountVerified: (state) => {
      state.loading = true;
      state.needsVerification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isLoggedin = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isLoggedin = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        // user is set via the subsequent loadUser dispatch
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedin = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendVerification.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { accountVerified, enableVerification, sessionRestored } = authSlice.actions;
export default authSlice.reducer;
