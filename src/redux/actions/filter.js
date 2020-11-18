export const filterCreator = (time, price,category) => {
  return {
    type: "FILTER_PRODUCT",
    payload:{
      time:time,
      price: price,
      category:category
    }
  };
};
