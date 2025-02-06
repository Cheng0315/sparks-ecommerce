const setGuestCart = (cart) => {
  try {
    sessionStorage.setItem("guestCart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving guest cart data:", error);
  }
};

export default setGuestCart;