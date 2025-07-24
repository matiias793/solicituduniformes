import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dhtmcgogktnefwpuavlz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodG1jZ29na3RuZWZ3cHVhdmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNjE4MTcsImV4cCI6MjA2ODkzNzgxN30.1TQmWW31P6naV8OBxc4Q1invXAWXNp0I0EoYxevKbSQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
