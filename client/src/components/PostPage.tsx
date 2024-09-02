import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Post from "../assets/Interface/usePost";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState<Post | null>(null);

  // useEffect(() => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://blog-page-six-dusky.vercel.app/post/${id}`)
      .then((response) => response.json())
      .then((data) => setPostInfo(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!postInfo) return "";
  return (
    <>
      <Header />
      <div className="pt-10">
        <img className="w-full" src={`https://blog-page-six-dusky.vercel.app/${postInfo.cover}`} alt="" />
        <h1 className="text-4xl font-semibold">{postInfo.title}</h1>
        <p dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </>
  );
};

export default PostPage;
