import { API } from "../../backend";
import axios from "axios";
import { getToken, getToken1 } from "../../auth/helper/authapicalls";

export const createBlog = async (blog) => {
  const user = await getToken();
  console.log(user.data.token);
  console.log(blog);
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
