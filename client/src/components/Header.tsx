import { Link } from "react-router-dom";

const header = () => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <Link to="/" className="font-bold text-4xl">
            MyBlog
          </Link>
        </div>
        <div className="flex justify-between w-40 font-medium text-lg">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
    </>
  );
};

export default header;
