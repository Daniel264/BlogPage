import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogPage from "./components/BlogPage";
import Header from "./components/Header";

function App() {
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
