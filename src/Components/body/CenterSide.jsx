import React from "react";
import "../../assets/css/body/CenterSide.css";
import CreatePost from "./CreatePost";
import Card from "./Card";
import data from "../../assets/postData";

const CenterSide = () => {
  return (
    <div className="Center-side">
      <CreatePost />
      {/* <Card_test /> */}
      {data.map((post, index) => {
        return (
          <Card
            key={index}
            id={post.id}
            user={post.user}
            content={post.content}
            postImage={post.post_imageURL}
          />
        );
      })}
    </div>
  );
};

export default CenterSide;
