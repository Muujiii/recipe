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
    <a class="results__link" href="#${recipe.recipe_id}">
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
    elements.pageButtons.innerHTML = "";
}

export const clearSearchQuery = () => {
    elements.searchInput.value = "";
}
export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage =  10) => {
    // Hailtiin ur dung huudaslaj uzuuleh  
    // page=2, start=10, end=20
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    // hool ntr gej haival end undefined gej orj irne
    recipes.slice(start, end).forEach(el => renderRecipe(el));

    // Huudaslaltiin tovchuudiig gargaj ireh
    const totalPages = Math.ceil(recipes.length / resPerPage);   // 4.2 page gevel 5 page bolgoj vzvvlne
    renderButtons(currentPage, totalPages);
};


// type ====> 'prev', 'next'
const createButton = (page, type, direction) => 
`<button class="btn-inline results__btn--${type}" data-goto=${page}>
    <span>Хуудас ${page}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${direction}"></use>
    </svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;

    if (currentPage === 1 && totalPages > 1) {
        // 1-r huudsan deer bn, 2-r huudas gedeg tovchiig garga
        buttonHtml = createButton(2, "next", "right");
    } else if (currentPage < totalPages) {
        // Prev bolon Next page ruu shiljih tovchuudiig gargah
        buttonHtml = createButton(currentPage-1, "prev", "left");
        buttonHtml += createButton(currentPage+1, "next", "right"); // omnoh 66 deerh html deer zalgagdana
    } else if (currentPage === totalPages) {
        // Hamgiin svvliin huudas deer bn. Omnoh rvv shiljvvleh tovchiig l vzvvlne.
        buttonHtml = createButton(currentPage-1, "prev", "left");
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};
