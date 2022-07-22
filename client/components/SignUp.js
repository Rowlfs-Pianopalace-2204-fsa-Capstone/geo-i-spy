/** @format */

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { GlobalDataContext } from '../Context';
import { GlobalIsSignedContext } from '../Context';
import { apiAuthSignUp } from '../Thunks/Auth';
import tw from 'twrnc';
import { apiGetAllAchievements } from '../Thunks/cloud';

const style = {
  button: `m-2 p-2 bg-blue-400 rounded-lg items-center mr-10 ml-10 shadow-lg`,
  textInput: `border border-gray-800 h-8 text-lg pl-2`,
  text: `font-bold text-lg`,
};

export default function SignUp() {
  const { setAuthData, setAchievements } = React.useContext(GlobalDataContext);
  const { setIsSigned } = React.useContext(GlobalIsSignedContext);
  //username state
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  //email state
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(true);
  //Password state
  const [password, setPassword] = useState('');
  const [passLength, setPassLength] = useState(true);
  const [capitalization, setCapitalization] = useState(true);
  const [matching, setMatching] = useState('');
  const [isMatching, setIsMatching] = useState(true);
  //Names state
  const [name, setName] = useState('');
  const [hasName, setHasName] = useState(true);
  const [lastName, setLastName] = useState('');
  //Form
  const [form, setForm] = useState({});

  const checkForm = () => {
    if (username.length < 4 || username.length > 16) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
    if (email.slice(-4) === '.com' && email.includes('@')) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
    if (name.length > 0) {
      setHasName(true);
    } else {
      setHasName(false);
    }
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
    if (matching === password) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
    if (
      password === password.toLowerCase() ||
      password === password.toUpperCase() ||
      password.length === 0
    ) {
      setCapitalization(false);
    } else {
      setCapitalization(true);
    }
    let firstForForm = name;
    let lastForForm = lastName;
    setForm({
      username: username.trim(),
      first: firstForForm.trim(),
      email: email.trim(),
      password: password,
      last: lastForForm.trim(),
    });
  };
  const submitForm = async () => {
    console.log(form);
    if (emailCheck && passLength && capitalization && isMatching && hasName) {
      const newUser = await apiAuthSignUp(form);
      setAuthData(newUser);
      setIsSigned(true);
      apiGetAllAchievements().then((data) => {
        setAchievements(data);
      });
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-blue-200 p-12`}>
      <View style={tw`flex-1 items-center pb-50 `}>
        <Text style={tw`text-2xl`}>Create your account!</Text>
      </View>
      <View style={tw`flex-2 pb-110`}>
        <Text style={tw`${style.text}`}>Username:</Text>
        <TextInput
          onEndEditing={() => {}}
          value={username}
          onChangeText={setUsername}
          style={tw`${style.textInput}`}
        ></TextInput>
        {validUsername ? (
          <></>
        ) : (
          <Text style={tw`${style.text}`}>
            -Please enter a username between 4-16 characters
          </Text>
        )}
        {/*  */}
        <Text style={tw`${style.text}`}>Email:</Text>
        <TextInput
          onEndEditing={() => {}}
          value={email}
          onChangeText={setEmail}
          style={tw`${style.textInput}`}
        ></TextInput>
        {emailCheck ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Please enter a valid email address
          </Text>
        )}
        <Text style={tw`${style.text}`}>First name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={tw`${style.textInput}`}
        ></TextInput>
        {hasName ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>-Please enter a first name</Text>
        )}
        <Text style={tw`${style.text}`}>Last name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={tw`${style.textInput}`}
        ></TextInput>
        <></>
        <Text style={tw`${style.text}`}>Password:</Text>

        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={tw`${style.textInput}`}
        ></TextInput>
        {passLength ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Password needs to be at least 8 characters long
          </Text>
        )}
        {capitalization ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Password needs at least one upper and lower case letter
          </Text>
        )}
        <Text style={tw`${style.text}`}>Confirm password:</Text>
        <TextInput
          value={matching}
          secureTextEntry={true}
          onChangeText={setMatching}
          style={tw`${style.textInput}`}
        ></TextInput>
        {isMatching ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>Passwords aren't matching</Text>
        )}
        <></>
        <TouchableOpacity
          onPressIn={() => checkForm()}
          onPressOut={() => {
            submitForm();
          }}
          style={tw`${style.button}`}
        >
          <Text style={tw`${style.text}`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
