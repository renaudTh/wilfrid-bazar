import { reactive } from 'vue'
import { supabase } from '@/supabase.js';


export const article_store = reactive({
    articles: [],

     async fetchAll()  {
        let { data: recv, error } = await supabase
            .from('articles')
            .select('*')
        if (error) throw new Error(error);
        this.articles.push(recv);
    }
})