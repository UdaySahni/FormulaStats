import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Constants} from 'expo';
import Flag from 'react-native-flags';
import { ButtonGroup } from 'react-native-elements';

import { fetchCurrentRace } from '../actions/current_race_actions';
import { LineGraph } from '../components/LineGraphs';
import Colors from '../constants/Colors';

var _ = require('lodash');

class NextRaceScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      doneFetching: false,
      selectedDriverIndex: 0,
      selectedDataIndex: 0
    };
    this.updateDriverIndex = this.updateDriverIndex.bind(this);
    this.updateDataIndex = this.updateDataIndex.bind(this);
    this.props.fetchCurrentRace(this.props.auth.jwt);
  }

  updateDriverIndex (selectedDriverIndex) {
    this.setState({selectedDriverIndex});
  }

  updateDataIndex (selectedDataIndex) {
    this.setState({selectedDataIndex});
  }

  componentDidUpdate() {
    if(this.props.currentRace && !this.state.doneFetching) {
      this.setState({doneFetching: true});
    }
  }

  seperateData(driverData, key) {
    const years = _.map(driverData, 'year');
    const data = _.map(driverData, key);

    if(key == 'fastestLapTime') {
      var lapData = _.values(_.mapValues(data, (time) => {
        if(!time) {
          return null;
        }
        var minuteSeconds = time.split(':');
        var secondMiliseconds = minuteSeconds[1].split('.');
        return parseInt(minuteSeconds[0]) + (0.01 * parseInt(secondMiliseconds[0])) + (0.00001 * parseInt(secondMiliseconds[1]));
      }));
      return ({years, data: lapData});
    }
    
    return ({years, data});
  }

  render() {
    var data, years;
    const dataOptions = ['Finish', 'Grid', 'Fastest Lap'];
    const dataKey = ['positionOrder', 'grid', 'fastestLapTime'];
    const selectedDriverIndex = this.state.selectedDriverIndex;
    const selectedDataIndex = this.state.selectedDataIndex;

    if(this.props.currentRace) {
      var seperateData;
      if(selectedDriverIndex == 0) {
        seperateData = this.seperateData(this.props.currentRace.firstDriverResults, dataKey[selectedDataIndex]);
      }
      else {
        seperateData = this.seperateData(this.props.currentRace.secondDriverResults, dataKey[selectedDataIndex]);
      }
      data = seperateData.data;
      data.color = `rgba(255, 255, 255, 0.2)`
      years = seperateData.years;
    }

    if(this.state.doneFetching) {
      const driverOptions = [this.props.currentRace.userData.firstFavouriteDriver, this.props.currentRace.userData.secondFavouriteDriver];
      return (
        <View style={styles.container}>
          <View style={styles.listOfTexts}>
            <Text style={styles.text}> Next Race  </Text>
            <Text style={styles.headerText}> {this.props.currentRace.currentRace.raceName} </Text>
            <Text style={styles.text}> {this.props.currentRace.currentRace.Circuit.circuitName} </Text>
            <Text style={styles.text}> {this.props.currentRace.currentRace.date} </Text>
          </View>
          <View style={styles.graph}>
            <Text style={styles.graphText}> Driver History </Text>
            <LineGraph years={years} data={[{data}]}/>
            <ButtonGroup
              onPress={this.updateDriverIndex}
              selectedIndex={selectedDriverIndex}
              buttons={driverOptions}
              containerStyle={styles.buttonContainer}
              selectedButtonStyle={styles.selectedButton}
              textStyle={styles.buttonText}
            />
            <ButtonGroup
              onPress={this.updateDataIndex}
              selectedIndex={selectedDataIndex}
              buttons={dataOptions}
              containerStyle={styles.buttonContainer}
              selectedButtonStyle={styles.selectedButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344955',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 35,
    color: Colors.textColor,
    fontFamily: 'WorkSans-Medium'
  },
  text: {
    fontSize: 18,
    color: Colors.textColor,
    fontFamily: 'WorkSans-Light'
  },
  graphText: {
    fontSize: 18,
    color: Colors.textColor,
    fontFamily: 'WorkSans-Medium'
  },
  listOfTexts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  graph: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    height: 40,
    backgroundColor: Colors.buttonBackgroundColor,
    borderColor: Colors.buttonBorderColor
  },
  buttonText: {
    color : Colors.textColor,
  },
  selectedButton: {
    backgroundColor: Colors.accentColor
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    currentRace: state.currentRace
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCurrentRace: fetchCurrentRace
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NextRaceScreen);
