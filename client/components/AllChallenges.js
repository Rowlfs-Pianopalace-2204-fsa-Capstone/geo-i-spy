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
      hard: false,
      Medium: false,
      easy: false,
    });
  }, []);
  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            hard: !handleToggle.hard,
          }),
        ]}
      >
        {}
        <Text>Toggle Hard</Text>
      </TouchableOpacity>

      {handleToggle.hard ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'hard')
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            medium: !handleToggle.medium,
          }),
          console.log(handleToggle),
        ]}
      >
        {}
        <Text>Toggle Medium</Text>
      </TouchableOpacity>
      {handleToggle.medium ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'medium')
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={tw`border bg-blue-400 p-6`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            easy: !handleToggle.easy,
          }),
          console.log(handleToggle),
        ]}
      >
        {}
        <Text>Toggle easy</Text>
      </TouchableOpacity>
      {handleToggle.easy ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'easy')
      ) : (
        <></>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
