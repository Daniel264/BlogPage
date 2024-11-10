import { FormEvent, useState } from "react";
import Header from "./Header";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [header, setHeader] = useState(false)

    // function Loading() {
    //   return <span className="loading loading-dots loading-xs"></span>;
    // }

    async function login(event: FormEvent) {
        event.preventDefault();
        setLoading(true);

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        if (response.ok) {
            setTimeout(() => {
                setRedirect(true);
            }, 4000);
        } else {
            setTimeout(() => setLoading(false), 4000);
        }
        if (response.ok) {
            toast.success("Login Successful");
        } else {
            toast.error("Invalid Credentials");
        }
    }

    if (redirect) {
        return <Navigate to="/home" />;
    }

    return (
        <>
            <ToastContainer
                newestOnTop={true}
                pauseOnHover={false}
                autoClose={3000}
            />
            <Header />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl md:text-4xl font-bold leading-9">
                        Welcome Back!
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        action="#"
                        onSubmit={login}
                        method="POST"
                        className="space-y-6"
                    >
                        {/* <div className="text-left">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
                        <div className="text-left">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:manrope-light"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(ev) =>
                                        setPassword(ev.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:bg-gradient-to-l hover:from-black hover:via-gray-900 hover:to-gray-800 transition-all duration-300 px-3 py-3 text-sm font-semibold leading-6 shadow-sm"
                            >
                                {loading ? (
                                    <span className="loading loading-dots loading-md"></span>
                                ) : (
                                    "sign in"
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link to="/register">
                            <a
                                href="#"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Create an account
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
