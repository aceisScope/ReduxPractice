import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './app/reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RxProject extends Component {
  render() {
    return (
      <View>
        <Text>
          I am an App!
        </Text>
      </View>
    );
  }
}

const App = () => (
  <Provider store = {store}>
    <RxProject/>
  </Provider>
);

AppRegistry.registerComponent('RxProject', () => App);
