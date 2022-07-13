/** @format */

/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
const textStyle = `font-bold`;
// import DownArrow from './arrowAnimations/DownArrow';
// import UpArrow from './arrowAnimations/UpArrow';
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
          style={tw`border bg-${color}-400 p-6 ml-2`}
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
  }, [achievements]);
  return (
    <ScrollView style={styles.filter}>
      <TouchableOpacity
        style={tw`border bg-blue-500 p-6 rounded-tl-lg rounded-tr-lg rounded-bl-lg`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            rare: !handleToggle.rare,
          }),
        ]}
      >
        {}
        <View style={tw`flex-row`}>
          <Text style={tw`flex-5`}>Toggle Rare</Text>
          {/* {handleToggle.rare ? (
            <UpArrow style={tw`flex-1`} />
          ) : (
            <DownArrow style={tw`flex-1`} />
          )} */}
        </View>
      </TouchableOpacity>

      {handleToggle.rare ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'rare')
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={tw`border bg-blue-500 p-6 rounded-tl-lg rounded-tr-lg rounded-bl-lg`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            uncommon: !handleToggle.uncommon,
          }),
        ]}
      >
        {}
        <View style={tw`flex-row`}>
          <Text style={tw`flex-5`}>Toggle Uncommon</Text>
          {/* {handleToggle.uncommon ? (
            <UpArrow style={tw`flex-1`} />
          ) : (
            <DownArrow style={tw`flex-1`} />
          )} */}
        </View>
      </TouchableOpacity>
      {handleToggle.uncommon ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'uncommon')
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={tw`border bg-blue-500 p-6 rounded-tl-lg rounded-tr-lg rounded-bl-lg`}
        onPress={() => [
          setHandleToggle({
            ...handleToggle,
            common: !handleToggle.common,
          }),
        ]}
      >
        {}
        <View style={tw`flex-row`}>
          <Text style={tw`flex-5`}>Toggle Common</Text>
          {/* {handleToggle.common ? (
            <UpArrow style={tw`flex-1`} />
          ) : (
            <DownArrow style={tw`flex-1`} />
          )} */}
        </View>
      </TouchableOpacity>
      {handleToggle.common ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'common')
      ) : (
        <></>
      )}
      <Text style={tw`h-200`}></Text>
    </ScrollView>
  );
}
tw`flex-1 pt-12 px-6`;

const styles = StyleSheet.create({
  filter: {
    position: 'sticky',
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 32,
  },
});
