import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [picture, setPicture] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  async function changePicture(ev: FormEvent) {
    const data = new FormData();
    if (file) data.set("picture", file);
    ev.preventDefault();
    const response = await fetch(
      "http://localhost:3000/picture",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      const result = await response.json();
      setMessage("Picture updated successfully");
      setPicture(result.picture);
      localStorage.setItem("savedPicture", picture);
      response.json();
    } else {
      setMessage("Picture not updated");
    }
  }
  const getPicture:string | null = localStorage.getItem("savedPicture")

  return (
    <Form onSubmit={changePicture}>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold"></h1>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="">
            <img
              className="w-[200px] h-[200px] rounded-full bg-contain border-[1px]"
              src={`http://localhost:3000/${getPicture}`}
              alt="Profile picture"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title t mx-auto">Profile</h2>
            <p>Edit Profile picture / avatar</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="flex flex-col pt-5">
          <input
            onChange={(ev) =>
              setFile(ev.target.files ? ev.target.files[0] : null)
            }
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary mt-5">Save Changes</button>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}

        {!message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </Form>
  );
};

export default Settings;
