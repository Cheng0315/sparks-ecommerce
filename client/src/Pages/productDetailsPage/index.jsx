import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetProduct } from "../../hooks/product";
import { isValidId } from "../../utils/validations";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const [viewedProduct, setViewedProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(null);
  const { productId } = useParams();
  
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  /* Call useGetProduct hook to update viewedProduct based on id change*/
  useGetProduct(productId, setViewedProduct, setProductNotFound);

  if (productNotFound) return <Navigate to="/page-not-found" />;

  if (!viewedProduct) return <div>Loading...</div>;

  return (
    <div>
      <h2>Product Details</h2>
      {viewedProduct.imageUrl && <img src={`${serverURL}${viewedProduct.imageUrl}`} alt="Product" />}
      <p>Name: {viewedProduct.name}</p>
      <p>Description: {viewedProduct.description}</p>
      <p>Condition: {viewedProduct.condition}</p>
      <p>Price: {viewedProduct.price}</p>
      <p>Stock Quantity: {viewedProduct.stockQuantity}</p>
    </div>
  );
}

export default ProductDetailsPage;