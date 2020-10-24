import React from "react";
// import axios from "axios";

class RecentOrder extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state={
  //     historyOrder:[]
  //   }
  // }
  // componenDidiMount(){
  //       axios
  //       .get(`http://localhost:1000/order`)
  //       .then((res) => {
  //         console.log(res);
  //         const products = res.data.data;
  //         this.setState({ products });
  //       })
  //       .catch((err) => console.log(err));
  // }
  render(){
    return(
      <div className="row">
                <div className="col info-table" style={{margin:"10px 15px"}}>
                    <h6 style={{fontWeight:"bold"}}>Recent Order</h6>
                    <table style={{textAlign: "center",width:"100%"}}>
                      <tbody>
                        <tr >
                            <th>INVOICES</th>
                            <th>CASHIER</th>
                            <th>DATE</th>
                            <th>ORDERS</th>
                            <th>AMOUNT</th>
                        </tr>
                        <tr>
                            <td>#10928</td>
                            <td>Cashier 1</td>
                            <td>06 October 2019</td>
                            <td>Ice Tea, Salad With peanut sauce</td>
                            <td>Rp. 120.000</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
    )
  }
}

export default RecentOrder