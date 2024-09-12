import React from "react";
import banner from "../../../assets/img/hero/banner.jpg";

const Banner = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div
                className="hero__categories__all"
                onClick={() =>
                  document
                    .getElementById("categoryList")
                    .classList.toggle("open")
                }
              >
                <i className="fa fa-bars"></i>
                <span>Danh mục</span>
              </div>
              <ul id="categoryList" className="category-list">
                <li>
                  <a href="#">Wave</a>
                </li>
                <li>
                  <a href="#">Vario</a>
                </li>
                <li>
                  <a href="#">Vison</a>
                </li>
                <li>
                  <a href="#">Air Black</a>
                </li>
                <li>
                  <a href="#">Click</a>
                </li>
                <li>
                  <a href="#">50 phân khối</a>
                </li>
                <li>
                  <a href="#">110 phân khối</a>
                </li>
                <li>
                  <a href="#">125 phân khối</a>
                </li>
                <li>
                  <a href="#">150 phân khối</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="hero__search">
              <img src={banner} width={"auto"} height={450} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
