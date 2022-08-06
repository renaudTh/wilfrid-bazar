import { reactive } from 'vue'
import { supabase } from '@/supabase'

export const user_store = reactive({
    
    user: supabase.auth.user(),

})