import { createBrowserRouter } from "react-router-dom";
import BookIndex from "./BookIndex";
import Login from "./login";
import Register from "./Register";
import Layout from "../components/Layout";
import SearchBook from "./SearchBook";
import AddBook from "./AddBook";
import GetMyBooks from "./GetMyBooks";
import ProtectedRoute from "../components/ProtectedRoute";

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
        ],
      },
    ],
  },
]);

export default router;
