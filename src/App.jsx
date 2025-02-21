import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import authServices from "./services/authServices";
import { userContext } from "./context/userContext";
import ServicesPage from "./_root/servicesPage/ServicesPage";
import ContactPage from "./_root/contact/ContactPage";
import AboutPage from "./_root/about/AboutPage";
import LandingPage from "./_root/landingPage/LandingPage";
import LoginPage from "./_auth/loginPage/LoginPage";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import AuthPage from "./_auth/authPage/AuthPage";
import CreateProfile from "./_root/createProfile/CreateProfile";
import AddProduct from "./_root/addProduct/AddProduct";
import AllProducts from "./_root/allProducts/AllProducts";
import ProductPage from "./_root/productPage/ProductPage";
import PlaceOrder from "./_root/placeOrder/PlaceOrder";
import MyOrders from "./_root/myOrders/MyOrders";
import ManageOrders from "./_root/manageOrders/ManageOrders";

const routes = (
  <>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route
          path="/place-order/:productId/:quantity"
          element={<PlaceOrder />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  </>
);

function App() {
  const { addUser } = useContext(userContext);
  const getCurrentUser = async () => {
    try {
      const user = await authServices.getCurrentUser();
      // console.log("Fetching user...");
      if (user) {
        addUser(user);
        // console.log(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <>{routes}</>;
}

export default App;
