import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Picker,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Constants} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Overlay } from 'react-native-elements';

import { registerUser } from '../actions/auth_actions';
import Colors from '../constants/Colors';

var _ = require('lodash');

class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      favouriteDriver: '',
      secondFavouriteDriver: '',
      favouriteConstructor: '',
      registrationError: ' '
    };
  }

  register() {
    this.setState({registrationError: " "});
    if(this.state.username === "") {
      this.setState({registrationError: "Please enter an username"});
      return;
    }
    if(this.state.password != this.state.confirmPassword) {
      this.setState({registrationError: "The passwords you entered are not equal."});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({registrationError: "Please enter a password of 6 characters or more."});
      return;
    }
    if(!(this.state.favouriteDriver in this.props.activeDrivers)) {
      this.setState({registrationError: "Please enter an active favourite driver."});
      return;
    }
    if(!(this.state.secondFavouriteDriver in this.props.activeDrivers)) {
      this.setState({registrationError: "Please enter an active second favourite driver."});
      return;
    }
    if(!(this.state.favouriteConstructor in this.props.activeConstructors)) {
      this.setState({registrationError: "Please enter an active favourite constructor."});
      return;
    }

    var favouriteDriverId = this.props.activeDrivers[this.state.favouriteDriver].driverId;
    var secondFavouriteDriverId = this.props.activeDrivers[this.state.secondFavouriteDriver].driverId;
    var favouriteConstructorId = this.props.activeConstructors[this.state.favouriteConstructor].constructorId;

    var requestBody = {
      username: this.state.username,
      password: this.state.password,
      firstFavouriteDriver: favouriteDriverId,
      secondFavouriteDriver: secondFavouriteDriverId,
      favouriteConstructor: favouriteConstructorId
    };

    this.props.registerUser(requestBody);
    return;
  }

  componentDidUpdate() {
    if(this.props.auth.registrationError && this.state.registrationError != this.props.auth.registrationError) {
      this.setState({registrationError: this.props.auth.registrationError});
    }
    if(this.props.auth.jwt) {
      this.props.navigation.navigate('Main');
    }
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.register}>
          <Text style={styles.text}> Register </Text>
          <Input
            placeholder='Username'
            inputStyle={styles.inputStyle}
            onChangeText ={(value) => this.setState({username: value})}
            value={this.state.username}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='white'
              />
            }
          />
          <Input
            placeholder='Password'
            secureTextEntry={true}
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({password: value})}
            value={this.state.password}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='white'
              />
            }
          />
          <Input
            placeholder='Confirm Password'
            secureTextEntry={true}
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({confirmPassword: value})}
            value={this.state.confirmPassword}
            leftIcon={
              <Icon
                name='check'
                size={24}
                color='white'
              />
            }
          />
          <Input
            placeholder='Favourite Driver'
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({favouriteDriver: value})}
            value={this.state.favouriteDriver}
            leftIcon={
              <Icon
                name='drivers-license'
                size={24}
                color='white'
              />
            }
          />
          <Input
            placeholder='Second Favourite Driver'
            inputStyle={styles.inputStyle}
            onChangeText = {(value) => this.setState({secondFavouriteDriver: value})}
            value={this.state.secondFavouriteDriver}
            leftIcon={
              <Icon
                name='drivers-license'
                size={24}
                color='white'
              />
            }
          />
          <Input
            placeholder='Favourite Constructor'
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.registrationError}
            onChangeText = {(value) => this.setState({favouriteConstructor: value})}
            value={this.state.favouriteConstructor}
            leftIcon={
              <Icon
                name='wrench'
                size={24}
                color='white'
              />
            }
          />
          <Button
            title='Submit'
            icon={
              <Icon
                name='arrow-right'
                size={15}
                color='white'
              />
            }
            iconRight
            clear
            onPress={() => this.register()}
            tileStyle={styles.text}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
  },
  inputStyle: {
    color : Colors.textColor,
  },
  errorStyle: {
    color : Colors.accentColor
  },
  text: {
    fontSize: 20,
    color: Colors.textColor,
  },
  register: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'white'
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    activeDrivers: state.activeDrivers,
    activeConstructors: state.activeConstructors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    registerUser: registerUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
