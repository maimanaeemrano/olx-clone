import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tnidhxkqowwyriepwnpt.supabase.co'
const supabaseKey = 'sb_publishable_iNsMAt-04Tpr8Zj2SC1JDA_lmWlCt52'
export const supabase = createClient(supabaseUrl, supabaseKey)