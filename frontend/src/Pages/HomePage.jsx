import React, { useState, useEffect } from "react";
import Search from "../components/General/Search";
import Categories from "../components/Home/Categories";
import Banner from "../components/Home/Banner";
import DeliveryFeatures from "../components/Home/DeliveryFeatures";
import FeaturedProducts from "../components/Home/FeaturedProducts"
import Navbar from "../components/General/Navbar";
import Instagram from "../components/Home/Instagram";
import Contact from "../components/Home/Contact";
import Footer from "../components/General/Footer";

export default function HomePage({currentWidth}) {

  return (
    <div>
      <Navbar/>
      {currentWidth < 640 &&
        <div>
          <Search />
          <Banner width={currentWidth} />
          <Categories />
        </div>
      }
      {currentWidth > 640 &&
        <div>
          <Categories />
          <Banner width={currentWidth} />
        </div>
      }
      <DeliveryFeatures />
      <FeaturedProducts />
      <Instagram />
      <Contact />
      <Footer />

    </div>
  );
}
