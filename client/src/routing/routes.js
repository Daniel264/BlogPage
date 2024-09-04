"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("../components/Login"));
const Register_1 = __importDefault(require("../components/Register"));
const App_1 = __importDefault(require("../App"));
const CreatePost_1 = __importDefault(require("../components/CreatePost"));
const PostPage_1 = __importDefault(require("../components/PostPage"));
const Settings_1 = __importDefault(require("../components/Settings"));
const AnimatePage_1 = __importDefault(require("../pages/AnimatePage"));
const profile_png_1 = __importDefault(require("../images/profile.png"));
const router = (0, react_router_dom_1.createBrowserRouter)([
    { path: "/", element: <AnimatePage_1.default /> },
    { path: "/home", element: <App_1.default /> },
    { path: "/Login", element: <Login_1.default /> },
    { path: "/Register", element: <Register_1.default /> },
    { path: "/Create", element: <CreatePost_1.default /> },
    { path: "/post/:id", element: <PostPage_1.default /> },
    { path: "/settings", element: <Settings_1.default picture={profile_png_1.default}/> },
]);
exports.default = router;
