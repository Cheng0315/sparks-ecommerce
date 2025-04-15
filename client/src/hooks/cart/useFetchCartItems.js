import { useState, useEffect } from "react";
import { authAxios } from "../../services/api/authAxios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/slices";

const useFetchCartItems = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authorizedAxios = authAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return; 

      setIsLoading(true);
      try {
        const response = await authorizedAxios.get("/api/cart/items");
        dispatch(setCart({cart: response.data.cartItems}));
      } catch (err) {
        setError("Failed to fetch cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user, dispatch]);

  return { isLoading, error };
};

export default useFetchCartItems;