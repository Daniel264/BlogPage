import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";

export default function Trending() {
    const [firstImage, setFirstImage] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    // const [titles, setTitles] = useState<string[]>([]);

    async function Trending() {
        const response = await fetch("http://localhost:3000/post", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const result = await response.json();
            console.log("result:", result[0]);
            const sortedResults = result.sort(
                (a: { views: number }, b: { views: number }) =>
                    b.views - a.views,
            );
            const topCovers = sortedResults.map(
                (post: { cover: unknown; title: string }) => post.cover,
            );
            const topTitles = sortedResults.map(
                (post: { title: string }) => post.title,
            );
            const topDates = sortedResults.map(
                (post: { createdAt: string }) => post.createdAt,
            );
            setFirstImage(topCovers);
            setTitles(topTitles);
            setDates(topDates);
            console.log(topDates);
        }
    }
    useEffect(() => {
        Trending();
    }, []);
    return (
        <section className="w-full flex flex-row justify-center items-center py-20">
            {/* <div>
                <h2 className="font-light text-5xl">Trending Posts.</h2>
            </div> */}
            <div className="w-[50%] grid grid-cols-2 gap-5">
                <div className="col-span-2 relative h-[390px] w-[100%] flex justify-start items-end overflow-hidden">
                    <img
                        className="object-cover hover:scale-110  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[0]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-2xl p-10">
                        {titles[0]}
                    </p>
                    <div className="absolute text-white font-medium text-sm p-3 gap-2 flex w-fit h-fit items-center">
                        <FaRegCalendarAlt size="18px" />
                        {dates[0]
                            ? format(new Date(dates[0]), "MMMM do, yyyy")
                            : "Invalid Date"}
                    </div>
                </div>
                <div className="col-span-1 relative h-max w-auto flex justify-start items-end overflow-hidden">
                    <img
                        className="h-[220px] w-[100%] hover:scale-110  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[1]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-xl p-6">
                        {titles[1]}
                    </p>
                    <div className="absolute text-white font-medium text-sm pl-8 p-2 flex gap-2 h-fit w-fit items-center">
                        <FaRegCalendarAlt size="18px" />
                        {dates[1]
                            ? format(new Date(dates[1]), "MMMM do, yyyy")
                            : "Invalid Date"}
                    </div>
                </div>
                <div className="col-span-1 relative h-max w-auto flex justify-start items-end overflow-hidden">
                    <img
                        className="h-[220px] w-[100%] hover:scale-110  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[2]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-xl p-8">
                        {titles[2]}
                    </p>
                    <p className="absolute text-white font-medium text-sm pl-8 p-2">
                        {dates[2]
                            ? format(new Date(dates[2]), "MMMM do, yyyy")
                            : "Invalid Date"}
                    </p>
                </div>
            </div>
            <div>
                <h2 className="text-3xl">Trending Posts</h2>
                <div className="bg-base-200 rounded-badge">
                    {titles.map((item, index) => (
                        <article key={index} className="flex flex-col">
                            <p className="font-semibold text-lg leading-10">
                                {item}
                            </p>
                            <p>
                                {" "}
                                {dates[0]
                                    ? format(new Date(dates[0]), "MMM do, yyyy")
                                    : "Invalid Date"}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
