import React from "react";
import axios from "axios";
import update from "react-addons-update";
require("dotenv").config();

async function postOrder(productOrder, quality, total) {
  let body = {
    product_order: `${productOrder}`,
    quality_order: `${quality}`,
    total_price: total,
  };
  // const postOrder = `${process.env.REACT_APP_API}/order/add`
  let res = await axios.post("http://localhost:1000/order/add", body);
  console.log(res.data);
}

// async function postProducts(id, name, price, stock, image, category_id) {
//   let body = {
//     id, name, price, stock, image, category_id
//   };
//   // const postOrder = `${process.env.REACT_APP_API}/order/add`
//   let res = await axios.post("http://localhost:1000/products/post", body);
//   window.alert("Add product is success.");
//   window.location.reload(false);
//   console.log(res.data);
// }

const Mcontext = React.createContext();
class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productChecked: [],

      idProductOrdered: [],
      totalPriceOrder: 0,
      keywordSearch:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeNumberOrder = this.changeNumberOrder.bind(this);
    this.handleInputSearchBar = this.handleInputSearchBar.bind(this);
  }
  handleChange = (event) => {
    const target = event.target;
    const checked = target.checked;
    const value = Number(target.value);
    let productChecked = this.state.products.find((item) => {
      return item.product_id === value;
    });
    if (checked) {
      if(!this.state.productChecked.find(item=>{return item.product_id===value}))
      {
        this.state.productChecked.push({...productChecked,numOrder:1});
      }
      this.state.idProductOrdered.push(
        this.state.productChecked.find((item) => {
          return item.product_id === value;
        }).product_id
      );
      this.setState({
        totalPriceOrder:
          this.state.totalPriceOrder + Number(productChecked.product_price),
      });
    } else {
      if(this.state.productChecked.length===0){
        this.setState({totalPriceOrder:0})
      }else{
        this.setState({
          totalPriceOrder:
            this.state.totalPriceOrder - Number(this.state.productChecked[this.state.idProductOrdered.indexOf(value)].product_price),
        });
      }
      this.state.productChecked.splice(
        this.state.idProductOrdered.indexOf(value),1
      );
      this.state.idProductOrdered.splice(
        this.state.idProductOrdered.indexOf(value),
        1
      );
    }
  };
  // handleInput=event=>{
  //   let target = event.target;
  //   let value = Number(target.value);
  //   let id = target.id;
  //   let focus=target.focus;
  //   if(focus){
  //     this.setState(
  //       update(this.state, {
  //         productChecked: {
  //           [this.state.idProductOrdered.indexOf(id)]: {
  //             $set: 
  //             {...this.state.productChecked[this.state.idProductOrdered.indexOf(id)], 
  //               numOrder:Number(value), 
  //               product_price:Number(this.state.products.find(item=>{return item.product_id===this.state.productChecked[this.state.idProductOrdered.indexOf(id)].product_id}).product_price)*Number(this.state.productChecked[this.state.idProductOrdered.indexOf(id)].numOrder)
  //             }
  //           },
  //         },
          
  //       })
  //     );
  //   }
  // }
  changeNumberOrder = (event) => {
    let target = event.target;
    let value = target.value;
    let id = target.id;
    if (id === "plus") {
      this.setState(
        update(this.state, {
          productChecked: {
            [value]: {
              $set: 
              {...this.state.productChecked[value], 
                numOrder:Number(this.state.productChecked[value].numOrder)+1, 
                product_price:Number(this.state.products.find(item=>{return item.product_id===this.state.productChecked[value].product_id}).product_price)*Number(this.state.productChecked[value].numOrder+1)
              }
            },
          },
          
        })
      );
      
      this.setState({
        totalPriceOrder:
          Number(this.state.totalPriceOrder) +
          Number(this.state.products.find(item=>{return item.product_id===this.state.productChecked[value].product_id}).product_price),
      });
    } else if (
      id === "min" &&
      Number(this.state.productChecked[value].numOrder) >= 2
    ) {
      this.setState(
        update(this.state, {
          productChecked: {
            [value]: {
              $set: 
              {...this.state.productChecked[value], 
                numOrder:Number(this.state.productChecked[value].numOrder)-1, 
                product_price:Number(this.state.products.find(item=>{return item.product_id===this.state.productChecked[value].product_id}).product_price)*Number(this.state.productChecked[value].numOrder-1)
              }
            },
          },
        })
      );
      this.setState({
        totalPriceOrder:
          Number(this.state.totalPriceOrder)-Number(this.state.products.find(item=>{return item.product_id===this.state.productChecked[value].product_id}).product_price),
      });
    }
  };

  handleCancelOrder = () => {
    this.setState({
      productChecked: [],
      idProductOrdered: [],
      totalPriceOrder: 0 });
  };
  componentDidMount=()=>{
      axios
      .get(`http://localhost:1000/products/search?name=${this.state.keywordSearch}&sortBy=product_id&orderBy=ASC&limit=7&page=1`)
      .then((res) => {
        console.log(res);
        const products = res.data.data;
        this.setState({ products });
      })
      .catch((err) => console.log(err));
  }
  handleInputSearchBar=(event)=>{
    const target = event.target;
    const value = target.value;
    this.setState({ keywordSearch: value });
    if(event.key==="Enter"){
      this.componentDidMount()
    }else{
      this.componentDidMount()
    }
  }

  handlePostOrder = () => {
    let nameProduct=this.state.productChecked.map(item=>{return item.product_name});
    let numberOrder=this.state.productChecked.map(item=>{return item.numOrder});
    let total=Number(this.state.totalPriceOrder)+0.1*Number(this.state.totalPriceOrder);

    try {
      postOrder(
        nameProduct,
        numberOrder,
        total
      );
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    // console.log(this.state.productChecked)
    return (
      <Mcontext.Provider
        value={{
          state: this.state,
          handleChange: this.handleChange,
          handleCancelOrder: this.handleCancelOrder,
          changeNumberOrder: this.changeNumberOrder,
          handlePostOrder: this.handlePostOrder,
          handleSearch:this.componentDidMount,
          handleInputSearchBar:this.handleInputSearchBar
        }}>
        {this.props.children}
      </Mcontext.Provider>
    );
  }
}

export { MyProvider, Mcontext };
