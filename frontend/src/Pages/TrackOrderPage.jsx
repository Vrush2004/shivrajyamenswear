import React from 'react'
import Product_Navbar from "../components/General/Product_Navbar";
import Navbar from '../components/General/Navbar';
import Footer from '../components/General/Footer';
import TrackOrderForm from '../components/TrackOrder/TrackOrderForm';
import ScreenViewTracker from '../ScreenViewTracker';

const TrackOrderPage = ({currentWidth}) => {
  return (
    <>
    {/* google analytics */}
    <ScreenViewTracker screenName="TrackOrderPage" />
    
      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      <TrackOrderForm/>
      <Footer/>
    </>
  )
}

export default TrackOrderPage