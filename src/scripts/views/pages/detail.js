import UrlParser from '../../routes/url-parser';
import restaurantData from '../../data/restaurantdb-source';
import {
  createDetailTemplate, createMenuTemplate, createCategoryTemplate, createReviewTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import addReview from '../../utils/add-review';

const Detail = {
  async render() {
    return `
        <div class="wrapper">
            <div class="sub-hero">
                <div class="hero-inner">
                    <p class="hero-text">Selamat Datang di</p>
                    <h1 class="hero-title">FoodAround</h1>
                    <p class="hero-tagline">Temukan rekomendasi restoran dan tempat makan terbaik di sekitar Anda</p>
                </div>
            </div>
            <div class="loader"></div>
            <div class="restaurant-detail">
            </div>
        </div>

        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetail = await restaurantData.detailRestaurant(url.id);
    const detailContainer = document.querySelector('.restaurant-detail');
    const loadingIndicator = document.querySelector('.loader');

    if (restaurantDetail) {
      this.successFetch(restaurantDetail, detailContainer, loadingIndicator);
    } else {
      this.failedFetch(restaurantDetail, detailContainer, loadingIndicator);
    }
  },

  async successFetch(restaurantDetail, detailContainer, loadingIndicator) {
    const restaurantObject = restaurantDetail;
    const restaurantContainer = detailContainer;
    const loadIndicator = loadingIndicator;

    let categories = '';
    let foods = '';
    let drinks = '';

    restaurantObject.categories.forEach((category) => {
      categories += createCategoryTemplate(category);
    });
    restaurantObject.menus.foods.forEach((food) => {
      foods += createMenuTemplate(food);
    });
    restaurantObject.menus.drinks.forEach((drink) => {
      drinks += createMenuTemplate(drink);
    });

    loadIndicator.style.display = 'none';
    // eslint-disable-next-line max-len
    restaurantContainer.innerHTML = createDetailTemplate(restaurantObject, categories, foods, drinks);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantObject.id,
        pictureId: restaurantObject.pictureId,
        name: restaurantObject.name,
        categories: restaurantObject.categories,
        description: restaurantObject.description,
        menus: restaurantObject.menus,
        customerReviews: restaurantObject.customerReviews,
        city: restaurantObject.city,
        rating: restaurantObject.rating,
      },
    });

    const reviewContainer = document.querySelector('#review-list');
    this.refreshReview(restaurantObject, reviewContainer);
    const btnReview = document.querySelector('#btn-add-review');
    btnReview.addEventListener('click', () => {
      this.addReview(restaurantObject);
      this.refreshReview(restaurantObject, reviewContainer);
    });
  },

  async refreshReview(restaurantObject, reviewContainer) {
    restaurantObject.customerReviews.forEach((review) => {
      // eslint-disable-next-line no-param-reassign
      reviewContainer.innerHTML += createReviewTemplate(review);
    });
  },

  async addReview(restaurantObject) {
    const name = document.getElementById('name').value;
    const reviewUser = document.getElementById('review').value;
    // eslint-disable-next-line object-shorthand
    await addReview({ id: restaurantObject.id, name: name, review: reviewUser });
    document.getElementById('name').value = '';
    document.getElementById('review').value = '';
  },

  async failedFetch(restaurantDetail, detailContainer, loadingIndicator) {
    const restaurantObject = restaurantDetail;
    const restaurantContainer = detailContainer;
    const loadIndicator = loadingIndicator;

    loadIndicator.style.display = 'none';
    restaurantContainer.innerHTML = '<div class="icon"><p class="error-icon"><span class="material-icons">error</span></p></div>';
    restaurantObject.innerHTML = '<h1 style="text-align: center; margin-top: 10px;">Maaf, request tidak dapat dijalankan karena terdapat kesalahan.</h1>';
  },
};

export default Detail;
