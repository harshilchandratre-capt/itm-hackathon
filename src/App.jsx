import { Route, Routes } from "react-router-dom";
import ServicesPage from "./_root/servicesPage/ServicesPage";
import ContactPage from "./_root/contact/ContactPage";
import AboutPage from "./_root/about/AboutPage";
import LandingPage from "./_root/landingPage/LandingPage";
import LoginPage from "./_auth/loginPage/LoginPage";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

function App() {
  return (
    <>
      {" "}
      hello
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
