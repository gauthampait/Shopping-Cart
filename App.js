/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';

import HomeView from './src/HomeView'
import ProductDetailView from './src/ProductDetailView'

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation'

export default class App extends Component {
  render() {
    return (
      <Stack/>
    );
  }
}

const Stack = StackNavigator({
  HomeView : {
    screen : HomeView
  },
  ProductDetailView : {
    screen : ProductDetailView
  }
})