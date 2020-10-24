import React ,{useState, useEffect} from "react";
import {useDispatch } from "react-redux";
import {
  validateTokenAPICreator
} from "../redux/actions/auth";
import { MyProvider } from "../components/MyProvider";
import HeaderHistory from "../components/HeaderHistory";
import Navbar from "../components/Navbar";
import MainHistory from "../components/MainHistory";
import AddData from '../components/modals/AddData'

// class History extends React.Component {
//   state = {
//     isShow: true,
//     isShowAddModal: false,
//   };

//   handleHideShow = () => {
//     this.setState({ isShow: !this.state.isShow });
//   };
  
//   handleShowAddModal = () => {
//     this.setState({ isShowAddModal: !this.state.isShowAddModal });
//   };
//   render() {
//     return (
//       <>
//         <MyProvider>
//           <div className='app'>
//             <HeaderHistory hideShowFunction={this.handleHideShow} />
//             <div className='wrapper-history'>
//               {this.state.isShow ? (
//                 <Navbar handleShowAddModal={this.handleShowAddModal} />
//               ) : null}
//               <MainHistory />
//             </div>
//             {this.state.isShowAddModal ? (
//               <AddData
//               handleShowAddModal={this.handleShowAddModal}
//               />
//             ) : null}
//           </div>
//         </MyProvider>
//         {/* </div> */}
//       </>
//     );
//   }
// }
const History =(props)=> {
  const [isShow, handleShow] = useState(true);
  const [isShowAddModal, handleAddModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(validateTokenAPICreator());
    }
  , [dispatch]);
  const handleHideShow = () => {
    handleShow(!isShow);
  };
  
  const handleShowAddModal = () => {
    handleAddModal(!isShowAddModal);
  };
  // render() {
    return (
      <>
        <MyProvider>
          <div className='app'>
            <HeaderHistory hideShowFunction={()=>handleHideShow()} />
            <div className='wrapper-history'>
              {isShow ? (
                <Navbar handleShowAddModal={()=>handleShowAddModal()} />
              ) : null}
              <MainHistory />
            </div>
            {isShowAddModal ? (
              <AddData
              handleShowAddModal={()=>handleShowAddModal()}
              />
            ) : null}
          </div>
        </MyProvider>
        {/* </div> */}
      </>
    );
  // }
}

export default History;
