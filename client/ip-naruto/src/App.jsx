import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import LandingPage from "./pages/landingpage";
import WikiPage from "./pages/WikiPage";
import DetailPage from "./components/DetailWiki";
import Login from "./pages/loginpage";
import Register from "./pages/registerpage";
import Store from "./pages/storepage";
import MainLayout from "./components/MainLayout";
import AddFigure from "./pages/addFigure";
import Logout from "./components/logout";
import EditFigure from "./pages/EditFigure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/wiki",
    element: <WikiPage />,
  },
  {
    path: "/detail/:id",
    element: <DetailPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/store");
      }
      return null;
    },
  },
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      { path: "/store", element: <Store /> },
      { path: "/add", element: <AddFigure /> },
      {path: "edit/:id", element: <EditFigure />},
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
