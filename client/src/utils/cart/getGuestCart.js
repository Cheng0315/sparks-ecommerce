const getGuestCart = () => {
  try {
    const guestCart = sessionStorage.getItem("guestCart");
    return guestCart ? JSON.parse(guestCart) : [];
  } catch (error) {
    console.error("Error parsing guest cart data:", error);
    return [];
  }
};

export default getGuestCart;