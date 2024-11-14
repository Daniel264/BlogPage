import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Post from "../assets/Interface/usePost";

const PostPage = () => {
    const [postInfo, setPostInfo] = useState<Post | null>(null);

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
            <div className="pt-10 space-y-10 flex flex-col w-full min-h-screen justify-center">
                <div className="w-full flex justify-center">
                    <img
                        className="w-[600px] h-[350px]"
                        src={`http://localhost:3000/${postInfo.cover}`}
                        alt=""
                    />
                </div>
                <h1 className="text-4xl font-semibold">{postInfo.title}</h1>
                <p
                    className="text-left text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: postInfo.content }}
                />
            </div>
        </>
    );
};

export default PostPage;
