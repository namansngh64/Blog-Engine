import React from "react";
import Base from "./Base";

const NoPage = () => {
  return (
    <Base>
      <img
        src="https://i.stack.imgur.com/6M513.png"
        alt="404! Page Not Found!"
        className="img-fluid"
        // style={{ height: "100%" }}
      />
    </Base>
  );
};

export default NoPage;
