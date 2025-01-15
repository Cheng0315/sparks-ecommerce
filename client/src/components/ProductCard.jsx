const serverURL = import.meta.env.VITE_DEV_SERVER_URL;
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDeleteProduct }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
    <Link to={`/account/products/${product.productId}`}>
      {product.imageUrl && <img src={`${serverURL}${product.imageUrl}`} alt={product.name} className="w-full h-40 object-cover mb-2" />}
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p>Condition: {product.condition}</p>
      <p>Price: ${product.price}</p>
      <p>Stock Quantity: {product.stockQuantity}</p>
    </Link>
    <Link to={`/account/products/${product.productId}/edit`}> Edit </Link>
    <Link to="#" onClick={() => handleDeleteProduct(product.productId)}> Remove </Link> 
    </div>
  );
};

  export default ProductCard;