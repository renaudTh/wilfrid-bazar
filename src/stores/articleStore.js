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
        getImageUrl(article){
            if(article.image_name){
                const { publicURL, error } = supabase
                .storage
                .from(process.env.VUE_APP_SUPABASE_BUCKET)
                .getPublicUrl(article.image_name);
          
                if(error) throw new Error(error.message);
                return publicURL
            }
        }
    },
    getters:  {
        getOne : (state) => { 
            return (id) => state.articles.filter((article => article.id == id))[0] 
        },        
        showPrice: () => {
            return (article) => (article.prix > 0) ? article.prix + " €" : "Gratuit"
        }
    }

})