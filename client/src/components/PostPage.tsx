import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);

  // useEffect(() => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((response) => response.json())
      .then((data) => setPostInfo(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!postInfo) return "";
  return (
    <>
      <Header />
      <div className="pt-10">
        <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        <h1 className="text-4xl font-semibold">{postInfo.title}</h1>
        <p dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </>
  );
};

export default PostPage;
