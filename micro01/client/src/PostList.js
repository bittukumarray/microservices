import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const resp = await axios.get("http://localhost:4002/posts");
    setPosts(resp.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //   console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
          <h2>Comments</h2>
          <CommentList comments={post.comments}/>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
