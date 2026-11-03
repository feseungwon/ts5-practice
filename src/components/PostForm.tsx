import { useState, type SubmitEvent } from "react";
import type { NewPost } from "../types";

// 실습 3. onAdd props 타입 만들고, 제출 시 onAdd 호출하기
interface PostFormProps {
  onAdd: (data: NewPost) => void;
}

function PostForm({ onAdd }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ userId: 1, title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="내용"
      />
      <button type="submit">작성</button>
    </form>
  );
}

export default PostForm;
