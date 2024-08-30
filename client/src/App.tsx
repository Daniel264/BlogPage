import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
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
            {/* <BlogPage />
            <BlogPage />
            <BlogPage /> */}
            {posts.length > 0 && posts.map((post) => <BlogPage {...post} />)}
          </>
        }
      />
    </Routes>
  );
}

export default App;
