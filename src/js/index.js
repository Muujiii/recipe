require ("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';

/**
 * Web app tuluv
 * -Hailtiin query , ur dun
 * -Tuhain uzuulj bgaa jor
 * - Likelasen joruud
 * -ZAhialj bgaa joriin nairlaguud
 */

const state = {};

const controlSearch = async () => {
    // 1) Webees hailtiin tulhvvr ugiig gargaj avna
    const query = searchView.getInput();

    
    if (query) {
        // 2) SHineer hailtiin objectiig uusgej ogno
        state.search = new Search(query);


        // 3) Hailt hiihed zoriulj delgetsiig UI beltgene
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);

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

})