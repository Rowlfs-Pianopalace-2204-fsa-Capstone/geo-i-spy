import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import SignUp from './client/components/SignUp';
import SignIn from './client/components/SignIn';
import HomePage from './client/components/HomePage';
import tw from 'twrnc';

import CameraComponent from './client/components/CameraComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const isSigned = false;
  return isSigned ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage} />
        <Stack.Screen
          name='Camera'
          component={CameraComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
