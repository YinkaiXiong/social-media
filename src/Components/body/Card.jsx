import React, { useState } from "react";
import "../../assets/css/body/Card.css";
import ReadMoreLess from "./ReadMoreLess";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  ChatLeftDots,
} from "react-bootstrap-icons";

const Card = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const likeBtnHandle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="card-container">
      <div className="card-top containers">
        <div className="card-top-left">
          <div className="card-avatar">
            <a>
              <img src={props.user.user_avatar} alt="Avatar" />
            </a>
          </div>
        </div>
        <div className="card-top-center">
          <div className="card-postUserName">
            <a href="/">{props.user.username}</a>
          </div>
        </div>
        <div className="card-top-right"></div>
      </div>
      <div className="card-content containers">
        <ReadMoreLess>{props.content}</ReadMoreLess>
      </div>
      <div className="card-image-container containers">
        <img src={props.postImage} alt="Post_Image"></img>
      </div>
      <div className="dividing-line" style={{ width: "90%" }}></div>
      <div className="card-bot containers">
        <div className="card-btn-container">
          <div onClick={likeBtnHandle} className="card-btn card-btn-like">
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />}
            Like
          </div>
          <div className="card-btn card-btn-comment">
            <ChatLeftDots />
            Comment
          </div>
        </div>
        <div className="dividing-line" style={{ width: "100%" }}></div>
        <div className="card-comment-container">
          <form>
            <input placeholder="Write your comment..." />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
