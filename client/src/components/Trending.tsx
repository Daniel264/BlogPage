import { useEffect, useState } from "react";

export default function Trending() {
    const [firstImage, setFirstImage] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
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
            setFirstImage(topCovers);
            setTitles(topTitles);
        }
    }
    useEffect(() => {
        Trending();
    }, []);
    return (
        <section className="w-full flex flex-col justify-center items-center">
            {/* <div>
                <h2 className="font-light text-5xl">Trending Posts.</h2>
            </div> */}
            <div className="w-[50%] grid grid-cols-2 grid-rows-2 gap-5">
                <div className="col-span-2 relative h-[390px] w-[100%] flex justify-start items-end overflow-hidden">
                    <img
                        className="object-cover hover:scale-105  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[0]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-2xl p-10">
                        {titles[0]}
                    </p>
                </div>
                <div className="col-span-1 relative h-max w-auto flex justify-start items-end overflow-hidden">
                    <img
                        className="h-[220px] w-[100%] hover:scale-105  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[1]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-xl p-6">
                        {titles[1]}
                    </p>
                </div>
                <div className="col-span-1 relative h-max w-auto flex justify-start items-end overflow-hidden">
                    <img
                        className="h-[220px] w-[100%] hover:scale-105  transition-all ease-in duration-300 overflow-hidden"
                        src={`http://localhost:3000/${firstImage[2]}`}
                        alt=""
                    />
                    <p className="absolute text-white font-semibold text-xl p-6">
                        {titles[2]}
                    </p>
                </div>
            </div>
        </section>
    );
}
