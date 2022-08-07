import { defineStore } from 'pinia'
import { supabase } from '@/supabase'


export const useUserStore = defineStore({

    id: 'userStore',
    state: () => ({
        user: null,
    }),

    actions: {
        async signIn(credentials) {

            const { user, error } = await supabase.auth.signIn(credentials)
            if(error){
                console.log(error);
                throw new Error(error.message);
            } 
            
            this.user = user;
        },

        async signOut() {
            const { error } = await supabase.auth.signOut();
            if(error){
                console.log(error);
                throw new Error(error.message);
            } 
            this.user = null;
        }
    },
    getters: {

       
    }

})