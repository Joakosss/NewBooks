import { createBrowserRouter } from "react-router-dom";
import BookIndex from "./BookIndex";
import Login from "./login";
import Register from "./Register";
import Layout from "../components/Layout";
import SearchBook from "./SearchBook";
import AddBook from "./AddBook";
import GetMyBooks from "./MyBooks";
import ProtectedRoute from "../components/ProtectedRoute";
import UpdateMyBook from "./UpdateMyBook";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Register /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <BookIndex /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/searchBook", element: <SearchBook /> },
          { path: "/addBook", element: <AddBook /> },
          { path: "/myBooks", element: <GetMyBooks /> },
          { path: "/updateMyBook", element: <UpdateMyBook /> },
        ],
      },
    ],
  },
]);

export default router;
