import { Link } from "react-router-dom";

const header = () => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="font-bold text-4xl">MyBlog</h1>
        </div>
        <div className="flex justify-between w-40 font-medium text-lg">
          <Link to="/login">Login</Link>
          <Link to="/login">Register</Link>
        </div>
      </header>
    </>
  );
};

export default header;
