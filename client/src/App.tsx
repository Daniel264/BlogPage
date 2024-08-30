import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import Header from "./components/Header";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/post").then((response) =>
      response.json().then((posts) => console.log(posts))
    );
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <Header />
            <BlogPage />
            <BlogPage />
            <BlogPage />
          </>
        }
      />
    </Routes>
  );
}

export default App;
