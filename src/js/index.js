require ("@babel/polyfill");
import Search from "./model/Search";
import { elements } from "./view/base";
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

        // 4) Hailtiig gvitsetgene
        await state.search.doSearch();

        // 5) Hailtiin ur dung delgetsend uzuulne
        if (state.search.result === undefined) alert("There is no recipe for this search");
        else searchView.renderRecipes(state.search.result);
            
    
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});