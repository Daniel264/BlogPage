import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [email, setEmail] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setEmail(userInfo.email);
      });
    });
  }, []);
  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    setEmail(null);
  }
  return (
    <>
      <header className="flex justify-between">
        <div>
          <Link to="/" className="font-bold text-4xl">
            MyBlog
          </Link>
        </div>
        <div className="flex justify-between w-40 font-medium text-lg">
          {email && (
            <>
              <Link to="/create">Create Post</Link>
              <a className="cursor-pointer" onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!email && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
