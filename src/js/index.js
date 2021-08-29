require ("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';
import Likes from './model/Like';
import * as likesView from './view/likesView';


/**
 * Web app tuluv
 * -Hailtiin query , ur dun
 * -Tuhain uzuulj bgaa jor
 * - Likelasen joruud
 * -ZAhialj bgaa joriin nairlaguud
 */

const state = {};
// Like tsesiig haah
likesView.toggleLikeMenu(0);


/**
 * Hailtiin Controller = MVCiin  Model ,View 2iig holboj ogdog heshiig Controller gene.  
 */
const controlSearch = async () => {
    // 1) Webees hailtiin tulhvvr ugiig gargaj avna
    const query = searchView.getInput();

    
    if (query) {
        // 2) SHineer hailtiin objectiig uusgej ogno
        state.search = new Search(query);


        // 3) Hailt hiihed zoriulj delgetsiig UI beltgene
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv); // haij bgaa sumtai icon gargadag

        // 4) Hailtiig gvitsetgene
        await state.search.doSearch();

        // 5) Hailtiin ur dung delgetsend uzuulne
        clearLoader();
        if (state.search.result === undefined) alert("There is no recipe for this search");
        else searchView.renderRecipes(state.search.result);
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");  // hamgiin oir darsan tovch

    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});

/**
 * Joriin Controller
 */
const controlRecipe = async () => {
    // 1) URL -aas ID -iig salgaj abna.
    const id = window.location.hash.slice(1);
    if (!state.likes) state.likes = new Likes();

    // URL deer ID bgaa esehiig shalgana
    if (id) {
           // 2) Joriin Modeliig vvsgej ogno
        state.recipe = new Recipe(id);

        // 3) UI delgetsiig beltgene
        clearRecipe();
        renderLoader(elements.recipeDiv); // haij bgaa sumtai icon gargadag
        highlightSelectedRecipe(id);

        // 4) Joroo tataj abchirna
        await state.recipe.getRecipe(); //async fn uchraas promise butsaana. Promise-iig duustal hvleene gevel .then gej bno esvel omno ni await, deerh fn omno async bichij bno

        // 5)  Joriig gvitsetgeh hugatsaa bolon ortsiig tootsoolno
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcPerPerson();

        // 6) Joroo delgetsend gargana
        renderRecipe(state.recipe, state.likes.isLiked(id)); 
    };
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//        below is same as above
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/**
 * Nairlaganii Controller heregtei
 */

const controlList = () => {
    //Nairlaganii modeliig vvsgene
    state.list = new List();
    //window.tt = state.list;

    // Omno ni haragdaj bsan nairlagiig delgetsees ustgana
    listView.clearItems();

    // Ug model rvv odoo haragdaj bgaa jornii bvh nairlagiig abch hiine
   state.recipe.ingredients.forEach(nairlaga => {
       // Tuhain nairlagiig model rvv hiine
       const item = state.list.addItem(nairlaga);

      // Tuhain nairlagiig delgetsend gargana
       listView.renderItem(item);
   });
};

/**
 * Like COntroller
 */
const controlLike = () => {
    // 1) Like-iin Modeliig uusgene.
    if (!state.likes) state.likes = new Likes();

    // 2) Odoo haragdaj bgaa joriin ID-iig olj avah
    const currentRecipeId = state.recipe.id;

    // 3) Ene joriig like-lasen esehiig shalgah
    if (state.likes.isLiked(currentRecipeId)) {
        // Like-iin tsesnees ustgana
        likesView.deleteLike(currentRecipeId);



        // Likelsan bol Like-iig ni boliulna
        state.likes.deleteLike(currentRecipeId);
        // Like Button=ii like-lasan bdliig boliulah
        likesView.toggleLikeBtn(false);
    } else {
        // Laiklaagvi bol lIkelna
        const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
       
        // Like tsesend ene Like-iig oruulah
        likesView.renderLike(newLike);
         // Like Button=ii like-lasan bdliig like-lasan bolgoh
        likesView.toggleLikeBtn(true);
    } 

    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};




elements.recipeDiv.addEventListener('click', e => {
    if (e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});


elements.shoppingList.addEventListener('click', e => {
    // Click hiisen li elementiin data-itemid attribute-iig shvvj gargaj abah
    if (e.target.matches('.btn-tiny, .btn-tiny *')){
        const id = e.target.closest('.shopping__item').dataset.itemid;

        // Oldson ID-tei ortsiig modeloos ustgana
        state.list.deleteItem(id);

        // Delgetsees iim ID-tei ortsiig olj bas ustgana.
        listView.deleteItem(id);    
    }
});