import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css"; //
import "@fontsource/alex-brush";
import { FaPlus, FaCog } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [email, setEmail] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Apply the theme stored in localStorage or default to light theme
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function themeState() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }
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
            <div className="navbar w-full bg-inherit">
              <div className="flex-none lg:hidden">
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
                      <img
                        src={
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">
                {" "}
                <Link
                  to="/home"
                  className="font-bold text-3xl md:text-5xl font-alexBrush"
                >
                  MyBlog
                </Link>
              </div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                  <li>
                    <a className="text-xl font-medium">
                      {email && (
                        <>
                          <Link to="/create">Create Post</Link>
                        </>
                      )}
                    </a>
                  </li>
                  <li>
                    <a className="text-xl font-medium">
                      {email && (
                        <>
                          <a className="cursor-pointer" onClick={logout}>
                            Logout
                          </a>
                        </>
                      )}
                    </a>
                  </li>
                  <li>
                    <a className="text-xl font-medium">
                      {!email && (
                        <>
                          <Link to="/register">Register</Link>
                        </>
                      )}
                    </a>
                  </li>
                  <li>
                    <a className="text-xl font-medium">
                      {!email && (
                        <>
                          <Link to="/login">Login</Link>
                        </>
                      )}
                    </a>
                  </li>
                  {/* <li>
                    <a>Navbar Item 2</a>
                  </li> */}
                </ul>
              </div>
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
            <ul className="menu min-h-full text-white font-medium text-xl p-4 bg-black">
              {/* Sidebar content here */}
              <li className="pb-4">
                {email && (
                  <>
                    <Link to="/create">
                      Create Post <FaPlus />
                    </Link>
                  </>
                )}
              </li>
              
                <li className="pb-4">
                  {email && (
                    <>
                      <Link to="/settings">
                      Settings <FaCog />
                      </Link>
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
        <label onChange={themeState} className="swap swap-rotate">
          <input type="checkbox" className="theme-controller opacity-0" />

          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </header>
    </>
  );
};

export default Header;
