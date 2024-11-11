import { useEffect, useState } from "react";

export default function Trending() {
    const [firstImage, setFirstImage] = useState<string[]>([]);
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
                (post: { cover: unknown }) => post.cover,
            );
            setFirstImage(topCovers);
            // console.log("Images", topCovers);
        }
    }
    useEffect(() => {
        Trending();
    }, []);
    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div>
                <h2 className="font-light text-5xl">Trending Posts.</h2>
            </div>
            <div className="w-[50%] grid grid-cols-2 grid-rows-2 gap-5">
                <div className="col-span-2 ">
                    <img
                        className="h-[360px] w-[100%]"
                        src={`http://localhost:3000/${firstImage[0]}`}
                        alt=""
                    />
                </div>
                <div className="col-span-1">
                    <img
                        className="h-[300px] w-[100%]"
                        src={`http://localhost:3000/${firstImage[1]}`}
                        alt=""
                    />
                </div>
                <div className="col-span-1">
                    <img
                        className="h-[300px] w-[100%]"
                        src={`http://localhost:3000/${firstImage[2]}`}
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
