import HomePage from "./Pages/HomePage";
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProductListPage from "./Pages/ProductListPage";
import BottomNav from "./components/General/BottomNav";
import { useState, useEffect } from "react";
import Tagline from "./components/General/Tagline";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ScrollToTop from "./components/General/ScrollToTop";
import TrackOrderPage from "./Pages/TrackOrderPage";
import WishlistPage from "./Pages/WishlistPage";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import { useDispatch } from "react-redux";
import { fetchWishlistItemsAsync } from "./Features/Wishlist/wishlistSlice";
import { fetchAllProductsAsync } from "./Features/product/productSlice";

import LoginPage from "./Admin/Pages/LoginPage";
import Protected from "./Admin/Features/Protected";
import AdminPanel from "./Admin/Pages/AdminPanel";
import AdminProductDetailPage from "./Admin/Pages/AdminProductDetailPage";
import AdminProductFormPage from "./Admin/Pages/AdminProductFormPage";
import AdminOrdersPage from "./Admin/Pages/AdminOrdersPage";
import PrivacyPage from "./Pages/PrivacyPage";
import TermsPage from "./Pages/TermsPage";

export default function App() {

  const [width, setWidth] = useState(window.innerWidth);
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
  useEffect(() => {
    dispatch(fetchWishlistItemsAsync())
    dispatch(fetchAllProductsAsync())
  }, [dispatch])

  return (
    <>
      {
        location.pathname == '/' && <Tagline />
      }
      <ScrollToTop />
      {/* <Product_Navbar/> */}
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route exact path="/" element={<HomePage currentWidth={width} />}></Route>
        <Route exact path="/products" element={<ProductListPage currentWidth={width} />}></Route>
        <Route exact path="/products/:id" element={<ProductDetailsPage currentWidth={width} />}></Route>
        <Route exact path="/checkout" element={<CheckoutPage />}></Route>
        <Route exact path="/track-order" element={<TrackOrderPage currentWidth={width} />}></Route>
        <Route exact path="/wishlist" element={<WishlistPage currentWidth={width} />}></Route>
        <Route exact path="/order-success" element={<OrderSuccessPage />}></Route>

        <Route exact path="/privacypolicy" element={<PrivacyPage />}></Route>
        <Route exact path="/terms" element={<TermsPage />}></Route>

        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/admin" element={
          <Protected>
            <AdminPanel currentWidth={width} />
          </Protected>
        }>
        </Route>
        <Route exact path="/admin/product-detail/:id" element={
          <Protected>
            <AdminProductDetailPage currentWidth={width} />
          </Protected>
        }>
        </Route>
        <Route exact path="/admin/product-form" element={
          <Protected>
            <AdminProductFormPage />
          </Protected>
        }></Route>
        <Route exact path="/admin/product-form/edit/:id" element={
          <Protected>
            <AdminProductFormPage />
          </Protected>
        }></Route>
        <Route exact path="/admin/orders" element={
          <Protected>
            <AdminOrdersPage />
          </Protected>
        }></Route>

      </Routes>

      {width < 640 && <BottomNav />}
    </>
  )
}