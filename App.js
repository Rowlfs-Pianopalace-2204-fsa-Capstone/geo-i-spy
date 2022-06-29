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
    <View style={styles.loggedOutBody}>
      <View style={styles.LogInImage}>
        <Text> default image</Text>
      </View>
      <View style={styles.bottomHalf}>
        <Text>Email:</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Password:</Text>
        <TextInput style={styles.input}></TextInput>
        <Pressable style={styles.loggingButtons}>
          <Text style={styles.buttonText}>Sign in!!</Text>
        </Pressable>
        <Pressable style={styles.loggingButtons}>
          <Text style={styles.buttonText}>Sign up!!</Text>
        </Pressable>
        <SignUp></SignUp>
        <SignIn></SignIn>
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

const styles = StyleSheet.create({
  loggedOutBody: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 80,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  loggingButtons: {
    marginTop: 5,
    color: 'blue',
    borderWidth: 1,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },
  LogInImage: {
    flex: 2,
  },
  bottomHalf: {
    flex: 1,
  },
  buttonText: {
    fontStyle: 'bold',
  },
});
