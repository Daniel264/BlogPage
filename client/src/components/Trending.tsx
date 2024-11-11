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
            const coverImage = result[0];
            // console.log("cover image", coverImage.cover);
            setFirstImage(coverImage.cover);

            const secondCoverImage = result[1];
            setFirstImage(secondCoverImage)
        }
    }
    useEffect(() => {
        Trending();
    }, []);
    return (
        <section>
            <div>
                <p className="font-light text-4xl">Trending Posts.</p>
            </div>
            <div>
                <div>
                    <img src={`http://localhost:3000/${firstImage}`} alt="" />
                </div>
                <div>
                <img src={`http://localhost:3000/${firstImage}`} alt="" />
                </div>
                <div></div>
            </div>
        </section>
    );
}
