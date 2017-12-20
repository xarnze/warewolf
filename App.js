import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';

let AppData = {
  Players: [
    {name: 'Sophie'},
    {name: 'Aaron'},
  ],
  Characters: [],
  Game: {
    ActiveCharacters: [],
    WolfTeam: [],
    VillagerTeam: [],
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

export class People extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.outerContaner}>
        <Header
          centerComponent={{ text: 'People', style: { color: '#fff' } }}
          rightComponent={{ icon: 'add-user', color: '#fff', onPress: () => navigate('AddPerson') }}
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
  selectCharacters(navigation) {
    console.log(AppData);
  }
}

export default App = DrawerNavigator({
  Home: { screen: MainMenu },
  People: { screen: People },
  PickCharacters: { screen: PickCharacters },
  AddPerson: { screen: AddPerson }
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
