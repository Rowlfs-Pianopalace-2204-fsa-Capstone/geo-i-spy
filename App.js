import { SafeAreaView, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import SignUp from './client/components/SignIn';
import SignIn from './client/components/SignIn';

export default function App() {
  const isSigned = true;
  return isSigned ? (
    <View>
      <SignUp></SignUp>
      <SignIn></SignIn>
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
