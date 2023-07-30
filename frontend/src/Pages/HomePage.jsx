import React, { useState, useEffect,Suspense } from "react";
import Search from "../components/General/Search";
import Categories from "../components/Home/Categories";
import Banner from "../components/Home/Banner";
import DeliveryFeatures from "../components/Home/DeliveryFeatures";
import FeaturedProducts from "../components/Home/FeaturedProducts"
import Navbar from "../components/General/Navbar";
import Instagram from "../components/Home/Instagram";
import Contact from "../components/Home/Contact";
import Footer from "../components/General/Footer";
import DiscountBannerHome from "../components/Home/DiscountBannerHome";

// banner images import
import banner_souled_store from "../assets/banner/mobile/banner1.png"
import banner_monsoon from "../assets/banner/mobile/monsoon.jpg";
import dsk_banner_souled_store from "../assets/banner/desktop/banner1.jpg";
import banner_2 from "../assets/banner/desktop/banner2.jpg";
import shirt_1 from "../assets/banner/mobile/shirt_banner_1.jpg";
import shirt_2 from "../assets/banner/mobile/shirt_banner_2.jpg";
import shirt_3 from "../assets/banner/mobile/shirt_banner_3.jpg";


const homePage_top_banners = [banner_souled_store, banner_monsoon];
const homePage_middle_banners = [shirt_1, shirt_2, shirt_3];
const desktop_banner_images = [dsk_banner_souled_store, banner_2]

export default function HomePage({ currentWidth }) {

  return (
    <div>
      <Navbar />
      {currentWidth < 640 &&
        <div>
          <Search />
          <Banner images={homePage_top_banners} />
          <Categories />
        </div>
      }
      {currentWidth > 640 &&
        <div>
          <Categories />
          <Banner images={desktop_banner_images} />
        </div>
      }
      <DeliveryFeatures />
      <FeaturedProducts />

      {
        currentWidth < 640 &&
        <>
          <DiscountBannerHome />
          <Banner images={homePage_middle_banners} />
        </>
      }
      <Instagram />
      <Contact />
      <Footer />

    </div>
  );
}
