import React, {useState, useEffect} from "react";
import { useDispatch} from "react-redux";
import { validateTokenAPICreator } from "../redux/actions/auth";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Aside from "../components/Aside";
import FilterModal from "../components/modals/FilterModal"
import "../App.css";
import BottomNav from "../components/BottomNav";

export default function Home () {
  const [state, setState] = useState({isShow: true,
    modalShow:false})
  const [page, setPage] = useState(1)

  const handleHideShow = () => {
    setState({...state, isShow: !state.isShow });
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(validateTokenAPICreator())
  }, [dispatch])
 
    return (
      <>
      <FilterModal onHide={() => setState({...state, modalShow:false})} show={state.modalShow} />
        <div className='app'>
          <Header hideShowFunction={handleHideShow} onHide={() => setState({...state, modalShow:true})} 
          setPage={setPage}
          />
          <div className='wrapper'>
            <div className='nav-main'>
              {state.isShow ? (
                <Navbar/>
              ) : null}
              <Main setPage={setPage} page={page} />
            </div>
            <Aside />
          </div>
        </div>
        <BottomNav/>
      </>
    );
  }