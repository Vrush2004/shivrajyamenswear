import React from 'react'
import Wishlist from '../components/Wishlist/Wishlist'
import ScreenViewTracker from '../ScreenViewTracker'

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
