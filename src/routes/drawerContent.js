import React, { useEffect, useState } from 'react';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { View } from 'react-native';
import { Drawer } from 'react-native-paper';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TOKEN from "../fetch_storage_data"

function DrawerContent({ navigation, ...props }) {
  console.log('DrawerContent Token', props.token);
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Drawer.Section>
          <DrawerItem
            label="Home"
            onPress={() => {
              navigation.navigate('SEARCH');
            }}
          />

          {props.token != null ? (
            <View>
              <DrawerItem
                label="Profile"
                onPress={() => {
                  navigation.navigate('PROFILE');
                }}
              />
              <DrawerItem
                label="Log Out"
                onPress={async () => {
                  props.logout();
                  await AsyncStorage.removeItem('token');
                  await AsyncStorage.setItem('token', '');
                  await props.update_token(null);
                  // navigation.navigate('SIGNIN');
                }}
              />
            </View>
          ) : (
            <DrawerItem
              label="Sign In"
              onPress={() => {
                navigation.navigate('SIGNIN', { data: "SIGNUP" });
              }}

            />
          )}
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    update_token: token => {
      dispatch({
        type: 'UPDATE_TOKEN',
        auth_token: token,
      });
    },
    logout: () => { dispatch({ type: "ISSIGNIN", issignin: false }) },
    user: user => {
      dispatch({ type: 'USER', user: user });
    },
  };
};

export default connect(null, mapDispatchToProps)(DrawerContent);
