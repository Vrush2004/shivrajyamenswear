import HomePage from "./Pages/HomePage";
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProductListPage from "./Pages/ProductListPage";
import Navbar from "./components/General/Navbar";
import BottomNav from "./components/General/BottomNav";
import { useState,useEffect } from "react";
import Tagline from "./components/General/Tagline";

export default function App() {

  const [width,setWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleSize = () => {
    setWidth(window.innerWidth);
    dispatch(setCurrentWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <>
    {
      location.pathname == '/' && <Tagline/>
    }
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage currentWidth={width} />}></Route>
        <Route exact path="/product-list" element={<ProductListPage />}></Route>
      </Routes>

      {width < 640 && <BottomNav />}
    </>
  )
}