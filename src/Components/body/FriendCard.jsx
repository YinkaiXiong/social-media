import React from "react";
import "../../assets/css/body/FriendCard.css";

const FriendCard = (props) => {
  return (
    <a href={props.userUrl}>
      <div className="friendCard-container">
        <div className="friendCard-avatar">
          <img src={props.userAvatar} alt="FriendCard avatar" />
        </div>
        <div className="friendCard-text-container">{props.user}</div>
      </div>
    </a>
  );
};

export default FriendCard;
