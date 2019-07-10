// Global app controller

import Search from './models/Search';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView';
import * as ListView from './views/ListView';
import * as LikesView from './views/LikesView';
import List from './models/List';
import Recipe from './models/Recipe';
import Like from './models/Likes';
import {elements, renderLoader, clearLoader} from './views/base';
import Likes from './models/Likes';

/** Global State of App
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {
    search: null,
    recipe: null,
    list: null,
    likes: null
}

/** Search Controller
 * 
 */

const controlSearch = async () => {
    // 1) Get query from view
    const query = SearchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Clear results for new search
        SearchView.clearResults();
        renderLoader(elements.searchRes);

        try {
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Remove loading animation
        clearLoader();

        // 6) Render results on UI
        SearchView.renderResults(state.search.recipes, 1, 10);
        } catch (error) {
            alert("something went wrong " + error);
        }


        // 7) Clear input field
        SearchView.clearInput();
    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        SearchView.clearResults();
        SearchView.renderResults(state.search.recipes, goToPage, 10);
    }
});



/** Recipe Controller
 *
 */

const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //Prepare UI for changes
        RecipeView.clearRecipe();
        renderLoader(elements.recipe);

        //create new recipe object
        state.recipe = new Recipe(id);

        //highlight selected search item
        if (state.search) {
            SearchView.highlightSelected(id);
        }

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            await state.recipe.parseIngredients();

            //calculate servings and times
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            RecipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (error) {
            alert("something went wrong " + error);
        }

    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/** List Controller
 * 
 */
const controlList = () => {
    if (!state.list) {
        state.list = new List();
    }

    //add all items to shopping list
    state.recipe.ingredients.forEach((el) => {
        //add item to list
        const toAdd = state.list.additem(el.count, el.unit, el.ingredient);

        //render item to html page
        ListView.renderItem(toAdd);
    });

}


/** Like Controller
 * 
 */
const controlLike = () => {
    const currentID = state.recipe.id;

    //user has NOT liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);

        //toggle the like button
        LikesView.toggleLikeBtn(true);

        //add like to UI list
        LikesView.renderLike(newLike);
        

    //user has like current recipe
    } else {
        // remove like to the state
        state.likes.deleteLike(currentID);

        //toggle the like button
        LikesView.toggleLikeBtn(false);

        //remove like from UI list
        LikesView.deleteLike(currentID);

    }

    LikesView.toggleLikeMenu(state.likes.getNumLikes());
}

//localStorage.removeItem('likes');

//restore like recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    //restore likes
    state.likes.readStorage();

    //toggle like button
    LikesView.toggleLikeMenu(state.likes.getNumLikes());

    // render existing likes
    state.likes.likes.forEach(el => LikesView.renderLike(el));
});



//handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle delete event
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.removeitem(id);

        //delete from UI
        ListView.deleteItem(id);

    } else if (e.target.matches('.shopping__count-value')) {

        //update quantity value from UI
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);

    }
});



//handle recipe button click
elements.recipe.addEventListener('click', event => {

    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button clicked
        state.recipe.updateServings('dec');
        RecipeView.updateServingsIngredients(state.recipe);

    } else if(event.target.matches('.btn-increase, .btn-increase *')) {
        //increase button clicked
        state.recipe.updateServings('inc');
        RecipeView.updateServingsIngredients(state.recipe);

    } else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredients to cart clicked
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        // like controller
        controlLike();
    }

});