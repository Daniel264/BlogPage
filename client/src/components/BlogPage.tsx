// import blogImage from "../images/blog-img.jpg";
import { Link } from "react-router-dom";
import Post from "../assets/Interface/usePost";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
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
        <div className="flex flex-row-reverse mt-10 lg:w-9/12 lg:pr-32 border-x-[1.5px] border-b-[1.5px]">
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
                    <time className="font-medium">
                        {format(new Date(createdAt), "MMMM do, yyyy")}
                    </time>
                </div>
                <Link
                    className=" text-[1.7rem] leading-[2.5rem] font-semibold mb-16"
                    to={`/post/${_id}`}
                >
                    {title}
                </Link>
                <p className="text-[#616A77] text-md">{summary}</p>
            </div>
            <div className="">
                <Link className="max-w-[450px] max-h-[250px] overflow-hidden" to={`/post/${_id}`}>
                    <img
                        className="w-full md:min-w-[450px] bg-cover min-h-[192px] sm:max-h-[250px] scale-95 hover:scale-100  transition-all ease-in duration-150 overflow-hidden"
                        src={"http://localhost:3000/" + cover}
                        alt=""
                    />
                </Link>
            </div>
            {/* <div className="text-left w-full bg-inherit"> */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button
                    className="btn bg-white flex w-full justify-center border-none hover:bg-inherit hover:border-none"
                    onClick={openModal}
                >
                    <FaComment size="30px" />
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
            </div> */}
            {/* <hr className="border-dashed bg-gray-300 h-[1px]" /> */}
        </div>
    );
};

export default BlogPage;
