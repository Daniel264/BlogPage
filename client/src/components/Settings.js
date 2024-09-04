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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Settings = ({ picture: initialPicture }) => {
    const [file, setFile] = (0, react_1.useState)(null);
    const [picture, setPicture] = (0, react_1.useState)(initialPicture);
    const [message, setMessage] = (0, react_1.useState)(null);
    function changePicture(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            if (file)
                data.set("picture", file);
            ev.preventDefault();
            const response = yield fetch("https://localhost:3000/picture", {
                method: "POST",
                body: data,
                credentials: "include",
            });
            if (response.ok) {
                const result = yield response.json();
                setMessage("Picture updated successfully");
                setPicture(result.picture);
                console.log(result);
                response.json();
            }
            else {
                setMessage("Picture not updated");
            }
        });
    }
    return (<react_router_dom_1.Form onSubmit={changePicture}>
      <div className="w-full h-[100vh] font-montserrat flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold"></h1>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="">
            <img className="w-[200px] h-[200px] rounded-full bg-contain border-[1px]" src={`http://localhost:3000/${picture}`} alt="Profile picture"/>
          </figure>
          <div className="card-body">
            <h2 className="card-title t mx-auto">Profile</h2>
            <p>Edit Profile picture / avatar</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="flex flex-col pt-5">
          <input onChange={(ev) => setFile(ev.target.files ? ev.target.files[0] : null)} type="file" className="file-input file-input-bordered w-full max-w-xs"/>
          <button className="btn btn-primary mt-5">Save Changes</button>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}

        {!message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </react_router_dom_1.Form>);
};
exports.default = Settings;
