export function addToWishlist(item) {
    return new Promise((resolve) => {
      let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlistItems.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      resolve({ data: item });
    });
  }
  
  export function fetchWishlistItems() {
    return new Promise((resolve) => {
      let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      resolve({ data: wishlistItems });
    });
  }
  
  export function updateWishlist(update) {
    return new Promise((resolve) => {
      let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedItems = wishlistItems.map((item) => {
        if (item.id === update.id) {
          return { ...item, ...update };
        }
        return item;
      });
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      resolve({ data: update });
    });
  }
  
  export function deleteItemFromWishlist(itemId) {
    return new Promise((resolve) => {
      let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedItems = wishlistItems.filter((item) => item.id !== itemId);
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      resolve({ data: { id: itemId } });
    });
  }
  