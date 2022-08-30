import React, { useState } from "react";

const ReadMoreLess = ({ children }) => {
  const [isExpand, setIsExpand] = useState(false);

  const btnHandle = () => {
    setIsExpand(!isExpand);
  };

  if (children.length < 150) {
    return <div>{children}</div>;
  } else {
    return (
      <div>
        {isExpand ? children : children.substring(0, 150) + "..."}
        <button onClick={btnHandle}>
          {isExpand ? "Read Less" : "Read More"}
        </button>
      </div>
    );
  }
};

export default ReadMoreLess;
