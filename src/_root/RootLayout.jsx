import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const RootLayout = () => {
  return (
    <main className="flex flex-1 h-full w-full flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
