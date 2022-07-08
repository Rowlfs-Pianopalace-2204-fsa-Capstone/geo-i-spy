import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { apiAuthLogin } from "../Thunks/Auth";
import { GlobalDataContext } from "../Context";
import { GlobalIsSignedContext } from "../Context";
export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authData, setAuthData } = React.useContext(GlobalDataContext);
  const { isSigned, setIsSigned } = React.useContext(GlobalIsSignedContext);
  useEffect(() => {}, [authData]);
  const handleLogin = async () => {
    const user = await apiAuthLogin(username, password);
    console.log(user);
    if (user) {
      setIsSigned(true);
      setAuthData(user);
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
  return (
    <View style={styles.container}>
      {!isSigned ? (
        <View>
          <Text style={styles.helloText}>Hello There!</Text>
          <TextInput
            placeholder="username"
            style={styles.textInput}
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(password) => setPassword(password)}
          />
          <Text style={styles.loginBtn} onPress={handleLogin}>
            Login
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>
            Welcome back! {authData.username}
          </Text>
          <Text style={styles.logoutBtn} onPress={handleLogout}>
            Logout
          </Text>
        </View>
      )}
    </View>
  );
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    // justifyContent: 'center',
    paddingTop: 250,
  },
  helloText: {
    color: "white",
    marginBottom: 20,
    fontSize: 30,
  },
  textInput: {
    padding: 5,
    paddingStart: 15,
    backgroundColor: "#3b3b3b",
    width: screenWidth * 0.8,
    borderRadius: 25,
    marginBottom: 15,
    color: "white",
    fontWeight: "600",
  },
  loginBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#ff1178",
    borderRadius: 25,
    color: "white",
    textAlign: "center",
  },
  welcomeText: {
    color: "white",
    marginBottom: 20,
    fontSize: 30,
  },
  logoutBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#ff1178",
    borderRadius: 25,
    color: "white",
    textAlign: "center",
  },
});
