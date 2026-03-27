import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';
import { setAlert } from './alertSlice';
import { addAnimal, deleteAnimal } from './animalsSlice';

const ANIMAL_SELECT = `
  id, name, type, identity, image_path, user_id, bio, street_id, locality_id, created_at,
  animal_spay ( status, hospital, spay_date, cost ),
  animal_vaccines ( id, vaccine_name, date_taken, date_due, cost ),
  animal_misc ( id, ailment, description )
`;

// Transform raw Supabase animal row into shape components expect (similar to animalsSlice)
const transformAnimal = (row) => {
  const spay = row.animal_spay?.[0] ?? {};
  return {
    ...row,
    _id: row.id,
    image: row.image_path ?? null,
    user: row.user_id,
    medical: {
      spayed: {
        status: spay.status ?? 2,
        hospital: spay.hospital ?? null,
        date: spay.spay_date ?? null,
        cost: spay.cost ?? null,
      },
      vaccines: (row.animal_vaccines ?? []).map((v) => ({
        ...v,
        _id: v.id,
        vaccinename: v.vaccine_name,
        vaccineDateTaken: v.date_taken ?? '',
        vaccineDateDue: v.date_due ?? '',
      })),
      misc: (row.animal_misc ?? []).map((m) => ({ ...m, _id: m.id })),
    },
  };
};

let abortController = null;

export const setCurrentStreet = createAsyncThunk(
  'street/setCurrent',
  async ({ pStreetName, pLocalityName }, { dispatch, signal, rejectWithValue }) => {
    if (abortController) abortController.abort();
    abortController = new AbortController();
    try {
      // 1. Get locality details using locality_unique (pLocalityName)
      const { data: localityData, error: localityError } = await supabase
        .from('localities')
        .select('id, locality_unique, locality')
        .eq('locality_unique', pLocalityName.toLowerCase())
        .abortSignal(signal)
        .single();
      
      if (localityError || !localityData) throw new Error('Locality not found');

      // 2. Get street
      const { data: streetData, error: streetError } = await supabase
        .from('streets')
        .select('*')
        .eq('locality_id', localityData.id)
        .eq('streetname', pStreetName)
        .abortSignal(signal)
        .single();

      if (streetError || !streetData) throw new Error('Street not found');

      // 3. Get animals
      const { data: animals, error: animalsError } = await supabase
        .from('animals')
        .select(ANIMAL_SELECT)
        .eq('street_id', streetData.id)
        .abortSignal(signal);

      if (animalsError) throw new Error('Animals not found');

      const cats = [];
      const dogs = [];
      
      animals.forEach((animalRow) => {
        const animal = transformAnimal(animalRow);
        if (animal.type === 'cat') cats.push(animal);
        else if (animal.type === 'dog') dogs.push(animal);
      });

      return {
        ...streetData,
        _id: streetData.id,
        locality: {
          _id: localityData.id,
          locality_unique: localityData.locality_unique,
          locality: localityData.locality
        },
        cats,
        dogs
      };
    } catch (error) {
      if (error.name === 'AbortError') return rejectWithValue('aborted');
      dispatch(setAlert('Connection error! Please try again...', 'danger'));
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStreetData = createAsyncThunk(
  'street/fetchData',
  async (localityId, { dispatch, rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('streets')
        .select('*')
        .eq('locality_id', localityId);

      if (error) throw new Error(error.message);
      
      return data.map((st) => ({ ...st, _id: st.id }));
    } catch (error) {
      dispatch(setAlert('Connection error! Please try again...', 'danger'));
      return rejectWithValue(error.message);
    }
  }
);

const streetSlice = createSlice({
  name: 'street',
  initialState: {
    loading: false,
    street: null,
    streets: [],
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentStreet.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCurrentStreet.fulfilled, (state, action) => {
        if (action.payload === 'aborted') return;
        state.street = action.payload;
        state.loading = false;
      })
      .addCase(setCurrentStreet.rejected, (state, action) => {
        if (action.payload === 'aborted') return;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchStreetData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStreetData.fulfilled, (state, action) => {
        state.streets = action.payload;
        state.loading = false;
      })
      .addCase(fetchStreetData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Cross-slice: react to animal add/delete
      .addCase(addAnimal.fulfilled, (state, action) => {
        if (!state.street) return;
        const key = `${action.payload.type}s`;
        state.street[key] = [...(state.street[key] ?? []), action.payload.animal];
        state.loading = false;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        if (!state.street) return;
        const key = `${action.payload.type}s`;
        state.street[key] = (state.street[key] ?? []).filter(
          (animal) => animal._id !== action.payload.animalId
        );
        state.loading = false;
      });
  },
});

export default streetSlice.reducer;
