import React from 'react';
import { Dimensions, Text } from 'react-native';
import LineChart from './LineChart/LineChartSrc';

const colors = [`rgba(255, 255, 255, 0.5)`, 'rgba(249, 170, 51, 0.5)']

export class LineGraph extends React.Component {

  render() {
    return (
      <LineChart
        data={{
          labels: this.props.years,
          datasets: this.props.data
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#4A6572',
          backgroundGradientFrom: '#232F34',
          backgroundGradientTo: '#232F34',
          lineColors: colors,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        labels={this.props.labels}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }
}
