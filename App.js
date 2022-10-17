import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
import { Platform } from 'react-native';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

import ENV from './env.json';


//  eslint-disable-next-line
require("firebase/firestore");
//
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
  apiKey:            ENV.FIREBASE_API_KEY,
  authDomain:        ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL:       ENV.FIREBASE_DB_URL,
  projectId:         ENV.FIREBASE_PRJ_ID,
  storageBucket:     ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId:             ENV.FIREBASE_APP_ID,
  measurementId:     ENV.FIREBASE_MEASUREMENT_ID,
};
firebase.default.initializeApp(config);

const App = createStackNavigator({
  Login:     { screen: LoginScreen },
  Signup:    { screen: SignupScreen },
  Home:      { screen: MemoListScreen },
  MemoDetail:{ screen: MemoDetailScreen },
  MemoEdit:  { screen: MemoEditScreen },
  MemoCreate:{ screen: MemoCreateScreen },
  },{
    defaultNavigationOptions: {
      headerTitle: 'Memot',
      headerTintColor: '#fff',
      headerBackTitleVisible: null,
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: '#265366',
        ...Platform.select({
          android: {
            height: 80,
            paddingTop: 20,
          },
        }),
      },
      headerTitleStyle:{
        color: '#fff',
      },
    },
  });

export default createAppContainer(App);
