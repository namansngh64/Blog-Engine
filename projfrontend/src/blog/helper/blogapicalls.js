import { API } from "../../backend";
import axios from "axios";
import { getToken, getToken1 } from "../../auth/helper/authapicalls";

export const createBlog = async (blog) => {
  const user = await getToken();
  return axios
    .post(
      `${API}/create/blog/${user.data.userId}`,

      blog,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.data.token}`
        }
        //   withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
export const editBlog = async (blog, blogId) => {
  const user = await getToken();
  console.log(user.data.token);
  console.log(blog);
  return axios
    .put(
      `${API}/edit/blog/${blogId}/${user.data.userId}`,

      blog,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.data.token}`
        }
        //   withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getBlogById = (blogId) => {
  return axios
    .get(`${API}/blog/${blogId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getUserBlogs = async () => {
  const user = await getToken();
  return axios
    .get(`${API}/blogs/${user.data.userId}`, {
      headers: {
        Authorization: `Bearer ${user.data.token}`
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const deleteBlogById = async (blogId) => {
  const user = await getToken();
  return axios.delete(`${API}/delete/blog/${blogId}/${user.data.userId}`, {
    headers: {
      Authorization: `Bearer ${user.data.token}`
    }
  });
};

export const getAllBlogs = () => {
  return axios
    .get(`${API}/blogs`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
