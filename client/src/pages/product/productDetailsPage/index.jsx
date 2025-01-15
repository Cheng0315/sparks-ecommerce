import { useParams, Navigate, Link } from "react-router-dom";
import { isValidId } from "../../../utils/validations";
import { useSelector } from 'react-redux';
import useFetchData from "../../../hooks/useFetchData";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const user = useSelector((state) => state.user.user);
  
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData(`/api/products/${productId}`);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Navigate to="/page-not-found" />;

  const editProductButton = user && data.product.userId === user.userId ? (
    <Link to={`/account/products/${data.product.productId}/edit`}> Edit </Link>
  ) : null;

  return (
    <div>
      <div>
        <h2 className="text-center text-2xl font-bold">Product Details</h2>
        {data.product.imageUrl && <img src={`${serverURL}${data.product.imageUrl}`} alt="Product" className="w-full max-w-md h-auto object-cover mb-4 mx-auto"/>}
        <p>Name: {data.product.name}</p>
        <p>Description: {data.product.description}</p>
        <p>Condition: {data.product.condition}</p>
        <p>Price: {data.product.price}</p>
        <p>Stock Quantity: {data.product.stockQuantity}</p>
      </div>
      <div>
        { editProductButton }
        <br></br>
        <Link to={"/account/products/"}> View your products </Link>
      </div>
    </div>
  );
}

export default ProductDetailsPage;