import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  AsyncStorage,
  Image,
  Text,
  View
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import Welcome from "../screens/WelcomeScreen";
import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import Home from "../screens/HomeScreen";
import Category from "../screens/CategoryScreen";
import Item from "../screens/ItemScreen";
import {
  THEME_COLOR,
} from "../components/colors";
import { Icon } from "react-native-elements";
const createStacks = (screen, title = null) => {
  let myTitle = "";
  return createStackNavigator(screen, {
    defaultNavigationOptions: ({ navigation }) =>
      // myTitle = title ? title : setHeaderTitle(navigation),
      ({
        headerStyle: {
          height: Platform.OS === "ios" ? 68 : 78,
          // paddingBottom: 12,
          backgroundColor: THEME_COLOR,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          flexGrow: 1,
          textAlign: "center",
          fontSize: 25,
        },
        // headerTitle: myTitle,
        headerTintColor: "#ffffff",
        headerLeft: <BackImage navigation={navigation} />,
        // headerRight: <CreateEvent navigation={navigation} />,
      }),
  });
};
const AppStack = createStackNavigator({
  Home:{
      screen:Home
      ,navigationOptions:({navigation})=>({headerTitle:""})
  },
  Category:{
    screen:Category
    ,navigationOptions:({navigation})=>({headerTitle:""})
  },
  Item:{
    screen:Item
    ,navigationOptions:({navigation})=>({headerTitle:""})
  },
    },
    {
      defaultNavigationOptions:({navigation})=>(
        {
        // headerTitleAlign: 'center',
        // headerTitleStyle:{
        //     flexGrow:1,
        //     marginTop:10
        // },
        // headerLeft:(<View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center' }}><Image source={ require('../assets/logo.png') } style={{width:35,height:35,marginHorizontal:10}}/><Text style={{ color:'white' }}>Productions</Text></View>),
        // headerStyle:{
        //     backgroundColor:'black',
        //     height:100
        // },
        // headerTintColor:'white',
        header:false
        // headerLeft:<Menue navigation={navigation}/>

})
});
export const switchNavigator = createSwitchNavigator(
  {
    Auth: createStackNavigator(
      {
        welcome: {
          screen: Welcome,
          navigationOptions: {
            headerBackTitle: null,
            headerStyle: {
              height: Platform.OS === "ios" ? 68 : 78,
              // paddingBottom: 12,
              backgroundColor: "transparent",
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              borderBottomWidth: 0,
            },
            headerTransparent: {
              position: "absolute",
            },
            headerTitleStyle: {
              flexGrow: 1,
              alignSelf: "center",
            },
            headerTintColor: "#fff",
          },
        },
        login: {
          screen: Login,
          navigationOptions: {
            headerBackTitle: null,
            headerStyle: {
              height: Platform.OS === "ios" ? 68 : 78,
              // paddingBottom: 12,
              backgroundColor: "transparent",
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              borderBottomWidth: 0,
            },
            headerTransparent: {
              position: "absolute",
            },
            headerTitleStyle: {
              flexGrow: 1,
              alignSelf: "center",
            },
            headerTintColor: "#fff",
          },
        },
        signup: {
          screen: Signup,
          navigationOptions: {
            title: "Sign Up",
            headerTitleStyle: {
              // textAlign: 'center',
              color: "#ff5a66",
              flex: 1,
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: '#f2f2f2',
              height: 80,
            },
            headerTintColor: "#fff",
            headerLeft:()=><></>,
            headerRight:()=><></>
          },
        },
        // forget: {
        //   screen: Forget,
        //   navigationOptions: {
        //     headerBackTitle: null,
        //     headerStyle: {
        //       height: Platform.OS === "ios" ? 68 : 78,
        //       // paddingBottom: 12,
        //       backgroundColor: "transparent",
        //       elevation: 0, // remove shadow on Android
        //       shadowOpacity: 0, // remove shadow on iOS
        //       borderBottomWidth: 0,
        //     },
        //     headerTransparent: {
        //       position: "absolute",
        //     },
        //     headerTitleStyle: {
        //       flexGrow: 1,
        //       textAlign: "center",
        //     },
        //     headerTintColor: "#fff",
        //   },
        // },
      },
      {
        // initialRouteName:'Super Host Login',
      }
    ),
    App:AppStack,
  },
  {
    initialRouteName: "App",
  }
);

export default createAppContainer(switchNavigator);