class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>Copyright © 2021 - FoodAround</footer>
    `;
  }
}
customElements.define('footer-bar', Footer);
