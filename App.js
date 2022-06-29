import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import SignUp from './client/components/SignUp';
import SignIn from './client/components/SignIn';
import tw from 'twrnc';

export default function App() {
  const isSigned = true;
  return isSigned ? (
    <View style={tw`flex-1 my-20 pl-6 pr-6`}>
      <View style={tw`flex-1`}>
        <Text> default image</Text>
      </View>
      <View style={tw`flex-1`}>
        <SignIn></SignIn>
        <SignUp></SignUp>
      </View>
    </View>
  ) : (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
        <Text style={tw`text-white font-semibold text-lg`}>
          Hello Tailwind TEST👋
        </Text>
      </View>
    </SafeAreaView>
  );
}
