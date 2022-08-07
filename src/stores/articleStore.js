import { defineStore } from 'pinia'
import { supabase } from '@/supabase.js';


export const useArticleStore = defineStore({

    id: 'articles',
    state: () => ({
        articles: []
    }),

    actions: {
        async fetchAll() {
            let { data: recv, error } = await supabase
                .from('articles')
                .select('*')
            if (error) throw new Error(error);
            this.articles = recv;
        },
        getImageUrl(article) {
            if (article.image_name) {
                const { publicURL, error } = supabase
                    .storage
                    .from(process.env.VUE_APP_SUPABASE_BUCKET)
                    .getPublicUrl(article.image_name);

                if (error) throw new Error(error.message);
                return publicURL
            }
        },
        async deleteArticle(article) {

            let isOk = confirm(`Do you really want to delete "${article.nom}" ?`)
            if (isOk) {
                const { data: toDelete, error } = await supabase
                    .from('articles')
                    .delete()
                    .eq('id', article.id)

                if (error) throw new Error(error.message);
                if (toDelete == 0) {
                    alert(`You don't have permission to delete "${article.nom}"`)

                }
                if (article.image_name) {
                    const { error } = await supabase
                        .storage
                        .from(process.env.VUE_APP_SUPABASE_BUCKET)
                        .remove([article.image_name])
                    if (error) throw new Error(error.message)

                }
                alert(`"${article.nom}" successfully deleted`)
                this.$patch((state) => {
                    state.articles = state.articles.filter((elt) => elt.id != article.id);
                })
            }
        },

        async addArticle(article) {
            const { error } = await supabase
                .from('articles')
                .insert([
                    article
                ])
            if (error) {
                console.log(error.message);
                throw new Error(error.details);
            }
            this.$patch((state) => {
                state.articles.push(article)
            })
        }
    },
    getters: {
        getOne: (state) => {
            return (id) => state.articles.filter((article => article.id == id))[0]
        },
        showPrice: () => {
            return (article) => (article.prix > 0) ? article.prix + " €" : "Gratuit"
        }
    }

})