/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
const textStyle = `font-bold`;

import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
export const mapArray = (arr, navigation, achievements) => {
  let color = 'blue';
  return arr.map((ele) => {
    const { setSingleChallengeData } = React.useContext(GlobalDataContext);
    if (achievements[0]) {
      console.log(ele.id);
      const achieved = achievements.filter(
        (e) => e.challengeId === ele.id || e.id === ele.id
      );
      //For now we're changing the color of challenges of the ones you've completed, this method should change once we implement sorting/filtering.
      if (achieved[0]) {
        color = 'green';
      } else {
        color = 'blue';
      }
    }
    return (
      <TouchableOpacity
        onPress={() => [
          setSingleChallengeData(ele),
          navigation.navigate('SingleChallenge'),
        ]}
        key={ele.id}
        style={tw`border bg-${color}-400 p-6`}
      >
        <Text style={tw`${textStyle}`}>{ele.name}</Text>
        <Text style={tw`${textStyle}`}>{ele.difficulty}</Text>
        <Text style={tw`${textStyle}`}>{ele.score}</Text>
      </TouchableOpacity>
    );
  });
};

export default function AllChallenges({ navigation }) {
  const { challengesData } = React.useContext(GlobalDataContext);
  const { achievements } = React.useContext(GlobalDataContext);
  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      {mapArray(challengesData, navigation, achievements)}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
