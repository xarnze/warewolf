import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Action } from './Action';

export class Night extends React.Component {
  render() {
    const dataFunc = this.props.data;
    const AppData = dataFunc();
    return (
      <View style={styles.container}>
        <Text>Night { AppData.Game.CurrentDay }.</Text>
        <Text>Night Time, All players go to sleep.</Text>
        <Button
          title='Next' onPress={ () => {
            let appData = dataFunc();
            appData.Game.CurrentScreenComponent = Action
            dataFunc(appData)
          } } />
      </View>
    );
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
