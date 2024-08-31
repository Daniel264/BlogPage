// import blogImage from "../images/blog-img.jpg";
import { Link } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";

const BlogPage = ({ _id, title, summary, createdAt, author, cover }: Post) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4 mt-16">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  setTimeout;
  return (
    <div className="flex flex-col mt-10 font-roboto">
      <div className="pl-5 text-left">
        <div className="flex flex-row w-full justify-between">
          <span className="">{author?.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
        <Link
          className="sm:text-4xl text-2xl font-semibold"
          to={`/post/${_id}`}
        >
          {title}
        </Link>
        <p>{summary}</p>
      </div>
      <div className="w-full py-5 rounded-2xl">
        <Link to={`/post/${_id}`}>
          <img
            className="w-full rounded-2xl bg-cover min-h-[192px] sm:h-[400px]"
            src={"http://localhost:3000/" + cover}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
