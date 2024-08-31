import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '@fontsource/roboto/400.css'; 
import '@fontsource/roboto/700.css'; // 
import '@fontsource/alex-brush'; 



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
        {/* <div>
          <Link to="/" className="font-bold text-3xl">
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
        </div> */}

        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full">
              <div className="flex-none lg:hidden ">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  {/* <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path> */}
                  {/* </svg> */}
                  <div className="avatar w-14 mr-5">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                      <img src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                    </div>
                  </div>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">
                {" "}
                <Link to="/" className="font-bold text-3xl font-alexBrush">
                  MyBlog
                </Link>
              </div>
              {/* <div className="hidden flex-none lg:block"> */}
              {/* <ul className="menu menu-horizontal"> */}
              {/* Navbar menu content here */}
              {/* <li>
                    <a>Navbar Item 1</a>
                  </li>
                  <li>
                    <a>Navbar Item 2</a>
                  </li>
                </ul> */}
              {/* </div> */}
            </div>
            {/* Page content here */}
            {/* Content*/}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-black min-h-full w-96 text-white font-medium text-xl p-4">
              {/* Sidebar content here */}
              <li>
                {email && (
                  <>
                    <Link to="/create">Create Post</Link>
                  </>
                )}
              </li>
              <li>
                <a>
                  {email && (
                    <>
                      <a className="cursor-pointer" onClick={logout}>
                        Logout
                      </a>
                    </>
                  )}
                </a>
                <a>
                  {!email && (
                    <>
                      <Link to="/register">Register</Link>
                    </>
                  )}
                </a>
                <a>
                  {!email && (
                    <>
                      <Link to="/login">Login</Link>
                    </>
                  )}
                </a>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
