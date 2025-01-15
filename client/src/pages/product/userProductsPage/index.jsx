import useFetchData from "../../../hooks/useFetchData";
import { ProductCard } from "../../../components";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authAxios } from "../../../services/api/authAxios";

const UserProductsPage = () => {
  const [userProducts, setUserProducts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const authorizedAxios = authAxios();

  if (user.role !== "seller") return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData("/api/products");

  useEffect(() => {
      if (data && data.userProducts) {
        setUserProducts(data.userProducts);
      }
    },[data]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await authorizedAxios.delete(`/api/products/${productId}`);

      if (response.status === 200 && response.data) {
        console.log(response.data.message);
        setUserProducts(userProducts.filter((product) => product.productId !== productId));
      }
    } catch (error) {
      console.error("Unable to delete address due to the following error: ", error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.response.data.errorMessage === "No products found") {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold">You currently have no products listed for sale.</h2>
          <h2 className="text-center text-2xl font-bold">
            Click <Link to="/account/products/add-product" className="text-blue-500">here</Link> to add a product!
          </h2>
        </div>
      )
    }

    return <h2 className="text-center text-2xl font-bold">Error: {error.status}</h2>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to={"/account/products/add-product"} className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold">+ Add Product</h3>
        </Link>
        {userProducts.map((product) => (
          <ProductCard key={product.productId} product={product} handleDeleteProduct={handleDeleteProduct}/>
        ))}
      </div>
    </div>
  );
}

export default UserProductsPage;