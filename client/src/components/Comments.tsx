/* eslint-disable react-hooks/rules-of-hooks */
// import { FormEvent } from "react";

import { FormEvent, useEffect, useState } from "react";
import { Form } from "react-router-dom";

import { Comment } from "../assets/Interface/useComment";

import { formatDistanceToNow } from "date-fns";

const Comments = () => {
  const [comment, setComment] = useState("");
  // const [user_id, setUser_id] = useState("");
  // const [author_id, setAuthor_id] = useState("");
  async function createComments(ev: FormEvent) {
    const data = new FormData();
    data.set("content", comment);
    // data.set("user_id", user_id);
    // data.set("author_id", author_id);
    ev.preventDefault();

    const response = await fetch("https://blogpage-1-r5za.onrender.com/comment", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    response.json();

    if (response.ok) {
      const newComment = await response.json();
      setComment("");
      setRest((prevComment) => [newComment, ...prevComment]);
    }
  }
  const [rest, setRest] = useState<Comment[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  async function fetchComments() {
    const response = await fetch("https://blogpage-1-r5za.onrender.com/comment");
    if (response.ok) {
      const comments = await response.json();
      setRest(comments);
      response.json();
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div>
      {rest.map((comment) => (
        <div key={comment._id} className="chat chat-start flex">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-bubble">
            {/* Not leave it in Darkness */}
            {comment.content}
          </div>
          <p className="text-base mt-3">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      ))}

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
        <Form onSubmit={createComments}>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered mt-5 ml-16 w-full max-w-xs"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
        </Form>
      </div>
    </div>
  );
};

export default Comments;
