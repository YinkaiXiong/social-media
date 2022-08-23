import React, { useContext, useState } from "react";
import "../../assets/css/body/CreatePost.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    postContent: "",
    imageFile: "",
  });

  const convertBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      //console.log(e.target.result);
      callback(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    const setImageToFormData = (result) => {
      setFormData((prevState) => {
        return {
          postContent: prevState.postContent,
          imageFile: result,
        };
      });
    };
    convertBase64(files[0], setImageToFormData);
    /*const { name, value, files } = event.target;
    setFormData(async (prevState) => {
      if (name === "imageFile") {
        const result = await convertBase64(files[0]);
        console.log(result);
        return {
          postContent: prevState.postContent,
          imageFile: result,
        };
      } else if (name === "postContent") {
        return {
          postContent: value,
          imageFile: prevState.imageFile,
        };
      }
    });*/
    /*console.log(event);
    console.log(event.target);*/
  };

  console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/posts/create", {
        userId: user._id,
        postContent: formData.postContent,
        imageFile: formData.imageFile,
      });
      console.log(response);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createPost-container">
      <div className="createPost-left">
        <div className="createPost-avatar">
          <a>
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
                <img
                  src="https://img.icons8.com/material-rounded/24/000000/upload--v1.png"
                  alt="Upload images"
                />
              </label>
              <input
                id="img_upload"
                name={"imageFile"}
                type="file"
                accept=".png,.jpeg,.jpg"
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
