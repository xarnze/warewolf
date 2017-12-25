import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Game } from './Game';

const WOLF = 0;
const VILLAGE = 1;

let AppData = {
  Players: [
    {
      name: 'Sophie',
      characterId: 0
    },
    {
      name: 'Aaron',
      characterId: 1
    },
  ],
  Characters: [
    {
      id: 0,
      name: 'Wolf',
      enabled: true,
      kills: true,
      min: 1,
      team: WOLF,
      description: 'The werewolf 🐺',
      helpText: 'Choose a player to kill tonight:'
    },
    {
      id: 1,
      name: 'Villager',
      enabled: true,
      kills: false,
      min: 0,
      team: VILLAGE,
      description: 'A normal villager',
      helpText: ''
    },
    {
      id: 2,
      name: 'Hunter',
      enabled: true,
      kills: false,
      min: 0,
      team: VILLAGE,
      description: '',
      helpText: ''
    },
    {
      id: 3,
      name: 'Witch',
      enabled: true,
      kills: false,
      min: 0,
      team: VILLAGE,
      description: '',
      helpText: '',
      power: [
        {
          name: 'Life potion',
          uses: 1,
          type: 'revive'
        },
        {
          name: 'Death potion',
          uses: 1,
          type: 'kill'
        },
      ]
    },
    {
      id: 4,
      name: 'Seer',
      enabled: true,
      kills: false,
      reveals: true,
      min: 0,
      team: VILLAGE,
      description: '',
      helpText: ''
    },
    {
      id: 5,
      name: 'Doctor',
      enabled: true,
      kills: false,
      heals: true,
      min: 0,
      team: VILLAGE,
      description: '',
      helpText: ''
    },
    {
      id: 6,
      name: 'Alpha Wolf',
      enabled: true,
      kills: true,
      min: 1,
      team: WOLF,
      description: 'The Alpha werewolf 🐺, You must say the word werewolf during the day.',
      helpText: 'Choose a player to kill tonight:'
    },
  ],
  Game: {
    CurrentDay: 1,
    ActivePlayer: 0,
    CurrentScreenComponent: null,
    ActiveCharacters: [],
    WolfTeam: [],
    VillagerTeam: [],
    LivePlayers: [],
    WolfVotes: {}
    toDie: [],
    KilledLastRound: []
  }
}

export class MainMenu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.outerContaner}>
        <Header
          centerComponent={{ text: 'Warewolf', style: { color: '#fff' } }}
        />
        <View style={styles.container}>
          <Button
            title='New Game'
            onPress={() => this.newGame(navigate)} />
        </View>
      </View>
    );
  }
  newGame(navigate) {
    navigate('People');
  }
}

import SortableListView from 'react-native-sortable-listview'

class RowComponent extends React.Component {
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
        <Text>{this.props.data.name}</Text>
      </TouchableHighlight>
    )
  }
}

class CharacterRowComponent extends React.Component {
  render() {
    let data = this.props.data;
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
        <View>
          <Text>{this.props.data.name}</Text>
          <Text>{this.props.data.description}</Text>
          <Switch value={AppData.Characters[data.id].enabled} onValueChange={ (val) => { AppData.Characters[data.id].enabled = val; this.forceUpdate();}}/>
        </View>
      </TouchableHighlight>
    )
  }
}

export class People extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.outerContaner}>
        <Header
          centerComponent={{ text: 'People', style: { color: '#fff' } }}
          rightComponent={{ icon: 'add', color: '#fff', onPress: () => navigate('AddPerson') }}
        />
          <SortableListView
            style={{ flex: 1, width: '100%' }}
            data={AppData.Players}
            onRowMoved={e => {
              AppData.Players.splice(e.to, 0, AppData.Players.splice(e.from, 1)[0])
              this.forceUpdate()
            }}
            renderRow={row => <RowComponent data={row} />}
          />
          <Button
            title='Next'
            onPress={() => this.selectCharacters(navigate)} />
      </View>
    );
  }
  selectCharacters(navigate) {
    navigate('PickCharacters');
  }
}

export class AddPerson extends React.Component {
  render() {
    const navigation = this.props.navigation;
    let localState = {};
    return (
      <View style={styles.outerContaner}>
        <Header
          centerComponent={{ text: 'Add Player', style: { color: '#fff' } }}
        />
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={(newText) => localState.name = newText }/>
          <Button
            title='Add'
            onPress={() => {
              AppData.Players.push(localState)
              navigation.navigate('People')
            }} />
      </View>
    );
  }
}

export class PickCharacters extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.outerContaner}>
        <Header
          centerComponent={{ text: 'Choose Available Characters', style: { color: '#fff' } }}
        />
          <SortableListView
            style={{ flex: 1, width: '100%' }}
            disableSorting={true}
            data={AppData.Characters}
            onRowMoved={e => {
              AppData.Characters.splice(e.to, 0, AppData.Characters.splice(e.from, 1)[0])
              this.forceUpdate()
            }}
            renderRow={row => <CharacterRowComponent data={row} />}
          />
          <Button
            title='Next'
            onPress={() => this.selectCharacters(navigate)} />
      </View>
    );
  }
  selectCharacters(navigation) {
    let self = this;
    this.assignRoles();
    navigation('Game', { appdata: (inObj) => { return self.getAppData(inObj, self) }, navigate: navigation })
  }
  assignRoles() {
    AppData.Game.LivePlayers = JSON.parse(JSON.stringify(AppData.Players));
    let countTeamWolf = 0;
    let countTeamVillage = 0;
    let lastRandomCharacterId = -1;
    const totalPlayers = AppData.Game.LivePlayers.length;
    const maxWolves = totalPlayers/2;
    const minWolves = this.getMinWolves();
    for (var i = 0; i < AppData.Game.LivePlayers.length; i++) {
      let randomCharacterID = -1;
      do {
        randomCharacterID = this.getRandomInt(0, AppData.Characters.length);
      }while(randomCharacterID == lastRandomCharacterId || (AppData.Characters[randomCharacterID].team === WOLF && countTeamWolf >= maxWolves) || (!AppData.Characters[randomCharacterID].enabled))
      lastRandomCharacterId = randomCharacterID;
      if(AppData.Characters[randomCharacterID].team === WOLF){
        countTeamWolf++;
      }else{
        countTeamVillage++;
      }
      AppData.Game.LivePlayers[i].characterId = randomCharacterID;
    }
    while(countTeamWolf < minWolves){
      AppData.Game.LivePlayers[this.getRandomInt(0, AppData.Game.LivePlayers.length)].characterId = this.getEnabledWolf();
      countTeamWolf++;
    }
  }
  getEnabledWolf(){
    for (var i = 0; i < AppData.Characters.length; i++) {
      if(AppData.Characters[i].team === WOLF && AppData.Characters[i].enabled){
        return AppData.Characters[i].id;
      }
    }
  }
  getMinWolves(){
    let minWolves = 0;
    for (var i = 0; i < AppData.Characters.length; i++) {
      if(AppData.Characters[i].team === WOLF && AppData.Characters[i].enabled){
        minWolves += AppData.Characters[i].min;
      }
    }
    return minWolves;
  }
  getAppData(inObj, self){
    if(inObj){
      AppData = inObj;
    }
    return AppData;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}

export default App = DrawerNavigator({
  Home: { screen: MainMenu },
  People: { screen: People },
  PickCharacters: { screen: PickCharacters },
  AddPerson: { screen: AddPerson },
  Game: { screen: Game }
});

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
