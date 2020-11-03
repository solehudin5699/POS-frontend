import axios from "axios";

export const loginAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body);
};
export const registrationAPI = (body, header) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/registration`,
    body,
    header
  );
};
export const validateTokenAPI = () => {
  return axios.post(`${process.env.REACT_APP_API_URL}/auth/validate`, null, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};
