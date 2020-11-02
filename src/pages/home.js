import React from "react";
import { connect } from "react-redux";
import { validateTokenAPICreator } from "../redux/actions/auth";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Aside from "../components/Aside";
import CheckOut from "../components/modals/CheckOut";
import AddData from "../components/modals/AddData";
import Add from "../components/modals/Add";
import AddUser from "../components/modals/AddUser";
import "../App.css";

class Home extends React.Component {
  state = {
    isShow: true,
    isCheckOut: false,
    isShowAddModal: false,
    isAdd: false,
    isAddUser: false,
  };

  handleHideShow = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  handleAddUserModal = () => {
    this.setState({ isAdd: false });
    this.setState({ isAddUser: !this.state.isAddUser });
  };
  handleAddDataModal = () => {
    this.setState({ isAdd: false });
    this.setState({ isShowAddModal: !this.state.isShowAddModal });
  };
  handleCheckOut = () => {
    this.setState({ isCheckOut: !this.state.isCheckOut });
  };
  handleAddModal = () => {
    this.setState({ isAdd: !this.state.isAdd });
  };
  componentDidMount = () => {
    this.props.validateToken();
  };
  render() {
    return (
      <>
        <div className='app'>
          <Header hideShowFunction={this.handleHideShow} />
          <div className='wrapper'>
            <div className='nav-main'>
              {this.state.isShow ? (
                <Navbar handleAddModal={this.handleAddModal} />
              ) : null}
              <Main />
            </div>
            <Aside handleCheckOut={this.handleCheckOut} />
          </div>
          {this.state.isCheckOut ? (
            <CheckOut handleCheckOut={this.handleCheckOut} />
          ) : null}

          {this.state.isShowAddModal ? (
            <AddData handleAddDataModal={this.handleAddDataModal} />
          ) : null}
          {this.state.isAddUser ? (
            <AddUser handleAddUserModal={this.handleAddUserModal} />
          ) : null}
          {this.state.isAdd ? (
            <Add
              handleAddUserModal={this.handleAddUserModal}
              handleAddDataModal={this.handleAddDataModal}
              handleAddModal={this.handleAddModal}
            />
          ) : null}
        </div>
      </>
    );
  }
}
// export default Home;

const mapDispatchToProps = (dispacth) => {
  return {
    validateToken: () => {
      dispacth(validateTokenAPICreator());
    },
  };
};
export default connect(null, mapDispatchToProps)(Home);
