const initialCart = {
  time:"ASC",
  price:"ASC",
  category:"0"
};

const filterReducer = (prevState = initialCart, action) => {
  switch (action.type) {
  
    case "FILTER_PRODUCT":
        return {
          ...prevState,
          time:action.payload.time,
          price:action.payload.price,
          category:action.payload.category
        };
    default:
      return prevState;
  }
};

export default filterReducer;
