<<<<<<< HEAD
import * as model from './model.js';
import icons from 'url:../img/icons.svg';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';
=======
import icons from 'url:../img/icons.svg';
>>>>>>> parent of 4f31d80 (new)
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


const controlRecipes = async function(){

  try{
    
    const id = window.location.hash.slice(1);
   
    if(!id) return;
    recipeView.renderSpinner();
   
  // 0 update results view to mark selected search result
 
  resultsView.render(model.getSearchResultPage());

<<<<<<< HEAD
  // updating the bookmarksView

   bookmarksView.update(model.state.bookmarks); 

  // rendering recipe 1

    await model.loadRecipe(id);
   
   // rendering recipe 2

    recipeView.render(model.state.recipe);


   
=======
const renderSpinner = function(parentEl) {

  const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
}

const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)

    if (!id) return;

    // 1) Loading Recipe
    renderSpinner(recipeContainer);
    
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
    const data = await res.json();

    if (!res.ok) throw new Error('${data} ($res.status)');


    let {recipe} = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }
    console.log(recipe);

    // 2) Rendering recipe
    // const markup = '
    // ';

    const markup = `<figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${recipe.ingredients.map(ing => {
          return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
        }).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
      recipeContainer.innerHTML = '';
      recipeContainer.insertAdjacentHTML('afterbegin', markup)
  
>>>>>>> parent of 4f31d80 (new)
  } catch (err){
    recipeView.renderError (); 
    console.error(err);
  };
};

const controlSearchResults = async function() {

  try{

   resultsView.renderSpinner(); 
   console.log(resultsView);

  // get search query

  const query = searchView.getQuery();
  if(!query)return;

//  2 load search result

   await model.loadSearchResults(query);

  //  3 render results

  //  resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultPage());


  // 4 render initial pagination buttons
  paginationView.render(model.state.search);
  }
  catch(err){
    console.log(err);
  }
}

const controlPagination = function(gotToPage){
  // render new results
  resultsView.render(model.getSearchResultPage(gotToPage));


  // 4 render new pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  //  update the recipe servings in the state
  model.updateServings(newServings);
  


  // update the recipe in view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
<<<<<<< HEAD

const  controlAddBookmark = function(){

  // 1 add / remove bookmark

  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

   
  // 2 update recipeView

  recipeView.update(model.state.recipe)

  // 3 render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = function(newRecipe) {
  model.uploadRecipe(newRecipe);
};

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); 
  paginationView.addHandlerClink(controlPagination );
  addRecipeView.addHandlerUpload(controlAddRecipe); 
};
init();
=======
showRecipe();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe))

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
>>>>>>> parent of 4f31d80 (new)
