import React, {Component} from 'react';
import CameraScreen from './screens/camera_screen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/home_screen';
import {createStackNavigator} from '@react-navigation/stack';
import ContactBrowse from './screens/contactbrowse_screen';
import ContactConfirm from './screens/contactconfirm_screen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'BizWallet'}}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{headerShown: false}}
            
          />
          <Stack.Screen name="ContactBrowse" component={ContactBrowse} />
          <Stack.Screen name="ContactConfirm" component={ContactConfirm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
