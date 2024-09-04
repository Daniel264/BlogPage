"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const BlogPage_1 = __importDefault(require("./components/BlogPage"));
const Header_1 = __importDefault(require("./components/Header"));
const react_1 = require("react");
function App() {
    const [posts, setPosts] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:3000/post").then((response) => response.json().then((posts) => setPosts(posts)));
    }, []);
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route index element={<>
            <Header_1.default />
            {/* <h1 className="font-normal text-2xl md:text-5xl text-left mt-5">
              Hi 👋
            </h1> */}
            {posts.length > 0 &&
                posts.map((post) => <BlogPage_1.default key={post.id} {...post}/>)}
          </>}/>
    </react_router_dom_1.Routes>);
}
exports.default = App;
