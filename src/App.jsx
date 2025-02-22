import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import AuthPage from "./_auth/authPage/AuthPage";
import LoginPage from "./_auth/loginPage/LoginPage";
import AboutPage from "./_root/about/AboutPage";
import AddProduct from "./_root/addProduct/AddProduct";
import AllProducts from "./_root/allProducts/AllProducts";
import ContactPage from "./_root/contact/ContactPage";
import CreateProfile from "./_root/createProfile/CreateProfile";
import HomePage from "./_root/homePage/LandingPage";
import LandingPage from "./_root/landingPage/LandingPage";
import ManageOrders from "./_root/manageOrders/ManageOrders";
import MyOrders from "./_root/myOrders/MyOrders";
import PlaceOrder from "./_root/placeOrder/PlaceOrder";
import ProductPage from "./_root/productPage/ProductPage";
import RootLayout from "./_root/RootLayout";
import ServicesPage from "./_root/servicesPage/ServicesPage";
import { userContext } from "./context/userContext";
import authServices from "./services/authServices";
import ProtectedRoute from "./_root/Protectedroutes";


const routes = (
  <>
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/place-order/:productId/:quantity" element={<PlaceOrder />} />
        </Route>
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
