import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import tailwind from 'tailwind-rn';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow';

export default function SignIn() {
  return (
    <View>
      <Text>Email:</Text>
      <TextInput style={tailwind('border border-gray-400')}></TextInput>
      <Text>Password:</Text>
      <TextInput style={tailwind('border border-gray-400')}></TextInput>
      <Pressable style={tailwind(buttonStyle)}>
        <Text style={tailwind('font-bold')}>Sign in!!</Text>
      </Pressable>
      <Pressable style={tailwind(buttonStyle)}>
        <Text style={tailwind('font-bold')}>Sign up!!</Text>
      </Pressable>
    </View>
  );
}
