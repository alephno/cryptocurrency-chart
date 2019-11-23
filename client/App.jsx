import React from 'react';
import PriceChart from './PriceChart.jsx';
import axios from 'axios';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [],
      datasets: []
    }
  }

  componentDidMount() {
    const limit = 10;
    axios.get('/price/BTC/', {
      params: {
        limit: limit,
        timeframe: 'day'
      }
    }).then((response) => {
      const data = response.data.Data;
      this.setState({ 
        labels: data.map(point => moment(point.time * 1000).format('MM/DD')),
        datasets: [{
          label: 'BTC',
          fill: false,
          data: data.map(point => point.close),
          borderColor: "#bae755",
          backgroundColor: "#e755ba",
          pointBackgroundColor: "#55bae7",
          pointBorderColor: "#55bae7",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }]
      });
    }).catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <PriceChart labels={this.state.labels} datasets={this.state.datasets} />
      </div>
    )
  }
}