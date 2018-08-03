import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Constants} from 'expo';
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { logout } from '../actions/auth_actions';
import { fetchCurrentRace } from '../actions/current_race_actions';
import { fetchUserData , updateUserData} from '../actions/user_data_actions';
import Colors from '../constants/Colors';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstFavouriteDriver: "",
      secondFavouriteDriver: "",
      favouriteConstructor: "",
      inputError: " ",
      updating: false
    };
  }

  componentDidMount() {
    this.props.fetchUserData(this.props.auth.jwt);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.userData != this.props.userData && this.state.updating) {
      this.props.fetchCurrentRace(this.props.auth.jwt);
    }
  }

  update() {
    body = {};
    var updated = false;
    if(this.state.firstFavouriteDriver != "") {
      if(!(this.state.firstFavouriteDriver in this.props.activeDrivers)) {
        this.setState({inputError: "Please enter an active favourite driver."});
        return;
      }
      body.firstFavouriteDriver = this.props.activeDrivers[this.state.firstFavouriteDriver].driverId;
      updated = true;
    }

    if(this.state.secondFavouriteDriver != "") {
      if(!(this.state.secondFavouriteDriver in this.props.activeDrivers)) {
        this.setState({inputError: "Please enter an active second favourite driver."});
        return;
      }
      body.secondFavouriteDriver = this.props.activeDrivers[this.state.secondFavouriteDriver].driverId;
      updated = true;
    }

    if(this.state.favouriteConstructor != "") {
      if(!(this.state.favouriteConstructor in this.props.activeConstructors)) {
        this.setState({inputError: "Please enter an active favourite constructor."});
        return;
      }
      body.favouriteConstructor = this.props.activeConstructors[this.state.favouriteConstructor].constructorId;
      updated = true;
    }

    if(updated) {
      this.setState({
            firstFavouriteDriver: "",
            secondFavouriteDriver: "",
            favouriteConstructor: "",
            updating: true
      });
      this.props.updateUserData(body, this.props.auth.jwt);
    }
  }

  logout() {
    this.props.navigation.navigate('Auth');
    this.props.logout();
  }

  render() {
    if(this.props.userData.userData) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}> Update Profile </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.text}> Favourite Driver </Text>
            <Input
              placeholder= {this.props.userData.userData.firstFavouriteDriver.surname}
              inputStyle={styles.inputStyle}
              onChangeText = {(value) => this.setState({firstFavouriteDriver: value})}
              value={this.state.firstFavouriteDriver}
              leftIcon={
                <Icon
                  name='drivers-license'
                  size={24}
                  color='#ccc'
                />
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.text}> Second Favourite Driver </Text>
            <Input
              placeholder= {this.props.userData.userData.secondFavouriteDriver.surname}
              inputStyle={styles.inputStyle}
              onChangeText = {(value) => this.setState({secondFavouriteDriver: value})}
              value={this.state.secondFavouriteDriver}
              leftIcon={
                <Icon
                  name='drivers-license'
                  size={24}
                  color='#ccc'
                />
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.text}> Favourite Constructor </Text>
            <Input
              placeholder= {this.props.userData.userData.favouriteConstructor.name}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorStyle}
              errorMessage={this.state.inputError}
              onChangeText = {(value) => this.setState({favouriteConstructor: value})}
              value={this.state.favouriteConstructor}
              leftIcon={
                <Icon
                  name='drivers-license'
                  size={24}
                  color='#ccc'
                />
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button buttonStyle={styles.button}
              title='Update'
              onPress={() => this.update()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button buttonStyle={styles.logoutButton}
              title='Log Out'
              onPress={() => this.logout()}
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
    else {
      return (
        <View style={styles.container}>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center'
  },
  headerContainer: {
    alignItems: 'center'
  },
  fieldContainer: {
    alignItems: 'center',
    padding: 10
  },
  buttonContainer: {
    padding: 10
  },
  button: {
    height: 40,
    backgroundColor: Colors.buttonBackgroundColor,
    borderColor: Colors.buttonBorderColor
  },
  logoutButton: {
    height: 40,
    backgroundColor: '#B30000',
    borderColor: '#B30000'
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
    userData: state.userData,
    activeDrivers: state.activeDrivers,
    activeConstructors: state.activeConstructors,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserData: fetchUserData,
    updateUserData: updateUserData,
    fetchCurrentRace: fetchCurrentRace,
    logout: logout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
