import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { FaCalendarCheck, FaEye } from "react-icons/fa";
import { format } from "date-fns";

const PostPage = () => {
    const [postInfo, setPostInfo] = useState<Post | null>(null);

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
            <article className="w-full min-h-screen flex flex-col items-center text-[#474747]">
              <div className="pt-10 space-y-10 flex flex-col w-full md:w-[63%] min-h-screen justify-center">
                  <div className="w-full flex flex-col items-center">
                      <img
                          aria-label="This is the post's cover."
                          className="w-[600px] h-[350px]"
                          src={`http://localhost:3000/${postInfo.cover}`}
                          alt="Picture of the blog Post's Main cover image."
                      />
                      <div className="flex gap-8 pt-5">
                          <span className="text-xl flex gap-1">
                              Views: <FaEye size={26} />
                              {postInfo.views}
                          </span>
                          <span className="text-xl flex gap-2">
                              <FaCalendarCheck size={32} />
                              {format(
                                  new Date(postInfo.createdAt),
                                  "MMMM do, yyyy",
                              )}
                          </span>
                      </div>
                  </div>
                  <h1 className="text-4xl font-semibold">{postInfo.title}</h1>
                  <p
                      className="text-left text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: postInfo.content }}
                  />
              </div>
            </article>
        </>
    );
};

export default PostPage;
