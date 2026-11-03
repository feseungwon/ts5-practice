// 실습 1. useEffect 안에서 api.get('/posts')로 게시글 목록 받아보기
import { useEffect, useState } from "react";
import type { NewPost, Post } from "./types";
import { createPost, deletePost, getPosts } from "./api/posts";
import PostForm from "./components/PostForm";
import type { Async } from "./types";

function App() {
  const [state, setState] = useState<Async<Post[]>>({ status: "loading" });

  useEffect(() => {
    getPosts()
      .then((data) => setState({ status: "success", data }))
      .catch((e) => setState({ status: "error", message: String(e) }));
  }, []);

  const addPost = async (data: NewPost) => {
    const created = await createPost(data);
    setState((prev) =>
      prev.status === "success"
        ? { status: "success", data: [created, ...prev.data] }
        : prev,
    );
  };

  const removePost = async (id: number): Promise<void> => {
    await deletePost(id);
    setState((prev) =>
      prev.status === "success"
        ? {
            status: "success",
            data: prev.data.filter((post) => post.id !== id),
          }
        : prev,
    );
  };

  if (state.status === "loading") return <p>불러오는중...</p>;
  if (state.status === "error") return <p>에러: {state.message}</p>;

  return (
    <div>
      <PostForm onAdd={addPost} />
      {state.data.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <br />
          <button onClick={() => removePost(post.id)}>삭제</button>
        </article>
      ))}
    </div>
  );
}

export default App;
