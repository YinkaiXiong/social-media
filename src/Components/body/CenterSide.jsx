import React, { useEffect, useState } from "react";
import "../../assets/css/body/CenterSide.css";
import CreatePost from "./CreatePost";
import Card from "./Card";
import axios from "axios";

const CenterSide = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios("/posts/timeline/all");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  if (!posts) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="Center-side">
        <CreatePost />
        {posts.map((post, index) => {
          return (
            <Card
              key={index}
              id={post._id}
              userId={post.userId}
              content={post.postContent}
              postImage={post.imgURL}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
      </div>
    );
  }
};

export default CenterSide;
