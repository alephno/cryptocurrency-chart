import React from 'react';
import PropTypes from 'prop-types';
import Chartjs from 'chart.js'

export default class PriceChart extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChart() {
    const canvas = this.refs.chart;
    const ctx = canvas.getContext('2d');
    const chart = new Chartjs.Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets
      }
    });
  }

  componentDidUpdate() {
    console.log(this.props.datasets)
    this.renderChart();
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return (
      <div>
        <canvas ref="chart" width="800" height="400" />
      </div>
    )
  }
}

Chart.propTypes = {
  datasets: PropTypes.array,
  labels: PropTypes.array
}