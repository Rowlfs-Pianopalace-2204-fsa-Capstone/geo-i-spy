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
  Image,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalDataContext } from '../Context';
import { GlobalIsSignedContext } from '../Context';
import { apiAuthSignUp } from '../Thunks/Auth';
import tw from 'twrnc';
import { apiGetAllAchievements } from '../Thunks/cloud';
import ImagePickerComponent from './ImagePicker';

export default function EditProfile() {
  const { authData, setAuthData, setAchievements } =
    React.useContext(GlobalDataContext);
  const { setIsSigned } = React.useContext(GlobalIsSignedContext);
  const user = authData;
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

  const [lastName, setLastName] = useState('');
  //Form
  const [form, setForm] = useState({});
  useEffect(() => {
    console.log();
  });
  // const user = authData;
  const checkForm = () => {
    if (
      (username.length < 4 || username.length > 16) &&
      username.length !== 0
    ) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
    if (
      (email.slice(-4) === '.com' && email.includes('@')) ||
      email.length === 0
    ) {
      setEmailCheck(true);
      console.log('Email: valid');
    } else {
      setEmailCheck(false);
      console.log('Email: invalid');
    }
    if (password.length > 7 || password.length === 0) {
      setPassLength(true);
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
    if (password.length > 0) {
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
    }

    //Checking for values and adding to form
    console.log('Info for form:', username, name, email);
    if (username) {
      setForm({ ...form, username: username.trim() });
    }
    if (name) {
      let nameForForm = `${name} ${lastName}`;
      setForm({ ...form, name: nameForForm.trim() });
    }
    if (email) {
      // setEmail(email.trim());
      setForm(form, ...email.trim());
    }
    if (password) {
      setForm(form, ...password);
    }

    console.log(form);
  };
  const submitForm = async () => {
    console.log('FORM:', form);
    if (!name && !password && !email && !username) {
      Alert.alert('', 'No changes were made', [{ text: 'Ok' }]);
    } else {
      if (emailCheck && passLength && capitalization && isMatching) {
        console.log('Submit GOOD---------');
        console.log(form);
      } else {
        console.log('submit BAD--------');
      }
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-blue-200 px-6 pt-18`}>
      <View style={tw`flex-1 items-center`}>
        <Text style={tw`text-2xl pb-2`}>Edit your profile</Text>
        <View style={tw`flex-1 h-40 w-60 mb-6 items-center`}>
          <Image
            source={{
              uri: user.img_url,
            }}
            style={tw`h-40 w-40 rounded-full mb-6`}
          />
          <View style={{ position: 'absolute', bottom: 0, right: 56 }}>
            <ImagePickerComponent />
          </View>
        </View>
      </View>
      <View style={tw`flex-2 pb-110`}>
        <Text style={tw`font-bold text-lg`}>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
        ></TextInput>
        {validUsername ? (
          <></>
        ) : (
          <Text style={tw`font-bold text-lg`}>
            -Please enter a username between 4-16 characters
          </Text>
        )}
        {/*  */}
        <Text style={tw`font-bold text-lg`}>Email:</Text>
        <TextInput
          onEndEditing={() => {
            console.log('EDITING');
          }}
          value={email}
          onChangeText={setEmail}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
        ></TextInput>
        {emailCheck ? (
          <></>
        ) : (
          <Text style={tw`text-red-800`}>
            -Please enter a valid email address
          </Text>
        )}
        <Text style={tw`font-bold text-lg`}>First name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
        ></TextInput>

        <Text style={tw`font-bold text-lg`}>Last name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
        ></TextInput>
        <></>
        <Text style={tw`font-bold text-lg`}>Password:</Text>

        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
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
        <Text style={tw`font-bold text-lg`}>Confirm password:</Text>
        <TextInput
          value={matching}
          secureTextEntry={true}
          onChangeText={setMatching}
          style={tw`border border-gray-800 h-8 text-lg pl-2`}
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
          style={tw`m-2 p-2 bg-blue-400 rounded-lg items-center mr-10 ml-10 shadow-lg`}
        >
          <Text style={tw`font-bold text-lg`}>Accept Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
