import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import App from "../App";
import CreatePost from "../components/CreatePost";
import PostPage from "../components/PostPage";
import Settings from "../components/Settings";
// import AnimatePage from "../pages/AnimatePage";
import Profile from "../images/profile.png";
import AnimatePage from "../pages/AnimatePage";

const router = createBrowserRouter([
  { path: "/", element: <AnimatePage /> },
  { path: "/home", element: <App /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/Create", element: <CreatePost /> },
  { path: "/post/:id", element: <PostPage /> },
  { path: "/settings", element: <Settings picture={Profile} /> },
]);

export default router;
