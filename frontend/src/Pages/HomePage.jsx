import React, { useState, useEffect } from "react";
import BottomNav from "../components/General/BottomNav";
import Navbar from "../components/General/Navbar";
import Search from "../components/General/Search";
import Tagline from "../components/General/Tagline";
import Categories from "../components/Home/Categories";
import Banner from "../components/Home/Banner";
import DeliveryFeatures from "../components/Home/DeliveryFeatures";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Instagram from "../components/Home/Instagram";
import Contact from "../components/Home/Contact";
import Footer from "../components/General/Footer";

export default function HomePage() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div>
      <Tagline />
      <Navbar />

      {width < 640 &&
        <div>
          <Search />
          <Banner width={width} />
          <Categories />
        </div>
      }
      {width > 640 &&
        <div>
          <Categories />
          <Banner width={width} />
        </div>
      }
      <DeliveryFeatures/>
      <FeaturedProducts/>
      <Instagram/>
      <Contact/>
      <Footer/>

      {width < 640 && <BottomNav />}


    </div>
  );
}
