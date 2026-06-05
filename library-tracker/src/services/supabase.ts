import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "fggnzlulyqesosgksoqk";
const supabaseAnonKey = "sb_publishable_rKKWYgbMU4ul5R2d75_c1Q_l_iAsYT6";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);