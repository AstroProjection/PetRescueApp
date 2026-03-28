import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';
import { uploadFile, removeFile } from '../../utils/supabase';
import { setAlert } from './alertSlice';

const ANIMAL_SELECT = `
  id, name, type, identity, image_path, user_id, bio, street_id, locality_id, created_at,
  animal_spay ( status, hospital, spay_date, cost ),
  animal_vaccines ( id, vaccine_name, date_taken, date_due, cost ),
  animal_misc ( id, ailment, description )
`;

const ANIMAL_PROFILE_SELECT = `
  id, name, type, identity, image_path, user_id, bio, street_id, locality_id, location, created_at,
  locality:localities ( locality, locality_unique ),
  animal_spay ( status, hospital, spay_date, cost ),
  animal_vaccines ( id, vaccine_name, date_taken, date_due, cost ),
  animal_misc ( id, ailment, description )
`;

// Transform raw Supabase animal row into shape components expect
const transformAnimal = (row) => {
  const spay = row.animal_spay?.[0] ?? {};
  return {
    ...row,
    _id: row.id,
    image: row.image_path ?? null,
    user: row.user_id,
    locality: row.locality ?? null,
    location: row.location ?? '',
    streetInfo: row.streetInfo ?? null,
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

export const addAnimal = createAsyncThunk(
  'animals/add',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Upload image if provided
      let imagePath = null;
      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        imagePath = await uploadFile('animal-images', path, imageFile);
      }

      // Resolve street_id from streetname + locality_id
      const localityId = formData.get('locality');
      const streetname = formData.get('location');

      const { data: streetRow, error: streetError } = await supabase
        .from('streets')
        .select('id')
        .eq('locality_id', localityId)
        .eq('streetname', streetname)
        .single();

      if (streetError) throw new Error('Street not found');

      // Insert animal
      const { data: animalRow, error: animalError } = await supabase
        .from('animals')
        .insert({
          name: formData.get('name'),
          type: formData.get('type'),
          identity: parseInt(formData.get('identity') ?? '0'),
          image_path: imagePath,
          street_id: streetRow.id,
          locality_id: localityId,
          user_id: user.id,
        })
        .select(ANIMAL_SELECT)
        .single();

      if (animalError) throw new Error(animalError.message);

      // Insert spay record
      await supabase.from('animal_spay').insert({
        animal_id: animalRow.id,
        status: parseInt(formData.get('spayedValue') ?? '2'),
        hospital: formData.get('spayedHospital') || null,
        spay_date: formData.get('spayedDate') || null,
      });

      // Insert vaccines
      const vaccineEntries = formData.getAll('vaccineArr[]');
      if (vaccineEntries.length > 0) {
        const vaccines = vaccineEntries.map((v) => {
          const parsed = JSON.parse(v);
          return {
            animal_id: animalRow.id,
            vaccine_name: parsed.vaccinename,
            date_taken: parsed.vaccineDateTaken || '',
            date_due: parsed.vaccineDateDue || '',
            user_id: user.id,
          };
        });
        await supabase.from('animal_vaccines').insert(vaccines);
      }

      // Re-fetch with all relations
      const { data: fullAnimal } = await supabase
        .from('animals')
        .select(ANIMAL_SELECT)
        .eq('id', animalRow.id)
        .single();

      dispatch(setAlert('Animal Added', 'success'));
      return { animal: transformAnimal(fullAnimal), type: fullAnimal.type };
    } catch (err) {
      dispatch(setAlert('There was an error adding an animal! Try again', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async (animalId, { dispatch, rejectWithValue }) => {
    try {
      const { data: existing } = await supabase
        .from('animals').select('image_path, type').eq('id', animalId).single();

      if (existing?.image_path) await removeFile('animal-images', existing.image_path);

      const { error } = await supabase.from('animals').delete().eq('id', animalId);
      if (error) throw new Error(error.message);

      dispatch(setAlert('Animal Removed', 'danger'));
      return { animalId, type: existing?.type };
    } catch (err) {
      dispatch(setAlert('There was an error removing the animal!', 'danger'));
      return rejectWithValue(err.message);
    }
  }
);

export const getAnimalProfile = createAsyncThunk(
  'animals/getProfile',
  async (animalId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('animals')
        .select(ANIMAL_PROFILE_SELECT)
        .eq('id', animalId)
        .single();

      if (error) throw new Error(error.message);

      // Fetch street display name
      const { data: streetRow } = await supabase
        .from('streets')
        .select('display_name, streetname')
        .eq('id', data.street_id)
        .single();

      return transformAnimal({
        ...data,
        location: streetRow?.streetname ?? '',
        streetInfo: streetRow ? { displayName: streetRow.display_name } : null,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    feeders: [],
    animal: null,
    dogs: [],
    cats: [],
    loading: true,
    errors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAnimal.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(addAnimal.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(deleteAnimal.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getAnimalProfile.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(getAnimalProfile.fulfilled, (state, action) => {
        state.animal = action.payload;
        state.loading = false;
      })
      .addCase(getAnimalProfile.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default animalsSlice.reducer;
