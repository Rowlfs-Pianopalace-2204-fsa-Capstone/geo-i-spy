import React from 'react';
import tw from 'twrnc';

import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
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
