import * as React from 'react';
import {StatusBar,View} from 'react-native';
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
      <View style={{ flex:1 }}>
        <StatusBar barStyle = "white" hidden = {false} backgroundColor = "#161617" translucent = {true}/>
        <APP />
      </View>
    );
  }
}

export default App;