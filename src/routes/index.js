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
import Home from "../screens/HomeScreen";
import Category from "../screens/CategoryScreen";
import Item from "../screens/ItemScreen";
import Player from "../screens/Player";
import {
  THEME_COLOR,
} from "../components/colors";
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
  Player:{
    screen:Player
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


export default createAppContainer(AppStack);