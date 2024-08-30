import { PhotoIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  // clipboard: {
  //   // toggle to add extra line breaks before/after clipboard content
  //   matchVisual: false
  // }
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "image",
  "link",
  "clean",
  "list",
  "indent",
  "script",
  "direction",
  "align",
  "color",
  "background",
  "font-family",
  "font-weight",
  "line-height",
  "text-decoration",
  "text-align",
  "text-indent",
  "text-transform",
  "text-white-space",
  "text-overflow",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-decoration-skip",
  "letter-spacing",
  "word-spacing",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  async function createNewPost(ev: FormEvent) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) data.set("file", file);

    ev.preventDefault();
    console.log(file);
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    }
  }
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={createNewPost} className="">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 w-full h-max justify-center mx-auto">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="janesmith"
                    autoComplete="username"
                    className="block flex-1 border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="summary"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Summary
              </label>
              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="summary"
                    name="summary"
                    type="text"
                    value={summary}
                    onChange={(ev) => setSummary(ev.target.value)}
                    placeholder="janesmith"
                    autoComplete="username"
                    className="block flex-1 border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={setContent}
            />

            <div className="col-span-full mt-10">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={(ev) =>
                          setFile(ev.target.files ? ev.target.files[0] : null)
                        }
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <button className="btn">Create Post</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
