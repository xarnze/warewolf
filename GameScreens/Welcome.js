import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Night } from './Night';

export class Welcome extends React.Component {
  render() {
    const dataFunc = this.props.data;
    const AppData = dataFunc();
    return (
      <View style={styles.container}>
        <Text> {AppData.Players[0].name} is the Game master.</Text>
        <Text>All players should sit is a circle so that the phone may be easily passed around. The game master will read the instructions at the start and end of each day.</Text>
        <Button
          title='Go to sleep 😴' onPress={ () => {
            let appData = dataFunc();
            appData.Game.CurrentScreenComponent = Night
            dataFunc(appData)
          }} />
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
