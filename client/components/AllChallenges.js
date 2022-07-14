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
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      <View style={tw`flex-1 flex-row items-center`}>
        <TouchableOpacity
          style={tw`flex-1 border-2 items-center py-1`}
          onPress={() => [
            setHandleToggle({
              ...handleToggle,
              rare: !handleToggle.rare,
            }),
          ]}
        >
          {}
          <View>
            <Text>Rare</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 border-2 items-center py-1`}
          onPress={() => [
            setHandleToggle({
              ...handleToggle,
              uncommon: !handleToggle.uncommon,
            }),
          ]}
        >
          {}
          <View>
            <Text>Uncommon</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 border-2 items-center py-1`}
          onPress={() => [
            setHandleToggle({
              ...handleToggle,
              common: !handleToggle.common,
            }),
          ]}
        >
          {}
          <View>
            <Text>Common</Text>
          </View>
        </TouchableOpacity>
      </View>
      {handleToggle.uncommon ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'uncommon')
      ) : (
        <></>
      )}

      {handleToggle.common ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'common')
      ) : (
        <></>
      )}
      {handleToggle.rare ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'rare')
      ) : (
        <></>
      )}
      {/* <Text style={tw`h-200`}></Text> */}
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
