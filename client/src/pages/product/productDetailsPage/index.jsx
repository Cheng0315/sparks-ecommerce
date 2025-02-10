import { useParams, Navigate, Link } from "react-router-dom";
import { isValidId } from "../../../utils/validations";
import { useSelector } from "react-redux";
import useFetchData from "../../../hooks/useFetchData";
import { addItemToCart } from "../../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import addItemToGuestCart from "../../../utils/cart/addItemToGuestCart";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData(`/api/products/${productId}`);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <Navigate to="/page-not-found" />;

  const product = data.product;

  const addItemToCartHandler = () => {
    const item = { ...product, quantity: Number(quantity) };

    if (user) {
      // Add item to the logged in user's cart
      dispatch(addItemToCart({ item }));
    } else {
      // Add item to the guest cart
      addItemToGuestCart(item);
    }
  };

  const productActionLinks = user && data.product.userId === user.userId ? (
    <div>
      <div>
        <Link to={`/account/products/${data.product.productId}/edit`}> Edit </Link>
      </div>
      <div>
        <Link to={"/account/products/"}> View all your products </Link>
      </div>
    </div>
  ) : <button onClick={addItemToCartHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add to cart</button>

  return (
    <div>
      <div>
        <h2 className="text-center text-2xl font-bold">Product Details</h2>
        {data.product.imageUrl && <img src={`${serverURL}${data.product.imageUrl}`} alt="Product" className="w-full max-w-md h-auto object-cover mb-4 mx-auto"/>}
        <p>Name: {data.product.name}</p>
        <p>Description: {data.product.description}</p>
        <p>Condition: {data.product.condition}</p>
        <p>Price: {data.product.price}</p>
        <label className="block mb-2">Quantity:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 mb-4"
        >
          {[...Array(50).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>{n + 1}</option>
          ))}
        </select>
      </div>
      <div>
        { productActionLinks }
        <br></br>
      </div>
    </div>
  );
}

export default ProductDetailsPage;