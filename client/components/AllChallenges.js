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
export const mapArray = (
  arr,
  navigation,
  setSingleChallengeData,
  difficulty
) => {
  return arr.map((ele) => {
    let color = 'blue';
    if (ele.users) {
      color = 'green';
    } else {
      color = 'blue';
    }
    if (difficulty === ele.difficulty) {
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
    }
  });
};

export default function AllChallenges({ navigation }) {
  const [handleToggle, setHandleToggle] = useState({});
  const { achievements, setSingleChallengeData } =
    React.useContext(GlobalDataContext);
  useEffect(() => {
    setHandleToggle({
      rare: false,
      uncommon: false,
      common: false,
    });
  }, []);
  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            rare: !handleToggle.rare,
          }),
        ]}
      >
        {}
        <Text>Toggle Rare</Text>
      </TouchableOpacity>

      {handleToggle.rare ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'rare')
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            uncommon: !handleToggle.uncommon,
          }),
          console.log(handleToggle),
        ]}
      >
        {}
        <Text>Toggle Uncommon</Text>
      </TouchableOpacity>
      {handleToggle.uncommon ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'uncommon')
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            common: !handleToggle.common,
          }),
          console.log(handleToggle),
        ]}
      >
        {}
        <Text>Toggle Common</Text>
      </TouchableOpacity>
      {handleToggle.common ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'common')
      ) : (
        <></>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
