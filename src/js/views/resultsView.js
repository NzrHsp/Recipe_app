import View from './view';

import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _messageError = 'No recipes found from your query. Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this.#generateRecipeMarkup).join('');
  }

  #generateRecipeMarkup(recipe) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      recipe.id === id ? 'preview__link--active' : ''
    }" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="${recipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;
  }

  evHandler() {
    this._parentEl.addEventListener('click', function (e) {
      e.target.closest('.preview__link').classList.add('preview__link--active');
    });
  }
}

export default new ResultsView();
