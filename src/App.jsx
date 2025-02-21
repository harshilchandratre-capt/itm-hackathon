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

function App() {
  const { addUser } = useContext(userContext);
  const getCurrentUser = async () => {
    try {
      const user = await authServices.getCurrentUser();
      console.log("Fetching user...");
      if (user) {
        addUser(user);
        console.log(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
