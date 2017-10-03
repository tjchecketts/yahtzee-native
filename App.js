import React, { Component } from 'react';
import Expo from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Drawer
} from 'native-base';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Yahtzee from './components/Yahtzee';
import Login from './components/Login';
import Register from './components/Register';
import Scores from './components/Scores';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import store from './store';

class App extends Component {
  state = { drawerOpen: false }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen }, () => {
      if (this.state.drawerOpen)
        this.openDrawer();
      else
        this.closeDrawer();
    });
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.toggleDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Yahtzee</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <Drawer
                ref={ ref => { this.drawer = ref }}
                content={<Sidebar close={() => this.toggleDrawer()} navigator={this._navigator} />}
                onClose={() => this.closeDrawer()}
              >
              </Drawer>
              { this.state.drawerOpen ? null :
                <View>
                  <Switch>
                    <ProtectedRoute exact path="/" component={Yahtzee} />
                    <ProtectedRoute exact path="/scores" component={Scores} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                  </Switch>
                </View>
              }
            </Content>
          </Container>
        </NativeRouter>
      </Provider>
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
});

export default App;
