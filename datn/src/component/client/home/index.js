import React from 'react';
import Header from './header';
import Banner from './banner';
import Footer from './footer';

const Home = () => {
  return (
    <div>
        <Header/>
        <Banner/>
      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="categories__slider owl-carousel">
              {[
                { img: 'img/categories/cat-1.jpg', title: 'Fresh Fruit' },
                { img: 'img/categories/cat-2.jpg', title: 'Dried Fruit' },
                { img: 'img/categories/cat-3.jpg', title: 'Vegetables' },
                { img: 'img/categories/cat-4.jpg', title: 'Drink Fruits' },
                { img: 'img/categories/cat-5.jpg', title: 'Drink Fruits' }
              ].map((category, index) => (
                <div className="col-lg-3" key={index}>
                  <div className="categories__item set-bg" style={{ backgroundImage: `url(${category.img})` }}>
                    <h5><a href="#">{category.title}</a></h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section End */}

      {/* Featured Section */}
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className="active" data-filter="*">All</li>
                  <li data-filter=".oranges">Oranges</li>
                  <li data-filter=".fresh-meat">Fresh Meat</li>
                  <li data-filter=".vegetables">Vegetables</li>
                  <li data-filter=".fastfood">Fastfood</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {[
              { img: 'img/featured/feature-1.jpg', title: 'Crab Pool Security', price: '$30.00', categories: ['oranges', 'fresh-meat'] },
              { img: 'img/featured/feature-2.jpg', title: 'Crab Pool Security', price: '$30.00', categories: ['vegetables', 'fastfood'] },
              // Add more featured items as needed
            ].map((item, index) => (
              <div className={`col-lg-3 col-md-4 col-sm-6 mix ${item.categories.join(' ')}`} key={index}>
                <div className="featured__item">
                  <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${item.img})` }}>
                    <ul className="featured__item__pic__hover">
                      <li><a href="#"><i className="fa fa-heart"></i></a></li>
                      <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="featured__item__text">
                    <h6><a href="#">{item.title}</a></h6>
                    <h5>{item.price}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Section End */}

      {/* Banner */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-1.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End */}

      {/* Latest Product Section */}
      <section className="latest-product spad">
        <div className="container">
          <div className="row">
            {[
              { title: 'Latest Products', items: ['lp-1.jpg', 'lp-2.jpg', 'lp-3.jpg'] },
              { title: 'Top Rated Products', items: ['lp-1.jpg', 'lp-2.jpg', 'lp-3.jpg'] },
              { title: 'Review Products', items: ['lp-1.jpg', 'lp-2.jpg', 'lp-3.jpg'] }
            ].map((section, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="latest-product__text">
                  <h4>{section.title}</h4>
                  <div className="latest-product__slider owl-carousel">
                    {section.items.map((item, i) => (
                      <div className="latest-prdouct__slider__item" key={i}>
                        <a href="#" className="latest-product__item">
                          <div className="latest-product__item__pic">
                            <img src={`img/latest-product/${item}`} alt="" />
                          </div>
                          <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest Product Section End */}
      <Footer/>
    </div>
  );
};

export default Home;
