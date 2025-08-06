import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearGuestCart, setAccessToken, setUser, setCart } from "../../features/slices";
import { apiAxios, authAxios } from "../../services/api/authAxios";
import { useSelector } from "react-redux";

/* custom hook for handling user login */
const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizedAxios = authAxios();
  const guestCart = useSelector((state) => state.guestCart.guestCart);

  const login = async (credentials) => {
    try {

      /* Call login function to make request to server to log the user in */
      const loginResponse = await apiAxios.post("/api/users/login", credentials);

      /* If login is successful, update the user, token and cart */
      if (loginResponse && loginResponse.data) {
        dispatch(setUser({user: loginResponse.data.user}));
        dispatch(setAccessToken({accessToken: loginResponse.data.accessToken}));

        if (guestCart && guestCart.length > 0) {
          const items = guestCart.map(item => ({ productId: item.productId, quantity: item.quantity }));
          await authorizedAxios.patch("/api/cart/mergeCart", { items });
        }

        const cartResponse = await authorizedAxios.get("/api/cart/items");

        if (cartResponse && cartResponse.data) {
          dispatch(setCart({ cart: cartResponse.data.cartItems }));
        }

        dispatch(clearGuestCart());
        /* Redirect to home page after successful login */
        navigate("/");
      }
    } catch (error) {

      console.error("Unable to login due to the following error: ", error);
    }
  };

  return login;
};

export default useLogin;