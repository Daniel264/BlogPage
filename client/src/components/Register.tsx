import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    async function register(event: FormEvent) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 4000);
        event.preventDefault();
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // toast.success("Account created");
            toast.success("Account created");
        } else {
            toast.error("An error occurred");
        }
    }

    return (
        <>
            <ToastContainer
                newestOnTop={true}
                pauseOnHover={false}
                autoClose={3000}
            />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-[450px] max-h-[575px] rounded-lg bg-card text-card-foreground w-full mx-auto mt-6 md:mt-12 border-0 shadow-none md:border md:shadow-sm">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9">
                            Register
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            action="#"
                            onSubmit={register}
                            method="POST"
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-left "
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        placeholder="Enter username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(ev) =>
                                            setUsername(ev.target.value)
                                        }
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-left "
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(ev) =>
                                            setEmail(ev.target.value)
                                        }
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 "
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        type="password"
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
                                <input
                                    type="checkbox"
                                    name="terms"
                                    required
                                    className="rounded-md"
                                    id=""
                                />
                                <label htmlFor="terms" className="ml-3">
                                    By creating an account, you agree to all our{" "}
                                    <a href="#" className="text-blue-600">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:bg-gradient-to-l hover:from-black hover:via-gray-900 hover:to-gray-800 transition-all duration-300 px-3 py-3 text-sm font-semibold leading-6 shadow-sm"
                                >
                                    {loading ? (
                                        <span className="loading loading-dots loading-md"></span>
                                    ) : (
                                        "Sign up"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <p className="mt-10 text-center text-sm text-gray-500 border-[1px] rounded-badge shadow py-3 px-5 w-fit">
                        Already have an Account?{" "}
                        <Link to="/login">
                            <a
                                href="#"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
