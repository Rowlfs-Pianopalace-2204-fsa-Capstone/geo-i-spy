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
import tw from 'twrnc';

import CameraComponent from './client/components/CameraComponent';

export default function App() {
  const isSigned = false;
  return isSigned ? (
    <ImageBackground
      source={require(`./public/Bridge.jpeg`)}
      resizeMode='cover'
      style={tw`flex-1 justify-center`}
    >
      <View style={tw`flex-1 my-20 pl-6 pr-6`}>
        {/* <ScrollView> */}
        <View style={tw`flex-3 justify-center text-center`}>
          <Text style={tw`font-bold text-4xl bg-gray-100/40 `}>
            {' '}
            Welcome to
          </Text>
          <Text style={tw`font-bold text-4xl bg-gray-100/40`}>Geo-I-Spy</Text>
        </View>
        <View style={tw`flex-1`}>
          <SignIn></SignIn>
          <SignUp></SignUp>
        </View>
        {/* </ScrollView> */}
      </View>
    </ImageBackground>
  ) : (
    // <SafeAreaView style={tw`flex-1 items-center justify-center`}>
    //   {/* <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
    //     <Text style={tw`text-white font-semibold text-lg`}>Camera test👋</Text>
    //   </View> */}

    // </SafeAreaView>
    <CameraComponent />
  );
}
