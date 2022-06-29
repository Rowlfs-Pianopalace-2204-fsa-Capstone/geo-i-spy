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
import SignUp from './client/components/SignUp';
import SignIn from './client/components/SignIn';

export default function App() {
  const isSigned = true;
  return isSigned ? (
    <View style={tailwind('flex-1 my-20 pl-6 pr-6')}>
      <View style={tailwind('flex-1')}>
        <Text> default image</Text>
      </View>
      <View style={tailwind('flex-1')}>
        <SignIn></SignIn>
        <SignUp></SignUp>
      </View>
    </View>
  ) : (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center')}>
      <View style={tailwind('bg-blue-500 px-5 py-3 rounded-full')}>
        <Text style={tailwind('text-white font-semibold text-lg')}>
          Hello Tailwind TEST👋
        </Text>
      </View>
    </SafeAreaView>
  );
}
