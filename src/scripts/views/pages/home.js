import restaurantData from '../../data/restaurantdb-source';

const Home = {
  async render() {
    return `
        <div class="hero">
          <div class="hero-inner">
              <p class="hero-text">Selamat Datang di</p>
              <h1 class="hero-title">FoodAround</h1>
              <p class="hero-tagline">Temukan rekomendasi restoran dan tempat makan terbaik di sekitar Anda</p>
              <a class="hero-button" href="#main">JELAJAHI</a>
          </div>
        </div>
      
          <section>         
              <h1 class="center">Apa yang bisa Anda lakukan ?</h1>
              <div class="main-inner">
                  <div class="main-icon">
                      <span class="material-icons">restaurant_menu</span>
                      <p>Temukan restoran terbaik berdasarkan review dari pengunjung</p>
                  </div>
                  <div class="main-icon">
                      <span class="material-icons">delivery_dining</span>
                      <p>Dirumah saja? Lihat restoran dengan layanan pengantaran makanan</p>
                  </div>
                  <div class="main-icon">
                      <span class="material-icons">stars</span>
                      <p>Berikan ulasan dan pengalaman Anda kepada yang lain</p>
                  </div>
              </div>
          </section>

        <div id="main">
          <section class="item">
              <h1 class="restaurant-label">Restoran Populer di Indonesia</h1>
              <div class="loader"></div>
              <div id="restaurant" class="restaurants">
              </div>
          </section>
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await restaurantData.restaurantList();
    const restaurantContainer = document.querySelector('.restaurants');
    const loadingIndicator = document.querySelector('.loader');
    if (restaurants) {
      this.successRequest(restaurants, restaurantContainer, loadingIndicator);
    } else {
      this.failedRequest(restaurants, restaurantContainer, loadingIndicator);
    }
  },

  async successRequest(restaurants, restaurantContainer, loadingIndicator) {
    const restaurantsIt = restaurants;
    const restaurantCon = restaurantContainer;
    const loadIndi = loadingIndicator;

    restaurantsIt.forEach((restaurant) => {
      const restaurantItem = document.createElement('restaurant-item');
      restaurantItem.data = restaurant;
      restaurantCon.appendChild(restaurantItem);
    });
    loadIndi.style.display = 'none';
  },

  async failedRequest(restaurants, restaurantContainer, loadingIndicator) {
    const restaurantsIt = restaurants;
    const loadIndi = loadingIndicator;
    const restaurantCon = restaurantContainer;

    loadIndi.style.display = 'none';
    restaurantCon.innerHTML = '<div class="icon"><p class="error-icon"><span class="material-icons">error</span></p></div>';
    restaurantsIt.innerHTML = '<h1 style="text-align: center; margin-top: 10px;">Maaf, request tidak dapat dijalankan karena terdapat kesalahan.</h1>';
  },
};

export default Home;
