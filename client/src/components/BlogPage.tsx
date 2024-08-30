// import blogImage from "../images/blog-img.jpg";
import Post from "../assets/Interface/usePost";
import { formatISO9075 } from "date-fns";

const BlogPage = ({ title, summary, createdAt, author, cover }: Post) => {
  return (
    <div className="flex flex-col mt-10">
      <div className="pl-5 text-left">
        <div className="flex flex-row w-full justify-between">
          <span className="">{author?.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p>{summary}</p>
      </div>
      <div className="w-full py-5 rounded-2xl">
        <img
          className="w-full rounded-2xl bg-cover min-h-[192px] sm:h-[400px]"
          src={"http://localhost:3000/" + cover}
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogPage;
