import HomePage from "./Pages/HomePage";
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProductListPage from "./Pages/ProductListPage";
import BottomNav from "./components/General/BottomNav";
import { useState,useEffect } from "react";
import Tagline from "./components/General/Tagline";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ScrollToTop from "./components/General/ScrollToTop";
import OrdersPage from "./Pages/OrdersPage";
import WishlistPage from "./Pages/WishlistPage";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import { useDispatch } from "react-redux";
import { fetchWishlistItemsAsync } from "./Features/Wishlist/wishlistSlice";

export default function App() {

  const [width,setWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // ******** fetch wishlist ********
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchWishlistItemsAsync())
  },[dispatch])

  return (
    <>
    {
      location.pathname == '/' && <Tagline/>
    }
    <ScrollToTop/>
    {/* <Product_Navbar/> */}
      <Routes>
        <Route path="*" element={<PageNotFound/>}></Route>
        <Route exact path="/" element={<HomePage currentWidth={width} />}></Route>
        <Route exact path="/products" element={<ProductListPage currentWidth={width} />}></Route>
        <Route exact path="/products/:id" element={<ProductDetailsPage currentWidth={width} />}></Route>
        <Route exact path="/checkout" element={<CheckoutPage />}></Route>
        <Route exact path="/orders" element={<OrdersPage currentWidth={width} />}></Route>
        <Route exact path="/wishlist" element={<WishlistPage currentWidth={width} />}></Route>
        <Route exact path="/order-success/:id" element={<OrderSuccessPage />}></Route>
      </Routes>

      {width < 640 && <BottomNav />}
    </>
  )
}