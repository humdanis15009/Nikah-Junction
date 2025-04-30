import { lazy } from "react"
import { Outlet } from "react-router-dom";
const Navbar = lazy(() => import("./Navbar"));
const Bottom = lazy(() => import("./Bottom"));

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Bottom />
    </>
  );
};

export default Layout;
