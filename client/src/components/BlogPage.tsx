import blogImage from "../images/blog-img.jpg";
import Post from "../assets/Interface/usePost";

const BlogPage = ({title, summary, content, cover, createdAt}: Post) => {
  return (
    <div className="flex mt-10">
      <div className="w-[70rem]">
        <img className="w-max" src={content} alt="" />
      </div>
      <div className="pl-5">
        <h1 className="text-4xl font-semibold">
          {title}
        </h1>
        <p>{createdAt}</p>
        <p>
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
