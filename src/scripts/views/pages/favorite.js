import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
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
            <div class="icon">
                <p class="info-icon"><span class="material-icons">info</span></p>
                <h1 style="text-align: center; margin-top: 10px; padding: 0 10px 0 10px;" id="empty">Belum ada Restoran Favorit Anda.</h1>
            </div>
            <div id="restaurant" class="restaurants">
            </div>
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('.restaurants');
    const loadContainer = document.querySelector('.loader');
    const infoContainer = document.querySelector('.info-icon');
    const emptyContainer = document.querySelector('#empty');

    if (restaurants.length !== 0) {
      infoContainer.style.display = 'none';
      emptyContainer.style.display = 'none';
      restaurantContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
    loadContainer.style.display = 'none';
  },
};

export default Favorite;
