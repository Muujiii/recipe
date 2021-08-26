require ("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe} from './view/recipeView';

/**
 * Web app tuluv
 * -Hailtiin query , ur dun
 * -Tuhain uzuulj bgaa jor
 * - Likelasen joruud
 * -ZAhialj bgaa joriin nairlaguud
 */

const state = {};

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

    // 2) Joriin Modeliig vvsgej ogno
    state.recipe = new Recipe(id);

    // 3) UI delgetsiig beltgene
    clearRecipe();
    renderLoader(elements.recipeDiv); // haij bgaa sumtai icon gargadag


    // 4) Joroo tataj abchirna
    await state.recipe.getRecipe(); //async fn uchraas promise butsaana. Promise-iig duustal hvleene gevel .then gej bno esvel omno ni await, deerh fn omno async bichij bno

    // 5)  Joriig gvitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcPerPerson();

    // 6) Joroo delgetsend gargana
    renderRecipe(state.recipe);

;}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);