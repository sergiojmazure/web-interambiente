import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cspucnhgbsxzgpuuokur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcHVjbmhnYnN4emdwdXVva3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTUzNTMsImV4cCI6MjA4NzQ5MTM1M30.14Ax1GOouOnB4zlHad_Gb8klQZ9zc0cl3IbDdo6KAwE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
