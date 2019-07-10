import axios from 'axios';
import {api_key, api_search, api_get, cross_origin_proxy} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.title = null;
        this.author = null;
        this.img = null;
        this.url = null;
        this.ingredients = null;
        this.time = null;
        this.servings = null;
    }

    async getRecipe() {
        try {
            const res = await axios(`${cross_origin_proxy}${api_get}?key=${api_key}&rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;


        } catch (error) {
            alert("something went wrong: " + error);
        }
    }

    calcTime() {
        // Assume we need 15 min for every 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitCorrection = {
            "tablespoons": "tbsp",
            "tablespoon": "tbsp",
            "ounces": "oz",
            "ounce": "oz",
            "teaspoons": "tsp",
            "teaspoon": "tsp",
            "cups": "cup",
            "cup": "cup",
            "pounds": "pound",
            "pound": "pound",
            "kg": "kg",
            "g": "g"
        }

        console.log(this.ingredients);
        const newIngredients = this.ingredients.map(el => {
            
            // 1. uniform units
            let ingredient = el.toLowerCase();

            // 2. remove parenthesis - REGEX
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // 3. parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitCorrection[el2]);

            //replace units with shorter ones in dictionary
            if (unitIndex !== -1) {
                arrIng[unitIndex] = unitCorrection[arrIng[unitIndex]];
            }

            //initalize object to return
            let objIng = null;

            if (unitIndex > -1) {
                //There is a unit

                //ex 4 1/2 cups arrCount = [4, 1/2] --> eval("4+1/2") --> 4.5
                //ex 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count: count === undefined ? 1 : count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }


            } else if (parseInt(arrIng[0], 10)) {
                //No unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                //No unit and no number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //servings
        let newServings = type === 'dec' ? this.servings-1 : this.servings+1;

        //make sure servings are never negative or 0
        if (newServings <= 0) {
            newServings = 1;
        }

        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;

    }
}