import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full">
      <main className="flex flex-1 h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
