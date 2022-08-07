import { defineStore } from 'pinia'
import { supabase } from '@/supabase.js';


export const useCategoriesStore = defineStore({

    id: 'categories',
    state: () => ({
        categories: []
    }),

    actions: {
        async fetchAll() {
            let { data, error } = await supabase
                .from('categories')
                .select('*')
            if (error) throw new Error(error);
            this.categories = data;
        },
        async deleteCategorie(categorie) {

            let isOk = confirm(`Do you really want to delete "${categorie.nom}" ?`)
            if (isOk) {
                const { data: toDelete, error } = await supabase
                    .from('categories')
                    .delete()
                    .eq('id', categorie.id)

                if (error) throw new Error(error.message);
                if (toDelete == 0) {
                    alert(`You don't have permission to delete "${categorie.nom}"`)

                }
                alert(`"${categorie.nom}" successfully deleted`)
                this.$patch((state) => {
                    state.categories = state.categories.filter((elt) => elt.id != categorie.id);
                })
            }
        },
        async addCategorie(categorie) {
            const { error } = await supabase
                .from('categories')
                .insert([
                    categorie
                ])
            if (error) {
                console.log(error.message);
                throw new Error(error.details);
            }
            this.$patch((state) => {
                state.categories.push(categorie)
            })
        }
    },
    getters: {
        selectOne: (state) => {
            return (id) => (id) ? state.categories.filter((categorie => categorie.id == id))[0] : {nom: 'En vrac'}
            
        },
    }

})