// import { FormEvent } from "react";

import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";

const Comments = () => {
  const [comment, setComment] = useState("");
  async function createComments(ev: FormEvent) {
    const data = new FormData();
    data.set("content", comment);
    // data.set("userId", localStorage.getItem("userId"));
    ev.preventDefault();

    const response = await fetch("http://localhost:3000/comment", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    response.json();

    if (response.ok) {
      setComment("");
    }
  }
  return (
    <div>
      <div className="chat chat-start">
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
      </div>
      <div className="chat chat-start">
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
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-bubble">Not leave it in Darkness</div>
      </div>
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
  );
};

export default Comments;
