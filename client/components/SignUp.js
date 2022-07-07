import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';

import tw from 'twrnc';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg';

export default function SignUp() {
  return (
    <View style={tw`flex-1 bg-blue-200 p-12 top-0`}>
      <View style={tw`flex-1`}></View>
      <View style={tw`flex-1`}>
        <Text style={tw`font-bold`}>Email:</Text>
        <TextInput style={tw`border border-gray-400`}></TextInput>
        <Text style={tw`font-bold`}>First name:</Text>
        <TextInput style={tw`border border-gray-400`}></TextInput>
        <Text style={tw`font-bold`}>Last name:</Text>
        <TextInput style={tw`border border-gray-400`}></TextInput>
        <Text style={tw`font-bold`}>Password:</Text>
        <TextInput style={tw`border border-gray-400`}></TextInput>
        <Text style={tw`font-bold`}>Confirm password:</Text>
        <TextInput style={tw`border border-gray-400`}></TextInput>
        <Pressable style={tw`${buttonStyle}`}>
          <Text style={tw`font-bold`}>Create account</Text>
        </Pressable>
      </View>
    </View>
  );
}
