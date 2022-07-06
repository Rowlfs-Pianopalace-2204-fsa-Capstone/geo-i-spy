/** @format */

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
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
        style={tw`border bg-blue-800`}
      >
        <Text>{ele.name}</Text>
        <Text>{ele.difficulty}</Text>
        <Text>{ele.score}</Text>
      </TouchableOpacity>
    );
  });
};

export default function AllChallenges({ navigation }) {
  const { challengesData } = React.useContext(GlobalDataContext);
  return <View>{mapArray(challengesData, navigation)}</View>;
}
