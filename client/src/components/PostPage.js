"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Header_1 = __importDefault(require("./Header"));
const react_router_dom_1 = require("react-router-dom");
const PostPage = () => {
    const [postInfo, setPostInfo] = (0, react_1.useState)(null);
    // useEffect(() => {
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then((response) => response.json())
            .then((data) => setPostInfo(data))
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);
    if (!postInfo)
        return "";
    return (<>
      <Header_1.default />
      <div className="pt-10">
        <img className="w-full" src={`http://localhost:3000/${postInfo.cover}`} alt=""/>
        <h1 className="text-4xl font-semibold">{postInfo.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: postInfo.content }}/>
      </div>
    </>);
};
exports.default = PostPage;
