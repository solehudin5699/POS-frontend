import axios from "axios";

export const postOrderAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/order`, body, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};

export const getAllOrderAPI = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/order`, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};
