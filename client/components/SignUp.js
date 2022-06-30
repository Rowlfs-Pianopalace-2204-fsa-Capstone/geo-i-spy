import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';

import tw from 'twrnc';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg';

export default function SignUp() {
  return (
    <View style={tw`border bg-blue-800`}>
      <Text style={tw`shadow-xl`}>Email:</Text>
      <TextInput style={tw`border border-gray-400`}></TextInput>
      <Text>First name:</Text>
      <TextInput style={tw`border border-gray-400`}></TextInput>
      <Text>Last name:</Text>
      <TextInput style={tw`border border-gray-400`}></TextInput>
      <Text>Password:</Text>
      <TextInput style={tw`border border-gray-400`}></TextInput>
      <Text>Confirm password:</Text>
      <TextInput style={tw`border border-gray-400`}></TextInput>

      <Pressable style={tw`${buttonStyle}`}>
        <Text style={tw`font-bold`}>Create account</Text>
      </Pressable>
    </View>
  );
}