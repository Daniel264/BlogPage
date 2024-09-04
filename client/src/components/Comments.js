"use strict";
/* eslint-disable react-hooks/rules-of-hooks */
// import { FormEvent } from "react";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const date_fns_1 = require("date-fns");
const Comments = () => {
    const [comment, setComment] = (0, react_1.useState)("");
    // const [user_id, setUser_id] = useState("");
    // const [author_id, setAuthor_id] = useState("");
    function createComments(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.set("content", comment);
            // data.set("user_id", user_id);
            // data.set("author_id", author_id);
            ev.preventDefault();
            const response = yield fetch("http://localhost:3000/comment", {
                method: "POST",
                body: data,
                credentials: "include",
            });
            response.json();
            if (response.ok) {
                const newComment = yield response.json();
                setComment("");
                setRest((prevComment) => [newComment, ...prevComment]);
            }
        });
    }
    const [rest, setRest] = (0, react_1.useState)([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    function fetchComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:3000/comment");
            if (response.ok) {
                const comments = yield response.json();
                setRest(comments);
                response.json();
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchComments();
    }, []);
    return (<div>
      {rest.map((comment) => (<div key={comment._id} className="chat chat-start flex">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
            </div>
          </div>
          <div className="chat-bubble">
            {/* Not leave it in Darkness */}
            {comment.content}
          </div>
          <p className="text-base mt-3">
            {(0, date_fns_1.formatDistanceToNow)(new Date(comment.createdAt), {
                addSuffix: true,
            })}
          </p>
        </div>))}

      <div>
        {/* <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-bubble">
          It was said that you would, destroy the Sith, not join them.
        </div>
      </div> */}
        {/* <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-bubble">
          It was you who would bring balance to the Force
        </div>
      </div> */}
        <react_router_dom_1.Form onSubmit={createComments}>
          <input type="text" placeholder="Type here" className="input input-bordered mt-5 ml-16 w-full max-w-xs" value={comment} onChange={(ev) => setComment(ev.target.value)}/>
        </react_router_dom_1.Form>
      </div>
    </div>);
};
exports.default = Comments;
