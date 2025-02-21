import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full md:flex ">
      <section className="flex flex-1 h-full w-full">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
