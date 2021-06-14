import * as React from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux'
import { store } from './src/redux/index'
import APP from './src/routes/index'
import SplashScreen from 'react-native-splash-screen';
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {

    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle = "white" hidden = {false} backgroundColor = "#161617" translucent = {true}/>
        <APP />
      </Provider>
    );
  }
}

export default App;