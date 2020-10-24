import React from "react";
import Chart from "./Chart";
import RecentOrder from './RecentOrder'
import { managerData, nationalAverageData, yearLabels } from "./mockData";
//IMPORT IMAGE
// import fork from "../assets/image/fork.png";
// import clipboard from "../assets/image/clipboard.png";
// import add from "../assets/image/add.png";
// import {Link} from 'react-router-dom'

class MainHistory extends React.Component {
  constructor(props){
    super(props)
    this.state={
      datafirst: managerData,
      datasecond: nationalAverageData,
      labels: yearLabels,
    }
    // this.width = this.width.bind(this);
    // this.componentDidCatch = this.componentDidCatch.bind(this);
  }

  render() {
    console.log(this.state.width, this.state.x)
    const { datafirst, datasecond, labels } = this.state;
    return (
      <div id='main-history'>
        <div className='row'>
          <div className='col-12 col-sm-4'>
            <div className='card item1'>
              <div
                className='card-img-overlay'>
                <p className='card-text'>Today’s Income</p>
                <h5 className='card-text' >
                  Rp. 1.000.000
                </h5>
                <p className='card-text'>+2% Yesterday</p>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-4'>
            <div className='card item2'>
              <div
                className='card-img-overlay'>
                <p className='card-text'>Orders</p>
                <h5 className='card-text' >
                  3.270
                </h5>
                <p className='card-text'>+5% Last Week</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-4'>
            <div className='card item3'>
              <div
                className='card-img-overlay'>
                <p className='card-text'>This Year’s Income</p>
                <h5 className='card-text' >
                  Rp. 100.000.000.000
                </h5>
                <p className='card-text'>+10% Last Year</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Chart
              datafirst={datafirst}
              datasecond={datasecond}
              labels={labels}
            />
          </div>
        </div>
        <RecentOrder/>
      </div>
    );
  }
}

export default MainHistory;
