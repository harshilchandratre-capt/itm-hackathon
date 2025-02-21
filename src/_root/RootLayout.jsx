import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <main className="flex flex-1 h-full w-full">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default RootLayout;
