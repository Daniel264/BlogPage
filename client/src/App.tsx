import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Post from "./assets/Interface/usePost";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/post").then((response) =>
      response.json().then((posts) => setPosts(posts))
    );
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <Header />
            {posts.length > 0 && posts.map((post) => <BlogPage key={post.id} {...post} />)}
          </>
        }
      />
    </Routes>
  );
}

export default App;
