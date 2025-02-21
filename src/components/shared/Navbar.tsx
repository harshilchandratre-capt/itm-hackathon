import { navbarItems } from "@/constants/constants";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarDrawer from "./SidebarDrawer";

const Navbar = () => {
  const { pathname } = useLocation();
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    checkUrl();
  }, []);

  const checkUrl = () => {
    setCurrentItem(pathname);
  };

  return (
    <nav className="h-[46px] w-full flex items-center shadow-md px-1 lg:px-4 ">
      <Link to={"/"}>
        <h1 className="text-2xl font-extrabold text-brandColor">BRAND LOGO</h1>
      </Link>

      <div className="gap-3 hidden lg:flex flex-1 bg-pink-800  justify-center">
        {navbarItems.map((e) => (
          <Link
            to={e.route}
            className={`font-semibold ${
              e.route == currentItem && `text-primaryColor1`
            }`}
            key={e.route}
            onClick={() => {
              setCurrentItem(e.route);
            }}
          >
            {e.title}
          </Link>
        ))}
      </div>

      <div className="bg-red-900 ">
        <SidebarDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
