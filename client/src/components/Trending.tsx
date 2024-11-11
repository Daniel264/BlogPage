import { useEffect } from "react";

export default function Trending() {
    async function Trending() {
        const response = await fetch("http://localhost:3000/post", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const result = await response.json();
            console.log("result:", result);
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
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
