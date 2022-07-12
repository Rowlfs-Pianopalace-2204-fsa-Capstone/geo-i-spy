/** @format */

import React, { useEffect, useState } from 'react';
import tw from 'twrnc';

import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import SingleChallenge from './SingleChallenge';
import { GlobalDataContext } from '../Context';
export default function HomePage({ navigation }) {
  const { achievements, setSingleChallengeData } =
    React.useContext(GlobalDataContext);

  const [weeklyChallenge, setWeeklyChallenge] = useState({});
  useEffect(() => {
    for (let i = 0; i < achievements.length; i++) {
      if (achievements[i].weeklyChallenge === true) {
        setWeeklyChallenge(achievements[i]);
        setSingleChallengeData(achievements[i]);
      }
    }
  }, [achievements]);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center shadow-lg`}>
      <View style={tw`border-2 border-gray-500 p-25`}>
        <Text>
          This weeks challenge is to take a picture of a: {weeklyChallenge.name}
          !
        </Text>
        <Text>Rarity: {weeklyChallenge.difficulty}</Text>
        <Text>Score: {weeklyChallenge.score}</Text>
        <Text>Description: {weeklyChallenge.description}</Text>
        <TouchableOpacity onPress={() => [navigation.navigate('Camera')]}>
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
