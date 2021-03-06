import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, PersistGate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2,
 whitelist: ['auth']
};

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);
const pReducer = persistReducer(persistConfig, reducers);
const store = createStoreWithMiddleware(pReducer);
const persistor = persistStore(store);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
        'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
        'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
