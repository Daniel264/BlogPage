import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  async function changePicture(ev: FormEvent) {
    const data = new FormData();
    if (file) data.set("picture", file);
    ev.preventDefault();
    const response = await fetch("http://localhost:3000/picture", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();
      setMessage("Picture updated successfully");
      console.log(result);

      response.json();
    } else {
      setMessage("Picture not found");
    }
  }
  return (
    <Form onSubmit={changePicture}>
      <div className="w-full h-[100vh] font-montserrat flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="rounded-full">
            <img
              className=""
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title t">Profile</h2>
            <p>Edit Profile picture / avatar</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <input
            onChange={(ev) =>
              setFile(ev.target.files ? ev.target.files[0] : null)
            }
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary">Save Changes</button>
        </div>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </Form>
  );
};

export default Settings;
