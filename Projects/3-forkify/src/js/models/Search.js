import axios from 'axios';
import {api_key, api_search, api_get, cross_origin_proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
        this.recipes = null;
    }

    async getResults() {
        try {
            const result = await axios(`${cross_origin_proxy}${api_search}?key=${api_key}&q=${this.query}`);
    
            this.recipes = result.data.recipes;

            //console.log(this.recipes);
        } catch (error) {
            alert("something went wrong " + error);
        }
    }
}