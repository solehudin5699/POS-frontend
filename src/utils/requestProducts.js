import axios from "axios";

export const getProductsAPI = (keywordSearch) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER}/products/search?name=${keywordSearch}&sortBy=product_id&orderBy=ASC&limit=100&page=1`
  );
};

export const addProductsAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/products/add`, body, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};
