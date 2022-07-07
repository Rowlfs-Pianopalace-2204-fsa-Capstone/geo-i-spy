/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
const textStyle = `font-bold`;

import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
export const mapArray = (arr, navigation) => {
  return arr.map((ele) => {
    const { setSingleChallengeData } = React.useContext(GlobalDataContext);
    return (
      <TouchableOpacity
        onPress={() => [
          setSingleChallengeData(ele),
          navigation.navigate('SingleChallenge'),
        ]}
        key={ele.id}
        style={tw`border bg-blue-400 p-6`}
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
  return (
    <View style={tw`flex-1 pt-12 px-6`}>
      {mapArray(challengesData, navigation)}
    </View>
  );
}
