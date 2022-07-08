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
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalIsSignedContext } from "./Context";
import tw from "twrnc";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import CameraComponent from "./components/CameraComponent";
import ProfileNavigate from "./components/ProfileNavigate";

import AllChallenges from "./components/AllChallenges";
import SingleChallenge from "./components/SingleChallenge";
import NewSignIn from "./components/NewSignIn";
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const CamNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraView"
        component={CameraComponent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Navigator() {
  const { isSigned, setIsSigned } = React.useContext(GlobalIsSignedContext);
  return !isSigned ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{ headerShown: false }}>
          {(props) => <SignIn {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "lightgray",
            },
          }}
        >
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        labelStyle={{ fontSize: 12 }}
        animationEnabled={true}
        style={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CamNav}
          options={{
            tabBarLabel: "Camera",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={AllChallenges}
          options={{
            tabBarLabel: "Challenges",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alien" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SingleChallenge"
          component={SingleChallenge}
          options={{
            tabBarLabel: "Current Challenge",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="alien-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        >
          {(props) => (
            <ProfileNavigate {...props} signOut={() => setSigned(false)} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
