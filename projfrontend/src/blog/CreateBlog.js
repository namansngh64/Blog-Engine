import React from "react";
import Base from "../core/Base";
import "../style/createBlog.css";

const CreateBlog = () => {
  return (
    <Base>
      <div className="row">
        <div className="col-md-12 heading">Create Blog</div>
      </div>
      <form>
        <div className="row">
          <div className="col-md-12 mb-4">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <textarea className="form-control" rows="18"></textarea>
          </div>
        </div>
      </form>
    </Base>
  );
};

export default CreateBlog;
