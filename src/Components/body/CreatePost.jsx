import React, { useContext, useState } from "react";
import "../../assets/css/body/CreatePost.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import { FileEarmarkImage, FileEarmarkImageFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    postContent: "",
    imageFile: "",
  });

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

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    //Use this as callback function to get the fileReader's result.
    //Because the reader.onload is unable to assign result to a variable
    const setImageToFormData = (result) => {
      setFormData((prevState) => {
        return {
          postContent: prevState.postContent,
          imageFile: result,
        };
      });
    };

    if (name === "imageFile") {
      convertBase64(files[0], setImageToFormData);
    } else if (name === "postContent") {
      setFormData((prevState) => {
        return {
          postContent: value,
          imageFile: prevState.imageFile,
        };
      });
    }
  };

  console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/posts/create", {
        userId: user._id,
        postContent: formData.postContent,
        imageFile: formData.imageFile,
      });
      setFormData({
        postContent: "",
        imageFile: "",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createPost-container">
      <div className="createPost-left">
        <div className="createPost-avatar">
          <a href={"/Profile"}>
            <img src="/images/avatar_test.webp" alt="Avatar" />
          </a>
        </div>
      </div>
      <div className="createPost-right">
        <form onSubmit={handleSubmit}>
          <div className="createPost-right-top">
            {/* <textarea placeholder={"Want to share something?"}></textarea> */}
            <TextareaAutosize
              placeholder="Want to share something?"
              rows={4}
              name={"postContent"}
              value={formData.postContent}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="dividing-line"></div>
          <div className="createPost-right-bot">
            <div className="createPost-input-container">
              <label htmlFor="img_upload" className="custom_img_upload">
                {/*<img
                  src="https://img.icons8.com/material-rounded/24/000000/upload--v1.png"
                  alt="Upload images"
                />*/}
                {formData.imageFile === "" ? (
                  <FileEarmarkImage />
                ) : (
                  <FileEarmarkImageFill />
                )}
              </label>
              <input
                id="img_upload"
                name={"imageFile"}
                type="file"
                accept=".png,.jpeg,.jpg,.webp"
                onChange={handleChange}
              />
            </div>
            <div className="createPost-button-container">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
