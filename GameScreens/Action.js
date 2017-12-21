import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Outcome } from './Outcome';

export class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      show: false,
    };
  }
  render() {
    const dataFunc = this.props.data;
    const AppData = dataFunc();
    return (
      <View style={styles.container}>
        <Text> Pass the phone to {AppData.Game.LivePlayers[AppData.Game.ActivePlayer].name}</Text>
        <View style={this.state.show ? { display: 'none' } : {} } >
          <Button title='Show Details' onPress={ () => {this.setState({ show:true})}} />
        </View>
        <View style={this.state.show ? {} : { display: 'none' }} >
          <Text> You are {AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].name}</Text>
          <Text>{AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].description}</Text>
          <Text>{AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].helpText}</Text>
          <Button
            title='Next' onPress={ () => { this.next(dataFunc) } } />
        </View>
      </View>
    );
  }
  killPlayer(playerIdx) {
    let appData = dataFunc();
    appData.Game.LivePlayers.splice(playerIdx, 1)
    dataFunc(appData)
  }
  next(dataFunc) {
    let appData = dataFunc();
    console.log(appData.Game.LivePlayers.length);
    if(appData.Game.ActivePlayer+1 < appData.Game.LivePlayers.length){
      appData.Game.ActivePlayer++;
      this.forceUpdate();
      this.setState({ show:false })
    }else{
      appData.Game.ActivePlayer = 0;
      appData.Game.CurrentScreenComponent = Outcome;
    }
    dataFunc(appData)
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
