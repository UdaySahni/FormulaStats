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

import { loginUser } from '../actions/auth_actions';
import Colors from '../constants/Colors';

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: ' '
    };
  }

  login() {
    this.setState({loginError: " "});
    if(this.state.username === "") {
      this.setState({loginError: "Please enter an username"});
      return;
    }
    if(this.state.password == "") {
      this.setState({loginError: "Please enter a password"});
      return;
    }
    var requestBody = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(requestBody);
    return;
  }

  componentDidUpdate() {
    if(this.props.auth.loginError && this.state.loginError != this.props.auth.loginError) {
      this.setState({loginError: this.props.auth.loginError});
    }
    if(this.props.auth.jwt) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.login}>
          <Text style={styles.text}> Login </Text>
          <Input
            placeholder='Email'
            inputStyle={styles.inputStyle}
            onChangeText={(value) => this.setState({username: value})}
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
            errorStyle={styles.errorStyle}
            errorMessage={this.state.loginError}
            secureTextEntry={true}
            inputStyle={styles.inputStyle}
            onChangeText={(value) => this.setState({password: value})}
            value={this.state.password}
            leftIcon={
              <Icon
                name='lock'
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
            onPress={() => this.login()}
            tileStyle={styles.text}
          />
        </View>
        <View style={styles.registerButton}>
          <Button
            title='Register'
            clear
            onPress={() => this.props.navigation.navigate('Register')}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344955',
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
    color: 'white',
    fontFamily: 'Roboto'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232F34'
  },
  button: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'white'
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser: loginUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
