
interface Author {
  username: string;
}

interface Post {
  _id: string;
  id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  author: Author;
}

export default Post;
