import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';
import { setAlert } from './alertSlice';

export const setLocality = createAsyncThunk(
  'locality/set',
  async (locality, { dispatch, rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('localities')
        .select('*')
        .eq('locality_unique', locality.toLowerCase())
        .single();
        
      if (error) throw new Error('Error fetching Locality!');
      
      return { ...data, _id: data.id };
    } catch (error) {
      dispatch(setAlert('Please try again..', 'danger'));
      return rejectWithValue('Error fetching Locality!');
    }
  }
);

const localitySlice = createSlice({
  name: 'locality',
  initialState: {
    locality: null,
    loading: true,
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLocality.pending, (state) => {
        state.loading = true;
      })
      .addCase(setLocality.fulfilled, (state, action) => {
        state.locality = action.payload;
        state.loading = false;
      })
      .addCase(setLocality.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default localitySlice.reducer;
