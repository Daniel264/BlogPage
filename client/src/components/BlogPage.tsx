// import blogImage from "../images/blog-img.jpg";
import { Link } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaComment, FaRegCalendarAlt } from "react-icons/fa";
import Comments from "./Comments";

const BlogPage = ({ _id, title, summary, createdAt, author, cover }: Post) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    function openModal(): void {
        const modal = document.getElementById(
            "my_modal_2",
        ) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    }
    if (loading) {
        return (
            <div className="flex w-full flex-col gap-4 mt-16">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        );
    }

    setTimeout;

    const getPicture: string | null = localStorage.getItem("savedPicture");
    return (
        <div className="flex flex-col md:flex-row-reverse mt-10 lg:w-9/12 lg:pr-32 ">
            <div className="pl-5 text-left">
                <div className="flex flex-row w-full justify-between">
                    <span className="font-regular flex">
                        <div className="avatar mr-3 z-0">
                            <div className="ring-primary ring-offset-base-100 text-center w-7 rounded-full border-[1px] border-black z-0">
                                <figure className="">
                                    <img
                                        className="w-[200px] h-[200px] rounded-full bg-contain border-[1px]"
                                        src={`http://localhost:3000/${getPicture}`}
                                        alt="Profile picture"
                                    />
                                </figure>
                            </div>
                        </div>
                        <p className="font-medium">{author?.username}</p>
                    </span>
                    <time className="font-medium flex gap-2 w-fit h-fit items-center text-[#616A77]">
                        <FaRegCalendarAlt size="18px" />
                        {format(new Date(createdAt), "MMMM do, yyyy")}
                    </time>
                </div>
                <Link
                    className=" text-[1.7rem] leading-[2.5rem] font-semibold hover:text-[#646464] hover:opacity-75 transition-opacity hover:transition-all duration-200 ease-linear"
                    to={`/post/${_id}`}
                >
                    {title}
                </Link>
                <p className="text-[#616A77] text-md">{summary}</p>
                <div className="text-left">
                    <button
                        className="btn flex justify-center w-fit bg-inherit border-none hover:bg-inherit hover:border-none"
                        onClick={openModal}
                    >
                        <FaComment size="18px" />
                    </button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Comments</h3>
                            <p className="py-4">
                                <Comments />
                            </p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
            <div className="max-w-[400px] min-w-[400px] max-h-[250px] overflow-hidden">
                <Link className="" to={`/post/${_id}`}>
                    <img
                        className="min-w-full min-h-full hover:scale-105  transition-all ease-in duration-300 overflow-hidden"
                        src={"http://localhost:3000/" + cover}
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
};

export default BlogPage;
