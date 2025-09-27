import { supabase } from "./supabaseClient";

export async function getSessionUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
