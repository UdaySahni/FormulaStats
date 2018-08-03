import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchActiveDrivers, fetchActiveConstructors, fetchActiveRaces } from '../actions/fetch_actives_actions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.props.fetchActiveDrivers();
    this.props.fetchActiveConstructors();
    this.props.fetchActiveRaces();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = this.props.auth.jwt;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchActiveDrivers: fetchActiveDrivers,
    fetchActiveConstructors: fetchActiveConstructors,
    fetchActiveRaces: fetchActiveRaces
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
