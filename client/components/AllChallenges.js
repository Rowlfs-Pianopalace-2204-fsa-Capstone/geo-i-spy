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
export const mapArray = (arr, navigation) => {
  return arr.map((ele) => {
    const { setSingleChallengeData } = React.useContext(GlobalDataContext);
    let color = 'blue';
    if (ele.users) {
      color = 'green';
    } else {
      color = 'blue';
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
  const { achievements } = React.useContext(GlobalDataContext);
  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      {mapArray(achievements, navigation)}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
