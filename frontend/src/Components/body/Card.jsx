import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/body/Card.css";
import ReadMoreLess from "./ReadMoreLess";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  ChatLeftDots,
  Trash3,
} from "react-bootstrap-icons";
import axios from "axios";
import { dateFormatter } from "../../Utility/DateFormatter";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import instance from "../../Utility/axios";

const Card = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(props.likes.length);
  const [postUser, setPostUser] = useState();
  const location = useLocation();
  const { user: authUser } = useContext(UserContext);

  useEffect(() => {
    setIsLiked(props.likes.includes(authUser._id));
  }, [authUser._id, props.likes]);

  useEffect(() => {
    const fetchPostUser = async () => {
      const result = await instance.get(`/users/${props.userId}`);
      setPostUser(result.data);
    };
    fetchPostUser();
  }, [props.userId]);

  const likeBtnHandle = () => {
    /*TODO ADD or REMOVE current user id to the post's likes array depends on isLiked*/
    //console.log(authUser);
    try {
      axios.put("/posts/" + props.id, { userId: authUser._id });
    } catch (error) {}
    setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
    setIsLiked(!isLiked);
  };

  if (!postUser) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="card-container">
        <div className="card-top containers">
          <div className="card-top-left">
            <div className="card-avatar">
              <Link to={"/Profile/" + postUser._id}>
                <img
                  src={
                    postUser.profilePicture === "" ||
                    postUser.profilePicture === undefined
                      ? "/images/default_avatar.png"
                      : postUser.profilePicture
                  }
                  alt="Avatar"
                  referrerPolicy={"no-referrer"}
                />
              </Link>
            </div>
          </div>
          <div className="card-top-center">
            <div className="card-postUserName">
              <Link
                to={"/Profile/" + postUser._id}
                className={"card-postUserNameLink"}
              >
                {postUser.username}
              </Link>
            </div>
            <div className={"card-postTime"}>{dateFormatter(props.date)}</div>
          </div>
          <div className="card-top-right">
            {location.pathname === "/Profile" && (
              <button
                className={"card-deleteBtn"}
                onClick={() => {
                  //Display delete dialog and pass this post's id to Profile.jsx
                  props.dialog(true);
                  props.setDeletePostId(props.id);
                }}
              >
                <Trash3 />
              </button>
            )}
          </div>
        </div>
        <div className="card-content containers">
          <ReadMoreLess>{props.content}</ReadMoreLess>
        </div>
        <div className="card-image-container containers">
          {props.postImage && <img src={props.postImage} alt="Post_Image" />}
        </div>
        <div className="dividing-line" style={{ width: "90%" }}></div>
        <div className="card-bot containers">
          <div className="card-btn-container">
            <div onClick={likeBtnHandle} className="card-btn card-btn-like">
              {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />}
              Like
              <span> {likeNum}</span>
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
  }
};

export default Card;
