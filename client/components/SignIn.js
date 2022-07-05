/** @format */

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import tw from 'twrnc';
import toast from '../helpers/toast';

const buttonStyle =
  'm-1 p-2 bg-blue-400 rounded-lg items-center mr-20 ml-20 shadow-lg';

export default function SignIn({ signIn }) {
  return (
    <ImageBackground
      source={require(`../../public/Bridge.jpeg`)}
      resizeMode='cover'
      style={tw`flex-1 justify-center`}
    >
      <View style={tw`flex-1 my-20 pl-6 pr-6`}>
        <ScrollView>
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
              <TouchableOpacity
                style={tw`${buttonStyle}`}
                onPress={() => {
                  signIn();
                }}
              >
                <Text style={tw`font-bold`}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`${buttonStyle}`}>
                <Text style={tw`font-bold`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
