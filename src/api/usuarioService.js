import { supabase } from './supabaseClient';

export async function getUsers() {
  const { data, error } = await supabase.from('usuario').select('*');
  if (error) console.error(error);
  return data;
}

export async function addUser(user) {
  const { data, error } = await supabase.from('usuario').insert(user);
  return { data, error };
}
