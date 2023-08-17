import React from 'react'
import ScreenViewTracker from '../ScreenViewTracker'
import Wishlist from '../components/Wishlist/Wishlist';

const WishlistPage = () => {
  return (
    <div>
      {/* google analytics */}
      <ScreenViewTracker screenName="WishlistPage" />

        <Wishlist/>
    </div>
  )
}

export default WishlistPage
