import React from "react";
import Chart from "./Chart";
import RecentOrder from "./RecentOrder";

class MainHistory extends React.Component {
  render() {
    return (
      <div id='main-history'>
        <div className='row'>
          <div className='col-12 col-sm-4'>
            <div className='card item1'>
              <div className='card-img-overlay'>
                <p className='card-text'>Today’s Income</p>
                <h5 className='card-text'>Rp. 1.000.000</h5>
                <p className='card-text'>+2% Yesterday</p>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-4'>
            <div className='card item2'>
              <div className='card-img-overlay'>
                <p className='card-text'>Orders</p>
                <h5 className='card-text'>3.270</h5>
                <p className='card-text'>+5% Last Week</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-4'>
            <div className='card item3'>
              <div className='card-img-overlay'>
                <p className='card-text'>This Year’s Income</p>
                <h5 className='card-text'>Rp. 100.000.000.000</h5>
                <p className='card-text'>+10% Last Year</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Chart />
          </div>
        </div>
        <RecentOrder />
      </div>
    );
  }
}

export default MainHistory;
