"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Header_1 = __importDefault(require("./Header"));
const react_router_dom_1 = require("react-router-dom");
const Login = () => {
    // const [username, setUsername] = useState("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [redirect, setRedirect] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [success, setSuccess] = (0, react_1.useState)("");
    // const [header, setHeader] = useState(false)
    // function Loading() {
    //   return <span className="loading loading-dots loading-xs"></span>;
    // }
    function login(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            setLoading(true);
            const response = yield fetch("http://localhost:3000/login", {
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
            }
            else {
                setTimeout(() => setLoading(false), 4000);
            }
            if (response.ok) {
                setSuccess("Yes");
            }
            else {
                setSuccess("No");
            }
        });
    }
    if (redirect) {
        return <react_router_dom_1.Navigate to="/home"/>;
    }
    return (<>
      <Header_1.default />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-montserrat">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Welcome Back!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={login} method="POST" className="space-y-6">
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
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} required autoComplete="email" className="block w-full rounded-md border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} required autoComplete="current-password" className="block w-full rounded-md border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {loading ? (<span className="loading loading-dots loading-md"></span>) : ("sign in")}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <react_router_dom_1.Link to="/register">
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create an account
              </a>
            </react_router_dom_1.Link>
            {success == "Yes" ? (<div role="alert mt-16" className="alert alert-success text-green-500 bg-inherit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Verification Successful</span>
              </div>) : ("")}
            {success == "No" ? (<div role="alert" className="alert alert-error text-red-500 bg-inherit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Invalid Credentials.</span>
              </div>) : ("")}
          </p>
        </div>
      </div>
    </>);
};
exports.default = Login;