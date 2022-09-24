import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_PUBLIC_ANON_KEY = process.env.SUPABASE_PUBLIC_ANON_KEY || '';
const SUPABASE_ADMIN_KEY = process.env.SUPABASE_ADMIN_KEY || '';

export const supabase = createClient(
	SUPABASE_URL,
	SUPABASE_PUBLIC_ANON_KEY,
);

export const supabaseAdmin = createClient(
	SUPABASE_URL,
	SUPABASE_ADMIN_KEY,
);
