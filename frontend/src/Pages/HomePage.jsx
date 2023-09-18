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

// banner images import from firebase storage bucket
const homePage_top_banners = ["https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fbanner1.png?alt=media&token=a85a9a5f-3ef5-467a-ab76-e620e7b8431c", "https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fmonsoon.jpg?alt=media&token=7d1d753b-752a-47d7-90cb-3ea53ef1a394"];
const homePage_middle_banners = ["https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fshirt_banner_1.jpg?alt=media&token=ecc14473-0292-41bb-bf6b-4c17d620498c", "https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fshirt_banner_2.jpg?alt=media&token=539f5c93-2feb-4025-b473-ab9b9462d8e0", "https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fshirt_banner_3.jpg?alt=media&token=f51b0e5f-5bb2-45c8-946c-d31b82a60c5c"];
const desktop_banner_images = ["https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fbanner1.jpg?alt=media&token=e4c73fc4-8b58-40dd-b247-f6ef4f27f335", "https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fbanner2.jpg?alt=media&token=f5ca9d28-a001-4712-a017-491de397ddf1"]

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
