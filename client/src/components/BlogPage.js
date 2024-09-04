"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import blogImage from "../images/blog-img.jpg";
const react_router_dom_1 = require("react-router-dom");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
require("@fontsource/roboto/");
const Comments_1 = __importDefault(require("./Comments"));
const BlogPage = ({ _id, title, summary, createdAt, author, cover }) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    function openModal() {
        const modal = document.getElementById("my_modal_2");
        if (modal) {
            modal.showModal();
        }
    }
    if (loading) {
        return (<div className="flex w-full flex-col gap-4 mt-16">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>);
    }
    setTimeout;
    return (<div className="flex flex-col mt-10 font-montserrat lg:w-9/12 lg:border-r-[2px] lg:border-dashed lg:pr-32">
      <div className="pl-5 text-left">
        <div className="flex flex-row w-full justify-between">
          <span className="font-regular flex">
            <div className="avatar mr-3 z-0">
              <div className="ring-primary ring-offset-base-100 text-center w-7 rounded-full border-solid border-black border-[1px] bg-slate-600 z-0">
                <p className="font-extrabold ">A</p>
                {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
              </div>
            </div>
            <p>{author === null || author === void 0 ? void 0 : author.username}</p>
          </span>
          <time>{(0, date_fns_1.format)(new Date(createdAt), "MMMM do, yyyy")}</time>
        </div>
        <react_router_dom_1.Link className="sm:text-4xl text-2xl font-semibold" to={`/post/${_id}`}>
          {title}
        </react_router_dom_1.Link>
        <p>{summary}</p>
      </div>
      <div className="w-full py-5 rounded-2xl">
        <react_router_dom_1.Link to={`/post/${_id}`}>
          <img className="w-full rounded-2xl bg-cover min-h-[192px] sm:h-[400px]" src={"http://localhost:3000/" + cover} alt=""/>
        </react_router_dom_1.Link>
      </div>
      <div className="text-left">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={openModal}>
          Comments
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Comments</h3>
            <p className="py-4">
              <Comments_1.default />
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <hr className="border-dashed bg-gray-300 h-[1px]"/>
    </div>);
};
exports.default = BlogPage;
