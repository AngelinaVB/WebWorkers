export default class NewsWidget {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
    this.newsList = null;
    this.updateBtn = null;
  }

  init() {
    this.bindToDOM();
    this.createRequest();
  }

  bindToDOM() {
    this.container.innerHTML = NewsWidget.startMarkUp;
    this.newsList = this.container.querySelector(".news__list");
    this.updateBtn = this.container.querySelector(".header__btn");

    this.updateBtn.addEventListener("click", () => this.createRequest());
  }

  async createRequest() {
    this.showAnimation();
    try {
      const request = await fetch("https://ahj-12-1.sergem.xyz/news");
      const response = await request.json();
      this.hideAnimation();
      this.showNews(response.data);
    } catch (err) {
      console.log("Error: ", err);
      this.showError();
    }
  }

  static get startMarkUp() {
    return `<div class="container">
    <header class="header">
      <h1 class="header__title">Новости мира кино</h1>
      <button class="header__btn">Обновить</button>
    </header>
    <div class="news__list"></div>
  </div>`;
  }

  static newsMarkUp(date = "", text = "", url = "", id = "") {
    return `<div class="news" data-id="${id}">
    <div class="news__date">${date}</div>
    <div class="news__content">
      <div class="news__imagebox">
        <img src="${url}" alt="">
      </div>
      <div class="news__text">
        <div class="mask-text__item">${text}</div>
      </div>
    </div>
  </div>`;
  }

  showNews(data) {
    data.forEach((elem) => {
      this.newsList.insertAdjacentHTML(
        "beforeend",
        NewsWidget.newsMarkUp(elem.created, elem.title, elem.image, elem.id),
      );
    });
  }

  showAnimation() {
    this.newsList.innerHTML = "";
    while (this.newsList.children.length < 3) {
      this.newsList.insertAdjacentHTML("beforeend", NewsWidget.newsMarkUp());
    }
    this.newsList.classList.add("anime");
  }

  hideAnimation() {
    if (this.newsList.classList.contains("anime")) {
      this.newsList.querySelectorAll(".news").forEach((elem) => elem.remove());
      this.newsList.classList.remove("anime");
    }
  }

  showError() {
    this.newsList.insertAdjacentHTML(
      "beforeend",
      `<div class="error">
    <div class="error__mes">
      Не удалось загрузить данные Проверьте подключение и обновите страницу
    </div>
  </div>`,
    );
  }

  hideError() {
    if (this.newsList.querySelector(".error")) {
      this.newsList.querySelector(".error").remove();
    }
  }
}
