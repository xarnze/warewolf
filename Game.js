import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Switch } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';
import {
  DrawerNavigator,
} from 'react-navigation';
import { Welcome } from './GameScreens/Welcome';

export class Game extends React.Component {
  render() {
    console.log(this.props)
    const navigate = this.props.navigation.state.params.navigate;
    const AppData = this.props.navigation.state.params.appdata();
    let self = this;
    const AppDataFunc = (inObj) => {const newAppData = this.props.navigation.state.params.appdata(inObj); if(inObj) {self.forceUpdate();} return newAppData;};
    if(AppData.Game.CurrentScreenComponent === null){
      AppData.Game.CurrentScreenComponent = Welcome;
    }
    return (
      <View style={styles.container}>
        <AppData.Game.CurrentScreenComponent data={ AppDataFunc }/>
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
