import useFetchData from "../../hooks/useFetchData";
import { ProductCard } from "../../components";
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProductsPage = () => {
  const user = useSelector((state) => state.user.user);
  if (user.role !== "seller") return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData("/api/products");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.response.data.errorMessage === "No products found") {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold">You currently have no products listed for sale.</h2>
          <h2 className="text-center text-2xl font-bold">
            Click <Link to="/account/products/add-product" className="text-blue-500">here</Link> to get started!
          </h2>
        </div>
      )
    }

    return <h2 className="text-center text-2xl font-bold">Error: {error.status}</h2>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">My Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.userProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}

export default UserProductsPage;