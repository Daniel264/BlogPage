import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Post from "./assets/Interface/usePost";

//https://blogpage-1-r5za.onrender.com

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/post").then((response) =>
            response.json().then((posts) => setPosts(posts)),
        );
    }, []);

    return (
        <>
            <ToastContainer
                newestOnTop={true}
                pauseOnHover={false}
                autoClose={3000}
            />
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <Header />
                            {/* <h1 className="font-normal text-2xl md:text-5xl text-left mt-5">
              Hi 👋
            </h1> */}
                            {posts.length > 0 &&
                                posts.map((post) => (
                                    <BlogPage key={post.id} {...post} />
                                ))}
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
