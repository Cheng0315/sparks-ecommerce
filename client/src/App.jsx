import {BrowserRouter, Routes, Route} from "react-router-dom";
import { UserRegistrationPage, LoginPage, UserProfilePage, AccountPage, EditEmailPage, ChangePasswordPage, EditUserInfoPage, UpdateUserRole} from "./pages/user";
import { AddProductPage, ProductDetailsPage, EditProductPage, UserProductsPage  } from "./pages/product";
import { AddAddressPage, UserAddressesPage  } from "./pages/address";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import { Navbar } from "./components";
import { PrivateRoute, RedirectIfLoggedIn } from "./components";

const App = () =>{
  return (
    <div className="app">
      <BrowserRouter>
        < Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route element={<RedirectIfLoggedIn />}>
              <Route path="/register" element={<UserRegistrationPage />}/>
              <Route path="/login" element={<LoginPage />}/>
            </Route>
            <Route path="/users/:userId" element={<UserProfilePage />}/>
            <Route element={<PrivateRoute />}>
              <Route path="/account/edit-email" element={<EditEmailPage />}/>
              <Route path="/account/edit-info" element={<EditUserInfoPage />}/>
              <Route path="/account/update-role" element={<UpdateUserRole />}/>
              <Route path="/account/change-password" element={<ChangePasswordPage />}/>
              <Route path="/account" element={<AccountPage />}/>
              <Route path="/account/products" element={<UserProductsPage />}/>
              <Route path="/account/products/add-product" element={<AddProductPage />}/>
              <Route path="/account/products/:productId" element={<ProductDetailsPage />}/>
              <Route path="/account/products/:productId/edit" element={<EditProductPage />}/>
              <Route path="/account/addresses/add-address" element={<AddAddressPage />}/>
              <Route path="/account/addresses" element={<UserAddressesPage />}/>
            </Route>
            <Route path="/products/:productId" element={<ProductDetailsPage />}/>
            <Route path="/page-not-found" element={<PageNotFound />}/>
            <Route path="*" element={<PageNotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
