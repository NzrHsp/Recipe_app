class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const markup = this.#parentEl.firstElementChild.value;
    this.#clearInput();
    return markup;
  }

  #clearInput() {
    this.#parentEl.firstElementChild.value = '';
  }

  addSearchHandler(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
