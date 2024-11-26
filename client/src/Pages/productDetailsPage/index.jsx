import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/product";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const [viewedProduct, setViewedProduct] = useState(null);
  const { productId } = useParams();

  /* Call useGetProduct hook to update viewedProduct based on id change*/
  useGetProduct(productId, setViewedProduct);

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