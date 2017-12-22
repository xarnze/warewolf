import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import SortableListView from 'react-native-sortable-listview'
import { Outcome } from './Outcome';

export class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      show: false,
      disableKilling: false,
    };
  }
  render() {
    const dataFunc = this.props.data;
    const AppData = dataFunc();
    return (
      <View style={styles.container}>
        <Text> Pass the phone to {AppData.Game.LivePlayers[AppData.Game.ActivePlayer].name}</Text>
        <View style={this.state.show ? { display: 'none' } : {} } >
          <Button title='Show Details' onPress={ () => {this.state.show = true; this.setState(this.state)}} />
        </View>
        <View style={this.state.show ? styles.container : { display: 'none' }} >
          <Text> You are {AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].name}</Text>
          <Text>{AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].description}</Text>
          <Text>{AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].helpText}</Text>
          <View style={AppData.Characters[AppData.Game.LivePlayers[AppData.Game.ActivePlayer].characterId].kills ? styles.container : { display: 'none' }} >
            <SortableListView
              style={{ flex: 1, width: '100%' }}
              disableSorting={true}
              data={AppData.Game.LivePlayers}
              renderRow={row => <RowComponent allowKill={!this.state.disableKilling} data={row} kill={ (name) => { this.state.disableKilling = true; this.killPlayer(name, dataFunc); this.setState(this.state);}} />}
            />
          </View>
          <Button
            title='Next' onPress={ () => { this.next(dataFunc) } } />
        </View>
      </View>
    );
  }
  killPlayer(playerIdx, dataFunc) {
    /*let appData = dataFunc();
    appData.Game.LivePlayers.splice(playerIdx, 1)
    dataFunc(appData)*/
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

class RowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      killed: false,
    };
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <View style={styles.container}>
          <Text>{this.props.data.name}</Text>
          <View style={this.state.killed || this.props.allowKill ? { display: 'none' } : styles.container} >
            <Button
                title='Kill' onPress={ () => { this.state.killed=true; this.setState(this.state); this.props.kill(this.props.data.name) } } />
          </View>
          <View style={this.state.killed ? styles.container : { display: 'none' }} >
            <Text>Targeted</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outerContaner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
