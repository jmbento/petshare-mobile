import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rqxwednpxxmvuxaerhiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxeHdlZG5weHhtdnV4YWVyaGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0Mzg1ODQsImV4cCI6MjA3OTAxNDU4NH0.wyRGrVf2kQlA3scq01MzgHhsLK4Af1IUXF78k1tDxfI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
