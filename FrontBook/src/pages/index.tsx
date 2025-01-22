import { createBrowserRouter } from "react-router-dom";
import BookIndex from "./BookIndex";
import Login from "./login";
import Register from "./Register";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <BookIndex /> },
      { path: "/login", element: <Login /> },
      { path: "/registro", element: <Register /> },
    ],
  },
]);

export default router;
