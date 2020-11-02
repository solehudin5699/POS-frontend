import axios from "axios";

export const postOrderAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/order`, body, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};

export const getAllOrderAPI = () => {
  return axios.get(`${process.env.REACT_APP_SERVER}/order`, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};
