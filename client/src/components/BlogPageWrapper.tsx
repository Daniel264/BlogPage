import { useParams } from "react-router-dom";
import BlogPage from "./BlogPage";

const BlogPageWrapper = () => {
    const { id } = useParams();

    return (
        <BlogPage
            postId={id || ""}
            _id={""}
            id={""}
            title={""}
            summary={""}
            content={""}
            cover={""}
            createdAt={""}
            views={0}
        />
    );
};

export default BlogPageWrapper;
