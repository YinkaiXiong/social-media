import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Contexts/UserContext";
import "../../assets/css/body/Profile.css";
import Card from "./Card";
import { Gear, House, Person } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dialog from "./Dialog";
import { postDateFormatter } from "../../Utility/DateFormatter";

const Profile = () => {
  const { addCurrentUser, user } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState("");
  const [posts, setPosts] = useState([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const navigate = useNavigate();
  const { userId } = useParams();

  //Check if the user is logged in, if not send to Log in page
  useEffect(() => {
    (async function fetchData() {
      try {
        const userIsAuth = await axios.get("/isAuth");
        if (userIsAuth) {
          if (userIsAuth.data === null) {
            navigate("/LogIn", { replace: true });
          } else {
            //If the url param userId exists, fetch the user by userId
            //And add this user as the currentUser
            if (userId) {
              const user = await axios.get("/users/" + userId);
              addCurrentUser(user.data);
              //Fetch all posts created by the current user
              const postsData = await axios.post("/posts/timeline/all", {
                userId: user.data._id,
              });
              //Add user's posts
              setPosts(postsData.data);
            } else {
              //If the userId param doesn't exist, it means currently
              //visiting logged-in user's profile. Set the logged-in user
              //as the current user
              addCurrentUser(userIsAuth.data);
              //Fetch all posts created by the current user
              const postsData = await axios.post("/posts/timeline/all", {
                userId: userIsAuth.data._id,
              });
              setPosts(postsData.data);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  //When avatarFile changes, send the file to server and upload to DB
  useEffect(() => {
    if (avatarFile !== "") {
      (async () => {
        try {
          const response = await axios.post("/users/updateAvatar", {
            userId: user._id,
            avatarFile: avatarFile,
          });
          addCurrentUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [avatarFile]);

  const convertBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      //pass result to callback function
      callback(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = async (event) => {
    const getAvatarBase64 = (result) => {
      setAvatarFile(result);
    };
    convertBase64(event.target.files[0], getAvatarBase64);
  };

  //Display post list. If no post created by the current user, display no post
  const displayPosts = () => {
    if (posts.length === 0) {
      return (
        <div className={"noPostMsg"}>
          This user has not create any post yet.
        </div>
      );
    } else {
      return posts.map((post, index) => {
        return (
          <Card
            key={index}
            id={post._id}
            userId={post.userId}
            content={post.postContent}
            postImage={post.imgURL}
            likes={post.likes}
            date={post.createdAt}
            dialog={setDisplayDialog}
            setDeletePostId={setDeletePostId}
          />
        );
      });
    }
  };

  const handleDelete = async () => {
    //console.log(deletePostId);
    await axios.post(`/posts/${deletePostId}`, {
      userId: user._id,
    });
    window.location.reload();
  };

  if (!user) {
    return <div>Loading</div>;
  } else {
    return (
      <div className={"body-container"}>
        <div className={"profile-header"}>
          <div className={"profile-avatar-container"}>
            <label htmlFor={"avatarFile"}>Change</label>
            <input
              id="avatarFile"
              name={"avatarFile"}
              type="file"
              accept=".png,.jpeg,.jpg, .webp"
              onChange={handleChange}
            />
            <img
              src={
                user.profilePicture === "" || user.profilePicture === undefined
                  ? "/images/default_avatar.png"
                  : user.profilePicture
              }
              alt={"User profile avatar"}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className={"profile-userInfo"}>
            <h1>{user.username}</h1>
            <p>Joined in {postDateFormatter(user.createdAt)}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>{user.followings.length} Followings </p>
              <p>{user.followers.length} Follower</p>
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
          <div className={"profile-posts-container"}>{displayPosts()}</div>
        </div>
        {displayDialog && (
          <Dialog
            dialog={setDisplayDialog}
            setDeletePostId={setDeletePostId}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  }
};

export default Profile;
