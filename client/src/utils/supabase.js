import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

// Helper: get public URL for a storage object
export const getStorageUrl = (bucket, path) => {
  if (!path) return null;
  // If already a full URL (legacy or already resolved), return as-is
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Helper: upload a file to storage, returns the public URL
export const uploadFile = async (bucket, path, file) => {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  return getStorageUrl(bucket, path);
};

// Helper: remove a file from storage
export const removeFile = async (bucket, path) => {
  if (!path) return;
  // Extract path if a full URL was stored
  const storagePath = path.startsWith('http')
    ? path.split(`/storage/v1/object/public/${bucket}/`)[1]
    : path;
  if (!storagePath) return;
  await supabase.storage.from(bucket).remove([storagePath]);
};
