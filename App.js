import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import tailwind from 'tailwind-rn';
import SignUp from './client/components/SignUp';
import SignIn from './client/components/SignIn';

export default function App() {
  const isSigned = true;
  return isSigned ? (
    <View style={styles.loggedOut}>
      <Text>Email:</Text>
      <TextInput style={styles.input}></TextInput>
      <Text>Password:</Text>
      <TextInput style={styles.input}></TextInput>
      <Button style={styles.loggingButtons} title="Sign in"></Button>
      <Button style={styles.loggingButtons} title="Sign up"></Button>
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

const styles = StyleSheet.create({
  loggedOut: {
    marginTop: 80,
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  loggingButtons: {
    padding: 5,
    margin: 5,
    color: 'blue',
  },
});
