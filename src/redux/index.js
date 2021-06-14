import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStore } from 'redux';

const initialState = {
  name: '',
  auth_token: '',
  user: "",
  signInModal: false,
  signUpModal: false,
  isSignIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return { ...state, auth_token: action.auth_token };
    // break;
    case 'USER':
      // alert("here it comes")
      return { ...state, user: action.user };
    case 'SIGNINMODAL':
      // alert("signin modal called")
      return { ...state, signInModal: action.signin, signUpModal: action.signup };
    case 'SIGNUPMODAL':
      return { ...state, signInModal: action.signin, signUpModal: action.signup };
    case 'LOGOUT':
      return { ...state, signInModal: false, signUpModal: false };
    case 'ISSIGNIN':
      // alert("issign in caled")
      return { ...state, isSignIn: action.issignin };
    // break;
    default:
      break;
  }
  return state;
};
export const store = createStore(reducer);
