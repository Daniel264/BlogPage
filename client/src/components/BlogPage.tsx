import blogImage from "../images/blog-img.jpg";

const BlogPage = () => {
  return (
    <div className="flex mt-10">
      <div className="w-[70rem]">
        <img className="w-max" src={blogImage} alt="" />
      </div>
      <div className="pl-5">
        <h1 className="text-4xl font-semibold">
          Full house battery backup coming later this year
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
          itaque ullam illo dicta velit cumque esse dignissimos blanditiis omnis
          vel possimus rerum in dolore quidem, voluptates consequuntur. Earum,
          velit nobis.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
