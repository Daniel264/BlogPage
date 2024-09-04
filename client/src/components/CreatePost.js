"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_quill_1 = __importDefault(require("react-quill"));
require("react-quill/dist/quill.snow.css");
const react_router_dom_1 = require("react-router-dom");
const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks before/after clipboard content
    //   matchVisual: false
    // }
};
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "image",
    "link",
    "clean",
    "list",
    "indent",
    "script",
    "direction",
    "align",
    "color",
    "background",
    "font-family",
    "font-weight",
    "line-height",
    "text-decoration",
    "text-align",
    "text-indent",
    "text-transform",
    "text-white-space",
    "text-overflow",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-decoration-skip",
    "letter-spacing",
    "word-spacing",
];
const CreatePost = () => {
    const [title, setTitle] = (0, react_1.useState)("");
    function createNewPost(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.set("title", title);
            data.set("summary", summary);
            data.set("content", content);
            if (file)
                data.set("file", file);
            ev.preventDefault();
            console.log(file);
            const response = yield fetch("https://blogpage-sho4.onrender.com/post", {
                method: "POST",
                body: data,
                credentials: "include",
            });
            if (response.ok) {
                setTimeout(() => {
                    setRedirect(true);
                }, 2000);
            }
        });
    }
    const [content, setContent] = (0, react_1.useState)("");
    const [summary, setSummary] = (0, react_1.useState)("");
    const [file, setFile] = (0, react_1.useState)(null);
    const [redirect, setRedirect] = (0, react_1.useState)(false);
    if (redirect) {
        return <react_router_dom_1.Navigate to="/home"/>;
    }
    return (<form onSubmit={createNewPost} className="">
      <div className="space-y-12 font-montserrat">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" font-bold leading-7 text-3xl">New Blog</h2>
          <p className="mt-1 text-sm leading-6 ">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 w-full h-max justify-center mx-auto sm:max-w-xl lg:max-w-full">
            <div className="w-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 ">
                Title
              </label>
              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input id="title" name="title" type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="Add a title..." autoComplete="username" className="block flex-1 border-0 w-full bg-transparent py-1.5 pl-1 
                    placeholder:font-semibold placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="summary" className="block text-sm font-medium leading-6 ">
                Summary
              </label>
              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input id="summary" name="summary" type="text" value={summary} onChange={(ev) => setSummary(ev.target.value)} placeholder="janesmith" autoComplete="username" className="block flex-1 border-0 w-full bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
            Write Something...
            <react_quill_1.default value={content} modules={modules} formats={formats} onChange={setContent}/>
            <div className="col-span-full mt-10 w-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
                Upload Image
              </label>
              <input onChange={(ev) => setFile(ev.target.files ? ev.target.files[0] : null)} type="file" className="file-input file-input-bordered w-full sm:max-w-full"/>
            </div>
            <button className="btn bg-black text-white">Create Post</button>
          </div>
        </div>
      </div>
    </form>);
};
exports.default = CreatePost;
