import * as model from './model.js';

import recipeView from './views/recipeView';

import searchView from './views/searchView';

import resultsView from './views/resultsView';

import paginationView from './views/paginationView';

import bookmarksView from './views/bookmarksView';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // 0) Add spinner to recipe container
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookMarks);

    // 1) Render recipe from API
    await model.loadRecipe(id);

    // 2) Generate recipe on page
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`💥 ${err.stack}`);
    recipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load recipes to stage object
    await model.loadSearchResult(query);

    // 3) render recipes data to page
    resultsView.render(model.getSearchResultsPage());

    // 4) render pagination to recipes list
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) render recipes data to page
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) render pagination to recipes list
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update servings
  model.updateServings(newServings);
  // Update recipe ingredients
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) render recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookMarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

function init() {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addRenderHandler(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addSearchHandler(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
}
init();
