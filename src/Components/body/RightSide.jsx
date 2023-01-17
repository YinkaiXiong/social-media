import React from "react";
import "../../assets/css/body/RightSide.css";
import FriendCard from "./FriendCard";
import friendlistdata from "../../assets/friendlistData";

const RightSide = () => {
  return (
    <div className="Right-side">
      <h2>Contacts</h2>
      <div className="right-side-friendList">
        {friendlistdata.map((friend, index) => {
          return (
            <FriendCard
              key={index}
              id={friend.userId}
              user={friend.username}
              userAvatar={friend.user_avatar}
              userUrl={friend.userURL}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RightSide;
