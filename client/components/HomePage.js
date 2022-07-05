/** @format */

import React from 'react';
import tw from 'twrnc';

import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import SingleChallenge from './SingleChallenge';
import { GlobalDataContext } from '../../App';
export default function HomePage({ navigation }) {
  const { challengesData } = React.useContext(GlobalDataContext);

  //This is a placeholder for until we decide a way to set the weekly challenges
  const weeklyChallenge = challengesData[0];
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`border-2 border-gray-500 p-25`}>
        <Text>
          This weeks challenge is to take a picture of a: {weeklyChallenge.name}
          !
        </Text>
        <Text>Rarity: {weeklyChallenge.difficulty}</Text>
        <Text>Score: {weeklyChallenge.score}</Text>
        <Text>Description: {weeklyChallenge.description}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              Complete Challenge👋
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
