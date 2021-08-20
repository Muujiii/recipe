import { elements } from "./base";

/**
 * 
image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
publisher: "101 Cookbooks"
publisher_url: "http://www.101cookbooks.com"
recipe_id: "47746"
social_rank: 100
source_url: "http://www.101cookbooks.com/archives/001199.html"

 */

// private function (because doesn't export)
const renderRecipe =  recipe => {
    console.log(recipe);
    const markup = `                
    <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `;

    // ul ruugee nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);

};

export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
}

export const clearSearchQuery = () => {
    elements.searchInput.value = "";
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes =  recipes => {
    // hool ntr gej haival end undefined gej orj irne
    recipes.forEach(el => renderRecipe(el));
}