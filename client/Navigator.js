/** @format */

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalIsSignedContext } from './Context';
import tw from 'twrnc';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import CameraComponent from './components/CameraComponent';
import ProfileNavigate from './components/ProfileNavigate';

import AllChallenges from './components/AllChallenges';
import SingleChallenge from './components/SingleChallenge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Feed from './components/feed';
import ViewPicture from './components/ViewPicture';
import PublicProfile from './components/PublicProfile';
import SearchResults from './components/SearchResults';
import SocketComponent from './components/SocketComponent';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

const FeedNav = () => {
  const inserts = useSafeAreaInsets();
  return (
    <TabTop.Navigator
      initialRouteName='HomePage'
      activeColor='#e91e63'
      labelStyle={{ fontSize: 12 }}
      animationEnabled={true}
      style={{ marginTop: inserts.top }}
    >
      <TabTop.Screen
        name='HomePage'
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <TabTop.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='book' color={color} size={26} />
          ),
        }}
      />
      <TabTop.Screen
        name='Chat'
        component={SocketComponent}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chat' color={color} size={26} />
          ),
        }}
      />
    </TabTop.Navigator>
  );
};

const HomeNav = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#e91e63'
      labelStyle={{ fontSize: 12 }}
      animationEnabled={true}
      barStyle={{ backgroundColor: 'blue' }}
    >
      <Tab.Screen
        name='Home'
        component={FeedNav}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Challenges'
        component={AllChallenges}
        options={{
          tabBarLabel: 'Challenges',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='compass' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      >
        {(props) => <ProfileNavigate {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const { isSigned } = React.useContext(GlobalIsSignedContext);
  return !isSigned ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SignIn' options={{ headerShown: false }}>
          {(props) => <SignIn {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='SignUp'
          options={{
            headerShown: true,

            headerStyle: {
              backgroundColor: 'lightgray',
            },
          }}
        >
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeNav'
          options={{ headerShown: false }}
          component={HomeNav}
        />
        <Stack.Screen
          name='Camera'
          component={CameraComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='SingleChallenge' component={SingleChallenge} />
        <Stack.Screen name='ViewPicture' component={ViewPicture} />
        <Stack.Screen name='PublicProfile' component={PublicProfile} />
        <Stack.Screen name='SearchResults' component={SearchResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
