import React, { useState } from 'react';
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
import { GlobalDataContext } from '../Context';
import { apiEditUser } from '../Thunks/Users';
import tw from 'twrnc';
const style = {
  button: `m-2 p-2 bg-blue-400 rounded-lg items-center mr-10 ml-10 shadow-lg`,
  textInput: `border border-gray-800 h-8 text-lg pl-2`,
  text: `font-bold text-lg`,
};

const EditProfile = ({ navigation }) => {
  const { authData, setAuthData } = React.useContext(GlobalDataContext);
  const [username, setUsername] = useState(authData.username);
  const [email, setEmail] = useState(authData.email);
  const [name, setName] = useState(authData.name);
  const [lastName, setLastName] = useState(authData.lastName);
  const [password, setPassword] = useState(authData.password);
  const [validUsername, setValidUsername] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [hasName, setHasName] = useState(true);
  const [form, setForm] = useState({});
  const [passLength, setPassLength] = useState(true);
  const [capitalization, setCapitalization] = useState(true);
  const [matching, setMatching] = useState('');
  const [isMatching, setIsMatching] = useState(true);
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
    let nameForForm = `${name} ${lastName}`;
    setForm({
      username: username.trim(),
      name: nameForForm.trim(),
      email: email.trim(),
      password: password,
    });
    console.log(form);
  };
  const submitForm = async () => {
    if (emailCheck && passLength && capitalization && isMatching && hasName) {
      console.log('Submit GOOD---------');
      console.log(form);

      apiEditUser(form);
    } else {
      console.log('submit BAD--------');
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
          onEndEditing={() => {
            console.log(username);
          }}
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
          onEndEditing={() => {
            console.log('EDITING');
          }}
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
};

export default EditProfile;
