import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useGetProduct } from "../../hooks/product";
import { isValidId } from "../../utils/validations";
import { useSelector } from 'react-redux';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const [viewedProduct, setViewedProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(null);
  const { productId } = useParams();
  const user = useSelector((state) => state.user.user);
  
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  /* Call useGetProduct hook to update viewedProduct based on id change*/
  useGetProduct(productId, setViewedProduct, setProductNotFound);

  if (productNotFound) return <Navigate to="/page-not-found" />;

  if (!viewedProduct) return <div>Loading...</div>;

  const editProductButton = user && viewedProduct.userId === user.userId ? (
    <Link
      to={`/products/${viewedProduct.productId}/edit`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-center" >
      Edit
    </Link> 
  ) : null;

  return (
    <div>
      <div>
        <h2>Product Details</h2>
        {viewedProduct.imageUrl && <img src={`${serverURL}${viewedProduct.imageUrl}`} alt="Product" />}
        <p>Name: {viewedProduct.name}</p>
        <p>Description: {viewedProduct.description}</p>
        <p>Condition: {viewedProduct.condition}</p>
        <p>Price: {viewedProduct.price}</p>
        <p>Stock Quantity: {viewedProduct.stockQuantity}</p>
      </div>
      <div>
        { editProductButton }
      </div>
    </div>
  );
}

export default ProductDetailsPage;