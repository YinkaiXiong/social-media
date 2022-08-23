import React, { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import "../../assets/css/body/Profile.css";
import data from "../../assets/postData";
import Card from "./Card";
import { Gear, House, Person } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  //const { addCurrentUser, user } = useContext(UserContext);
  return (
    /*<div className={"body-container"}>
      <div className={"profile-container"}>
        <div className={"profile-header"}>
          <div className={"profile-avatar-container"}>
            <img src="/images/avatar2.jpg" alt={"User profile avatar"} />
          </div>
        </div>
        <div className={"profile-userInfo"}>
          <div className={"profile-name"}>Name</div>
        </div>
      </div>
    </div>*/
    <div className={"body-container"}>
      <div className={"profile-header"}>
        <div className={"profile-avatar-container"}>
          <img src="/images/avatar2.jpg" alt={"User profile avatar"} />
        </div>
        <div className={"profile-userInfo"}>
          <h1>Test User Name</h1>
          <p>Joined at 2022</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>10 Followings </p>
            <p>5 Follower</p>
          </div>
        </div>
      </div>

      <div className={"profile-body"}>
        <div className="left-side-container">
          <ul className="left-side-nav-list">
            <li className="left-side-nav-listItem">
              <div className="left-side-nav-listItem-icon">
                <House />
              </div>
              <Link to="/" className="left-side-nav-listItem-text">
                Home
              </Link>
            </li>
            <li className="left-side-nav-listItem">
              <div className="left-side-nav-listItem-icon">
                <Person />
              </div>
              <Link to="/Profile" className="left-side-nav-listItem-text">
                Profile
              </Link>
            </li>
            <li className="left-side-nav-listItem">
              <div className="left-side-nav-listItem-icon">
                <Gear />
              </div>
              <Link to="/Setting" className="left-side-nav-listItem-text">
                Setting
              </Link>
            </li>
          </ul>
        </div>
        <div className={"profile-posts-container"}>
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
      </div>
    </div>
  );
};

export default Profile;
