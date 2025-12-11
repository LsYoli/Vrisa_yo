import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ptlpocarsiysbofhuetg.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bHBvY2Fyc2l5c2JvZmh1ZXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDQyNTIsImV4cCI6MjA4MDk4MDI1Mn0.hO9kveo3TeYgFViRJ-MwyKHl1FYEo4DPuhbNXTgiwO0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
