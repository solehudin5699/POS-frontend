import React from "react";
import {useDispatch} from "react-redux";
// import { Redirect, Switch } from "react-router-dom";
import {logoutCreator} from "../../redux/actions/auth"
import {cancelOrderCreator} from "../../redux/actions/products";
import user from "../../assets/image/user.png";

const Add =(props)=> {
  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(logoutCreator());
    dispatch(cancelOrderCreator());
  }

    return (
      
        <div className='modal'>
        <div className='content-wrapper'>
          <div className='modal-content' style={{width:"80%", justifySelf:"center"}}>
            <button
              onClick={props.handleAddModal}
              type='button'
              className='close text-right'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <div className='row'></div>
            <div className='row'></div>
            <div className="row justify-content-center text-center">
              <div className="col-4">
                <img src={user} style={{width:"100%",borderRadius:"10%"}} alt=""/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
              <h5 className="text-center">{localStorage.getItem("name")}</h5>
              </div>
            </div>
            <div className="row" style={Number(localStorage.getItem("level_id"))===2?{display:"none"}:{display:"flex"}}>
              <div className="col-6">
              <button id='print' className='btn button-print' style={{width:"100%"}} onClick={props.handleAddDataModal}>Add Product</button>
              </div>
              <div className="col-6">
              <button id='print' className='btn button-print' style={{width:"100%"}} onClick={props.handleAddUserModal}>Add User</button>
              </div>
            </div>
            <button id='send-email' className='button-send-email' onClick={()=>handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
}

// const mapStateToProps = (state) => {
//   const { products } = state;
//   return { products };
// };
// const mapDispatchToProps = (dispacth) => {
//   return {
//     postOrder: (body) => {
//       dispacth(postOrderAPICreator(body));
//     },
//     cancelToastPostOrder: () => {
//       dispacth(toastPostOrderCreator());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Add);
export default Add;
