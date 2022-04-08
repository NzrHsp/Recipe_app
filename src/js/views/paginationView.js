import icons from '../../img/icons.svg';

import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      debugger;
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      return handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const pages = Math.ceil(this._data.results.length / this._data.resPerPage);
    // 1 page, and there are others
    if (curPage === 1 && pages > 1) {
      return this.#generateNextButton(curPage);
    }
    // last page
    if (curPage === pages && pages > 1) {
      return this.#generatePrevButton(curPage);
    }

    // others pages
    if (curPage < pages) {
      return this.#generatePrevButton(curPage).concat(
        this.#generateNextButton(curPage)
      );
    }

    // if only one page exists
    return '';
  }

  #generatePrevButton(curPage) {
    return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
  }

  #generateNextButton(curPage) {
    return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}

export default new PaginationView();
