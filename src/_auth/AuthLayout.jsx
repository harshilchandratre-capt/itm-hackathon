import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
      {/* <nav className="w-full"> auth layout</nav> */}

      <Outlet />
    </div>
  );
};

export default AuthLayout;
