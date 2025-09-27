import { supabase } from "@/lib/supabaseClient";

export async function getCurrentUserId(): Promise<string|null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export type Role = 'admin'|'manager'|'recruiter'|'viewer';

export async function getUserRoleClient(): Promise<Role|null> {
  const uid = await getCurrentUserId();
  if (!uid) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', uid)
    .maybeSingle();
  if (error) return null;
  return (data?.role as Role) ?? 'viewer';
}
