/** @format */

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { apiAuthLogin } from "../Thunks/Auth";
import { GlobalDataContext } from "../Context";
import { GlobalIsSignedContext } from "../Context";
import tw from "twrnc";
import toast from "../helpers/toast";
import * as SecureStore from "expo-secure-store";

const buttonStyle =
  "m-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg";

export default function SignIn({ signIn, navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authData, setAuthData } = React.useContext(GlobalDataContext);
  const { isSigned, setIsSigned } = React.useContext(GlobalIsSignedContext);

  useEffect(() => {
    if (!authData) {
      setAuthData({});
    }
  }, [authData]);
  const handleLogin = async () => {
    const user = await apiAuthLogin(username, password);
    if (user) {
      console.log(user);
      setAuthData(user);
      setIsSigned(true);
    }
  };
  const handleLogout = async () => {
    const logout = await SecureStore.deleteItemAsync("token");
    console.log({ logout });
    if (logout) {
      setAuthData({});
      setIsSigned(false);
    }
  };

  const signUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <ImageBackground
      source={require(`../../public/Bridge.jpeg`)}
      resizeMode="cover"
      style={tw`flex-1 justify-center`}
    >
      <View style={tw`flex-1 my-20 pl-6 pr-6`}>
        <ScrollView>
          <View style={tw`flex-3 justify-center text-center`}>
            <Text style={tw`font-bold text-4xl bg-gray-100/40 `}>
              {" "}
              Welcome to
            </Text>
            <Text style={tw`font-bold text-4xl bg-gray-100/40`}>Geo-I-Spy</Text>
          </View>
          <View style={tw`flex-1`}>
            <View style={tw`bg-gray-200/50 p-4`}>
              <Text style={tw`shadow-xl font-bold`}>Username:</Text>
              <TextInput
                placeholder="username"
                onChangetext={(username) => setUsername(username)}
                style={tw`border border-gray-500 bg-gray-200/75 pl-2`}
              ></TextInput>
              <Text style={tw`shadow-xl font-bold`}>Password:</Text>
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={tw`border border-gray-500  bg-gray-200/75 pl-2`}
              ></TextInput>
              <TouchableOpacity
                style={tw`${buttonStyle}`}
                onPress={() => {
                  () => handleLogin();
                }}
              >
                <Text style={tw`font-bold`}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  signUp();
                }}
                style={tw`${buttonStyle}`}
              >
                <Text style={tw`font-bold`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
