import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Has <Header /> and <Outlet />
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;
