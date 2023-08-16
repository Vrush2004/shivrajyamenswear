import React from 'react'
import Product_Navbar from "../components/General/Product_Navbar";
import Navbar from '../components/General/Navbar';
import Footer from '../components/General/Footer';
import TrackOrderForm from '../components/TrackOrder/TrackOrderForm';

const TrackOrderPage = ({currentWidth}) => {
  return (
    <>
      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      <TrackOrderForm/>
      <Footer/>
    </>
  )
}

export default TrackOrderPage