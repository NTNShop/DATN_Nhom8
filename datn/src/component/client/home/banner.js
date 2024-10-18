import React from "react";
import banner from "../../../assets/img/hero/banner.jpg";

const Banner = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
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
