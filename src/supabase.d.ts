declare module '@supabase/supabase-js' {
  import { PostgrestError, PostgrestResponse } from '@supabase/postgrest-js';

  export type SupabaseClient = {
    auth: any;
    from: (table: string) => {
      [x: string]: any;
      insert: (values: Record<string, any>[]) => Promise<{ data: any[] | null; error: PostgrestError | null }>;
    };
  };

  export function createClient(supabaseUrl: string, supabaseKey: string): SupabaseClient;
}
