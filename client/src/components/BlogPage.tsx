// import blogImage from "../images/blog-img.jpg";
import { Link } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { formatISO9075 } from "date-fns";

const BlogPage = ({ _id, title, summary, createdAt, author, cover }: Post) => {
  return (
    <div className="flex flex-col mt-10 font-roboto">
      <h1 className="font-medium text-2xl md:text-5xl text-left pb-5">
        Hi {author?.username} 👋
      </h1>
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
