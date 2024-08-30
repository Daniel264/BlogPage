import blogImage from "../images/blog-img.jpg";
import Post from "../assets/Interface/usePost";
import { formatISO9075 } from "date-fns";

const BlogPage = ({
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}: Post) => {
  return (
    <div className="flex mt-10">
      <div className="w-[70rem]">
        <img className="w-max" src={blogImage} alt="" />
      </div>
      <div className="pl-5">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <span>{author?.username}</span>
        <time>{formatISO9075(new Date(createdAt))}</time>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default BlogPage;
