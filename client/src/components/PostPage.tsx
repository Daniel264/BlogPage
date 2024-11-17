import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { FaCalendarCheck, FaEye, FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const PostPage = () => {
    const [postInfo, setPostInfo] = useState<Post | null>(null);
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const { id } = useParams();
    async function UpdatePost() {
        const response = await fetch(`http://localhost:3000/post/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, summary }),
            credentials: "include",
        });

        if (response.ok) console.log("Good");
        else console.log("bad");
    }
    console.log("Title", title);
    console.log("Set Title", setTitle);

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then((response) => response.json())
            .then((data) => setPostInfo(data))
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);

    if (!postInfo) return "";
    return (
        <>
            <Header />
            <article className="w-full min-h-screen flex flex-col items-center text-[#616A77]">
                <div className="pt-10 space-y-10 flex flex-col w-full md:w-[63%] min-h-screen justify-center">
                    <div className="w-full flex flex-col items-center">
                        <img
                            aria-label="This is the post's cover."
                            className="w-[600px] h-[350px]"
                            src={`http://localhost:3000/${postInfo.cover}`}
                            alt="Picture of the blog Post's Main cover image."
                        />
                        <div className="flex gap-8 pt-5">
                            <span className="text-xl flex gap-1">
                                Views: <FaEye size={26} />
                                {postInfo.views}
                            </span>
                            <span className="text-xl flex gap-2">
                                <FaCalendarCheck size={32} />
                                {format(
                                    new Date(postInfo.createdAt),
                                    "MMMM do, yyyy",
                                )}
                            </span>
                            <span className="text-xl flex">
                                <FaEdit
                                    size={25}
                                    onClick={() => {
                                        const modal =
                                            document.getElementById(
                                                "my_modal_3",
                                            );
                                        if (modal) {
                                            (
                                                modal as HTMLDialogElement
                                            ).showModal();
                                        }
                                    }}
                                />
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}

                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box w-full flex flex-col items-center gap-3">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                        </form>
                                        <h3 className="font-bold text-lg">
                                            Hello!
                                        </h3>
                                        <section className="w-full flex flex-col items-center">
                                            <form
                                                onSubmit={(ev) => {
                                                    ev.preventDefault();
                                                    UpdatePost();
                                                }}
                                                action="#"
                                                method="PUT"
                                                className="w-full"
                                            >
                                                <div className="flex flex-col gap-3 w-full items-center">
                                                    <input
                                                        type="text"
                                                        // placeholder="Type here"
                                                        value={title}
                                                        placeholder={postInfo.title}
                                                        onChange={(ev) =>
                                                            setTitle(
                                                                ev.target.value,
                                                            )
                                                        }
                                                        className="input input-bordered w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        
                                                        placeholder={postInfo.summary}
                                                        value={summary}
                                                        onChange={(ev) =>
                                                            setSummary(
                                                                ev.target.value,
                                                            )
                                                        }
                                                        className="input input-bordered w-full"
                                                    />
                                                    <button className="btn btn-square">
                                                        <span className="loading loading-spinner"></span>
                                                    </button>
                                                </div>
                                            </form>
                                        </section>
                                    </div>
                                </dialog>
                            </span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold">{postInfo.title}</h1>
                    <p
                        className="text-left text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: postInfo.content }}
                    />
                </div>
            </article>
        </>
    );
};

export default PostPage;
