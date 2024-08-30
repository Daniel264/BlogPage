// import blogImage from "../images/blog-img.jpg";
import Post from "../assets/Interface/usePost";
import { formatISO9075 } from "date-fns";

const BlogPage = ({ title, summary, createdAt, author, cover }: Post) => {
  return (
    <div className="flex flex-col mt-10">
      <div className="pl-5">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <span>{author?.username}</span>
        <time>{formatISO9075(new Date(createdAt))}</time>
        <p>{summary}</p>
      </div>
      <div className="w-full p-5">
        <img
          className="w-full bg-cover h-[400px]"
          src={"http://localhost:3000/" + cover}
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogPage;
