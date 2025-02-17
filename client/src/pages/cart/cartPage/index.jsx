import { useSelector} from "react-redux";
import { useFetchCart } from "../../../hooks/cart";
import { Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const CartPage = () => {
  const { loading, error } = useFetchCart(); // Call the custom hook
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const guestCart = useSelector((state) => state.guestCart.guestCart);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const displayedCart = user ? cart : guestCart;

  return (
    <div>
      {displayedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (displayedCart.map(item => (
        <div key={item.productId} className="cart-item flex items-center p-4 border-b border-gray-300">
        <Link to={`/products/${item.productId}`}>
          <img src={`${serverURL}${item.imageUrl}`} alt={item.name} className="w-20 h-20 object-cover mr-4" />
        </Link>
        <div>
          <Link to={`/products/${item.productId}`}>
            <h3 className="text-lg font-bold">{item.name}</h3>
          </Link>
          <p className="text-gray-600">Price: ${item.price}</p>
          <p className="text-gray-600">Condition: ${item.condition}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </div>
      )))}
    </div>
  );
}

export default CartPage;