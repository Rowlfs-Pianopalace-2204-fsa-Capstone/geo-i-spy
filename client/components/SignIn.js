import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';

const backgroundImage = { uri: './public/Bridge.jpeg' };

import tw from 'twrnc';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg';

export default function SignIn() {
  return (
    <ImageBackground
      source={backgroundImage}
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
        </View>
        {/* </ScrollView> */}
      </View>
    </ImageBackground>
  );
}
