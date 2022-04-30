import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBlogs } from "../blog/helper/blogapicalls";
import Base from "./Base";
import "../style/home.css";

const Home = (props) => {
  let history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");

  const message = () => {
    var message = (props.location && props.location.message) || undefined;
    // console.log(message + " " + props.location.signout);

    if (message !== undefined) {
      console.log("HEHE");
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      message = undefined;
    }
  };

  const preload = () => {
    getAllBlogs().then((data) => {
      setBlogs([...data]);
    });
    // console.log(blogs);
  };

  useEffect(() => {
    message();
    if (props.location && props.location.message) {
      props.location.message = undefined;
    } //because signout toast not working in signin page
    preload();
  }, []);

  const blogCard = (title, blogBody, pic, blogId, key) => {
    return (
      <div
        className="col-6"
        key={key}
        onClick={() => {
          blogClick(blogId);
        }}
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <div className="blogWrapper1">
          {pic ? (
            // <div className="row">
            //   <div className="col-9">
            //     <div className="blogHeading">{title}</div>
            //     <div className="blogBody">
            //       {blogBody.substring(0, 250)}
            //       {blogBody.length > 250 ? "..." : ""}
            //     </div>
            //   </div>
            //   <div className="col-3">
            //     <img
            //       className="img-fluid"
            //       src={pic}
            //       style={({ width: "150px" }, { height: "100px" })}
            //     />
            //   </div>
            // </div>
            // <div className="col-3">
            <div className="row">
              {/* <div className="col-9"> */}
              <img
                className="img-fluid"
                src={pic}
                // style={{ objectFit: "fill" }}
                style={{ height: "200px" }}
              />
              <div className="blogHeading">{title}</div>

              <div className="blogBody">
                {blogBody.substring(0, 250)}
                {blogBody.length > 250 ? "..." : ""}
              </div>
              {/* </div> */}
              {/* <div className="col-3"> */}

              {/* </div> */}
            </div>
          ) : (
            // </div>
            <div className="row">
              <div className="blogHeading">{title}</div>
              <div className="blogBody">
                {blogBody.substring(0, 250)}
                {blogBody.length > 250 ? "..." : ""}
              </div>
              {/* <button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/edit/blog/${blogId}`);
              }}
              className="btn btn-warning edit-btn"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                confirmDelete(e, blogId, key);
              }}
              className="btn btn-danger delete-btn"
            >
              Delete
            </button> */}
            </div>
          )}
        </div>
      </div>
    );
  };

  const blogClick = (blogId) => {
    history.push(`/blog/${blogId}`);
  };

  const allblogs = () => {
    let content = (
      <div className="row">
        {blogs.map(
          (blog, key) =>
            (blog.title.toLowerCase().includes(filter.toLowerCase()) ||
              blog.blogBody.toLowerCase().includes(filter.toLowerCase())) &&
            blogCard(
              blog.title,
              blog.blogBody,
              blog.images.length
                ? window.location.origin + blog.images[0].substring(22)
                : window.location.origin + "/images/static.jpg",
              blog._id,
              key
            )
        )}
      </div>
    );
    return content;
  };

  const filterBar = () => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#2b7a78" }}
      >
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={filter}
              onChange={filterChange}
            />
            {/* <button className="btn btn-info" type="submit">
              Search
            </button> */}
          </form>
          <ui className="navbar-nav">
            <li className="nav-item m-1">
              <select
                className="form-select"
                aria-label="Default select example"
                // style={{ width: "120px" }}
              >
                <option selected>Sort By</option>
                <option value="1">Date</option>
                {/* <option value="2">Two</option>
            <option value="3">Three</option> */}
              </select>
            </li>

            <li className="nav-item m-1">
              <select
                className="form-select"
                aria-label="Default select example"
                // style={{ width: "120px" }}
              >
                <option selected>Order By</option>
                <option value="1">Ascending</option>
                <option value="2">Descending</option>
                {/* <option value="3">Three</option> */}
              </select>
            </li>
          </ui>

          {/* <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort By
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <a className="dropdown-item active" href="#">
                  Date
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    );
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Base>
      {message()}
      {filterBar()}
      {allblogs()}
    </Base>
  );
};

export default Home;
