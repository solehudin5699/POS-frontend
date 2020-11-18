import axios from "axios";


export const getProductsAPI = (keywordSearch, price, time, category, page) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/products/search?name=${keywordSearch}&price=${price}&time=${time}&limit=15&page=${page}&category=${category}`
  );
};

export const addProductsAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/products/add`, body, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteProductsAPI = (id,body) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/products/delete/${id}`, {
    headers: {
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
    data:body
  },
  );
};

export const updateProductsAPI = (id, body) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}/products/update/${id}`, body, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};
