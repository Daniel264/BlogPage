import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import App from "../App";
import CreatePost from "../components/CreatePost";
import PostPage from "../components/PostPage";
import Settings from "../components/Settings";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/Create", element: <CreatePost /> },
  { path: "/post/:id", element: <PostPage /> },
  { path: "/settings", element: <Settings /> },
]);

export default router;
