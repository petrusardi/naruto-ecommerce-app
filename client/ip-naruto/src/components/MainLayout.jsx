import { Outlet } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";

const MainLayout = () => {
    return (
      <>
        <NavbarLogin />
        <Outlet />
      </>
    );
  };

  export default MainLayout