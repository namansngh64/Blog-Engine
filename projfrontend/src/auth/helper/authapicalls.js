import { API } from "../../backend";
import axios from "axios";

export const signin = (user) => {
  return axios
    .post(
      `${API}/signin`,
      {
        email: user.email,
        password: user.password,
        isCookie: user.checked
      },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
export const getToken = () => {
  return axios.get(`${API}/reftoken`, {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true
  });

  // console.log(a.data.token);
  // return a.data.token;

  // return axios
  //   .get(`${API}/reftoken`, {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     withCredentials: true
  //   })
  //   .then((res) => {
  //     return res.data.token;
  //   })
  //   .catch((err) => console.log(err));
  // return fetch(`${API}/reftoken`, {
  //   method: "GET"
  // });
};

export const signup = (user) => {
  return axios
    .post(
      `${API}/signup`,
      {
        email: user.email,
        password: user.password,
        name: user.name
      },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const verifyOtp = (user) => {
  const { otpValue, userId } = user;
  return axios
    .post(
      `${API}/verify/${userId}`,
      {
        otp: otpValue
      },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
export const signout = (next) => {
  return axios
    .get(`${API}/signout`)
    .then((res) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
};
// export const authenticate = (data, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//     next();
//   }
// };
// export const test = (token) => {
//   console.log(token);
// };

// export const accToken = async () => {
//   const a = await getToken().then((data) => {
//     return data;
//   });

//   return a;
// }
