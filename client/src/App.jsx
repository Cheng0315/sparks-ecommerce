import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage, UserRegistrationPage, LoginPage, UserProfilePage, AccountPage, EditEmailPage, ChangePasswordPage, EditUserInfoPage, UpdateUserRole, AddProductPage, ProductDetailsPage, PageNotFound } from "./pages";
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
              <Route path="/products/add-product" element={<AddProductPage />}/>
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
