import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Constants} from 'expo';
import { LineGraph } from '../components/LineGraphs';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { fetchDriverComparision, fetchConstructorComparision } from '../actions/compare_actions';
import Colors from '../constants/Colors';

var _ = require('lodash');

const dataTypes = ['Drivers', 'Constructors'];
const dataOptions = ['Finish', 'Grid', 'Fastest Lap'];

class CompareScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstInput: '',
      secondInput: '',
      grandPrix: '',
      selectedDataTypeIndex: 0,
      selectedDataOptionIndex: 0,
      firstDataset: [],
      secondDataset: [],
      validationSet: [],
      inputError: ' '
    };
    this.updateDataOptionIndex = this.updateDataOptionIndex.bind(this);
    this.updateDataTypeIndex = this.updateDataTypeIndex.bind(this);
  }

  updateDataTypeIndex (selectedDataTypeIndex) {
    //use validation set to avoid if else
    this.setState({selectedDataTypeIndex, firstInput:'', secondInput:''});
  }

  updateDataOptionIndex (selectedDataOptionIndex) {
    this.setState({selectedDataOptionIndex});
  }

  search() {
    if(!this.props.activeRaces.includes(this.state.grandPrix)) {
      this.setState({inputError: "Please enter an active grand prix."});
      return;
    }
    if(this.state.selectedDataTypeIndex == 0) {
      if(!(this.state.firstInput in this.props.activeDrivers)) {
        this.setState({inputError: "Please enter an active first driver."});
        return;
      }

      if(!(this.state.secondInput in this.props.activeDrivers)) {
        this.setState({inputError: "Please enter an active second driver."});
        return;
      }

      var firstDriverRef = this.props.activeDrivers[this.state.firstInput].driverId;
      var secondDriverRef = this.props.activeDrivers[this.state.secondInput].driverId;

      this.setState({inputError: " "});

      this.props.fetchDriverComparision(firstDriverRef, secondDriverRef, this.state.grandPrix,
        dataOptions[this.state.selectedDataOptionIndex], this.props.auth.jwt);
    }
    else {
      if(!(this.state.firstInput in this.props.activeConstructors)) {
        this.setState({inputError: "Please enter an active first constructor."});
        return;
      }

      if(!(this.state.secondInput in this.props.activeConstructors)) {
        this.setState({inputError: "Please enter an active second constructor."});
        return;
      }

      var firstConstructorRef = this.props.activeConstructors[this.state.firstInput].constructorId;
      var secondConstructorRef = this.props.activeConstructors[this.state.secondInput].constructorId;

      this.setState({inputError: " "});

      this.props.fetchConstructorComparision(firstConstructorRef, secondConstructorRef, this.state.grandPrix,
        dataOptions[this.state.selectedDataOptionIndex], this.props.auth.jwt);
    }
  }

  seperateData(rawData, dataOption, key) {
    const years = _.map(rawData, 'year');
    const data = _.map(rawData, key);
    if(dataOption == 'fastestLapTime') {
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

  buildDatasets() {
    var firstKey, secondKey;
    if(this.props.comparision.data.dataInfo.dataType === 'Driver') {
      firstKey = 'firstDriver';
      secondKey = 'secondDriver';
    }
    else {
      firstKey = 'firstConstructor';
      secondKey = 'secondConstructor';
    }
    var dataSet1 = this.seperateData(this.props.comparision.data.result, this.props.comparision.data.dataInfo.dataOption, firstKey);
    var dataSet2 = this.seperateData(this.props.comparision.data.result, this.props.comparision.data.dataInfo.dataOption, secondKey);
    return {
      years: dataSet1.years,
      data1: dataSet1.data,
      data2: dataSet2.data
    };
  }


  render() {
    var dataset1, dataset1Label, dataset2, dataset2Label, years;
    const selectedDataTypeIndex = this.state.selectedDataTypeIndex;
    const selectedDataOptionIndex = this.state.selectedDataOptionIndex;
    var placeHolder1 = "First Driver";
    var placeHolder2 = "Second Driver";

    if(this.props.comparision.data) {
      var datasets = this.buildDatasets();
      dataset1 = datasets.data1;
      dataset1Label = this.props.comparision.data.dataInfo.firstKey;
      dataset2 = datasets.data2;
      dataset2Label = this.props.comparision.data.dataInfo.secondKey;
      years = datasets.years;
    }

    if(selectedDataTypeIndex == 1) {
      placeHolder1 = "First Constructor";
      placeHolder2 = "Second Constructor";
    }
    return (
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <ButtonGroup
            onPress={this.updateDataTypeIndex}
            selectedIndex={selectedDataTypeIndex}
            buttons={dataTypes}
            containerStyle={styles.buttonContainer}
            selectedButtonStyle={styles.selectedButton}
            textStyle={styles.buttonText}
          />
          <Input
            placeholder= {placeHolder1}
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({firstInput: value})}
            value={this.state.firstInput}
            leftIcon={
              <Icon
                name={this.state.selectedDataTypeIndex == 0 ? 'drivers-license' : 'wrench' }
                size={24}
                color='#ccc'
              />
            }
          />
          <Input
            placeholder= {placeHolder2}
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({secondInput: value})}
            value={this.state.secondInput}
            leftIcon={
              <Icon
                name={this.state.selectedDataTypeIndex == 0 ? 'drivers-license' : 'wrench' }
                size={24}
                color='#ccc'
              />
            }
          />
          <Input
            placeholder='Grand Prix'
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.inputError}
            onChangeText = {(value) => this.setState({grandPrix: value})}
            value={this.state.grandPrix}
            leftIcon={
              <Icon
                name='location-arrow'
                size={24}
                color='#ccc'
              />
            }
          />
          <ButtonGroup
            onPress={this.updateDataOptionIndex}
            selectedIndex={selectedDataOptionIndex}
            buttons={dataOptions}
            containerStyle={styles.buttonContainer}
            selectedButtonStyle={styles.selectedButton}
            textStyle={styles.buttonText}
          />
        </View>
        <Button buttonStyle={styles.button}
          title='Search'
          onPress={() => this.search()}
        />
        <View style={styles.graph}>
        {this.props.comparision.data &&
          <LineGraph years={years} data={[{data: dataset1}, {data: dataset2}]} labels={[dataset1Label, dataset2Label]}/>
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: Constants.statusBarHeight,
  },
  inputGroup: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  button: {
    height: 40,
    backgroundColor: Colors.buttonBackgroundColor,
    borderColor: Colors.buttonBorderColor
  },
  graph: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 35,
    color: Colors.textColor,
    fontFamily: 'WorkSans-Light'
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
  },
  inputStyle: {
    color : Colors.textColor,
    fontFamily: 'WorkSans-Light'
  },
  errorStyle: {
    color : Colors.accentColor
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    comparision: state.comparision,
    activeDrivers: state.activeDrivers,
    activeConstructors: state.activeConstructors,
    activeRaces: state.activeRaces
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDriverComparision: fetchDriverComparision,
    fetchConstructorComparision: fetchConstructorComparision
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareScreen);
