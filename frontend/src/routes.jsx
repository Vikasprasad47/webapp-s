import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ModelPage from "./pages/ModelPage";
import VideoPage from "./pages/VideoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Has <Header /> and <Outlet />
    children: [
      { path: "", element: <Home /> },
      { path: "model/:id", element: <ModelPage /> },
      { path: "video/:id", element: <VideoPage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;
