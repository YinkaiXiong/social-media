import React from "react";
import "../../assets/css/body/Dialog.css";

const Dialog = (props) => {
  return (
    <div className={"dialog-container"}>
      <div className={"dialog-body"}>
        <h2>Confirm Delete</h2>
        <div className={"dialog-divideLine"}></div>
        <h3>Are you sure you want to delete this post?</h3>
        <div className={"dialog-btn-container"}>
          <button
            style={{ backgroundColor: "#D52D2D" }}
            className={"dialog-btn"}
            onClick={() => {
              console.log("delete");
              props.handleDelete();
              props.dialog(false);
            }}
          >
            Delete
          </button>
          <button
            style={{ backgroundColor: "#cccccc" }}
            className={"dialog-btn"}
            onClick={() => {
              props.setDeletePostId();
              props.dialog(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
