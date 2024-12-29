import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useGetProduct } from "../../hooks/product";
import { isValidId } from "../../utils/validations";
import { useSelector } from 'react-redux';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(null);
  const { productId } = useParams();
  const user = useSelector((state) => state.user.user);
  
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  /* Call useGetProduct hook to update product based on id change*/
  useGetProduct(productId, setProduct, setProductNotFound);

  if (productNotFound) return <Navigate to="/page-not-found" />;

  if (!product) return <div>Loading...</div>;

  const editProductButton = user && product.userId === user.userId ? (
    <Link
      to={`/account/products/${product.productId}/edit`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-center" >
      Edit
    </Link>
  ) : null;

  return (
    <div>
      <div>
        <h2 className="text-center text-2xl font-bold">Product Details</h2>
        {product.imageUrl && <img src={`${serverURL}${product.imageUrl}`} alt="Product" className="w-full max-w-md h-auto object-cover mb-4 mx-auto"/>}
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        <p>Condition: {product.condition}</p>
        <p>Price: {product.price}</p>
        <p>Stock Quantity: {product.stockQuantity}</p>
      </div>
      <div>
        { editProductButton }
      </div>
    </div>
  );
}

export default ProductDetailsPage;