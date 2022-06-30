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

export default function SignIn() {
  return (
    <View style={tw`bg-gray-200/50 p-4`}>
      <Text style={tw`shadow-xl font-bold`}>Email:</Text>
      <TextInput
        style={tw`border border-gray-500 bg-gray-200/75 pl-2`}
      ></TextInput>
      <Text style={tw`shadow-xl font-bold`}>Password:</Text>
      <TextInput
        style={tw`border border-gray-500  bg-gray-200/75 pl-2`}
      ></TextInput>
      <Pressable style={tw`${buttonStyle}`}>
        <Text style={tw`font-bold`}>Sign in</Text>
      </Pressable>
      <Pressable style={tw`${buttonStyle}`}>
        <Text style={tw`font-bold`}>Sign Up</Text>
      </Pressable>
    </View>
  );
}
