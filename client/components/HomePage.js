import React from 'react';
import tw from 'twrnc';

import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import SingleChallenge from './SingleChallenge';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View>
        <SingleChallenge style={tw`border-2 border-gray-500 p-25 m-25`} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
          <Text style={tw`text-white font-semibold text-lg`}>
            Camera test👋
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
