import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Welcome } from './GameScreens/Welcome';

export class Game extends React.Component {
  render() {
    const navigate = this.props.navigate;
    const AppData = this.props.appdata;
    return (
      <View style={styles.container}>
        <Welcome />
      </View>
    );
  }
  newGame(navigate) {
    navigate('People');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContaner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
