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

import tw from 'twrnc';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg';
const textStyle = `border border-gray-400`;
export default function SignUp() {
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
      console.log('Email: valid');
    } else {
      setEmailCheck(false);
      console.log('Email: invalid');
    }
    if (name.length > 0) {
      setHasName(true);
    } else {
      setHasName(false);
    }
    if (password.length > 7) {
      setPassLength(true);
      console.log('password long enough');
    } else {
      setPassLength(false);
      console.log('too short');
    }
    if (matching === password) {
      console.log('password matches');
      setIsMatching(true);
    } else {
      console.log('passwords dont match');
      setIsMatching(false);
    }
    if (
      password === password.toLowerCase() ||
      password === password.toUpperCase() ||
      password.length === 0
    ) {
      setCapitalization(false);
      console.log('CAPS: needs upper and lower');
    } else {
      setCapitalization(true);
      console.log('CAPS: good');
    }
    setForm({
      username: username,
      name: `${name} ${lastName}`,
      email: email,
      password: password,
    });
    console.log(form);
  };
  const submitForm = () => {
    if (emailCheck && passLength && capitalization && isMatching && hasName) {
      console.log('Submit GOOD---------');
      console.log(form);
    } else {
      console.log('submit BAD--------');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-blue-200 p-12`}>
      <View style={tw`flex-1 items-center pb-50 `}>
        <Text style={tw`text-2xl`}>Create your account!</Text>
      </View>
      <View style={tw`flex-2 pb-80`}>
        <Text style={tw`font-bold`}>Username:</Text>
        <TextInput
          onEndEditing={() => {
            console.log(username);
          }}
          value={username}
          onChangeText={setUsername}
          style={tw`border border-gray-400`}
        ></TextInput>
        {validUsername ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Please enter a username between 4-16 characters
          </Text>
        )}
        {/*  */}
        <Text style={tw`font-bold`}>Email:</Text>
        <TextInput
          onEndEditing={() => {
            console.log('EDITING');
          }}
          value={email}
          onChangeText={setEmail}
          style={tw`border border-gray-400`}
        ></TextInput>
        {emailCheck ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Please enter a valid email address
          </Text>
        )}
        <Text style={tw`font-bold`}>First name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={tw`border border-gray-400`}
        ></TextInput>
        {hasName ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>-Please enter a first name</Text>
        )}
        <Text style={tw`font-bold`}>Last name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={tw`border border-gray-400`}
        ></TextInput>
        <></>
        <Text style={tw`font-bold`}>Password:</Text>

        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={tw`border border-gray-400`}
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
        <Text style={tw`font-bold`}>Confirm password:</Text>
        <TextInput
          value={matching}
          secureTextEntry={true}
          onChangeText={setMatching}
          style={tw`border border-gray-400`}
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
          style={tw`${buttonStyle}`}
        >
          <Text style={tw`font-bold`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
