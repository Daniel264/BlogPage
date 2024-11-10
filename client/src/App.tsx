import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Post from "./assets/Interface/usePost";
import Trending from "./components/Trending";

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
                        <div>
                            <Header />
                          <Trending />
                            <div className="w-full flex flex-col items-center">
                                {posts.length > 0 &&
                                    posts.map((post) => (
                                        <BlogPage key={post.id} {...post} />
                                    ))}
                            </div>
                        </div>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
