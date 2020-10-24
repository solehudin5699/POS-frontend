import axios from "axios";

export const postOrderAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/order/add`, body, {
    headers: { "x-access-token": `bearer ${localStorage.getItem("token")}` },
  });
};
