import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
type Props = {};

function Layout({}: Props) {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
