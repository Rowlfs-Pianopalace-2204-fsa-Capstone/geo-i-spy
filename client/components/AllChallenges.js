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
import CheckBox from '@react-native-community/checkbox';

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
    let diffColor = 'black';
    if (ele.difficulty === 'rare') {
      diffColor = 'red';
    } else if (ele.difficulty === 'uncommon') {
      diffColor = 'orange';
    } else if (ele.difficulty === 'common') {
      diffColor = 'green';
    }
    if (difficulty === ele.difficulty) {
      return (
        <TouchableOpacity
          onPress={() => [
            setSingleChallengeData(ele),
            navigation.navigate('SingleChallenge'),
          ]}
          key={ele.id}
          style={tw`border bg-${color}-400 rounded-lg p-6 ml-2 flex-1 flex-col items-center`}
        >
          <Text style={tw`flex-1 items-center font-bold`}>
            <Text>Challenge:</Text>
            <Text>{ele.name}</Text>
          </Text>
          <Text style={tw`font-bold`}>
            <Text>Difficulty:</Text>
            <Text style={tw`text-${diffColor}-400`}>{ele.difficulty}</Text>
          </Text>
          <Text style={tw`font-bold`}>
            <Text> Score: </Text>
            <Text>{ele.score}</Text>
          </Text>
        </TouchableOpacity>
      );
    }
  });
};

export default function AllChallenges({ navigation }) {
  const [handleToggle, setHandleToggle] = useState({});
  const [isButtonPressedCommon, setIsButtonPressedCommon] = useState(false);
  const [isButtonPressedRare, setIsButtonPressedRare] = useState(false);
  const [isButtonPressedUncommo, setIsButtonPressedUncommo] = useState(false);
  const { achievements, setSingleChallengeData } =
    React.useContext(GlobalDataContext);
  useEffect(() => {
    setHandleToggle({
      rare: false,
      uncommon: false,
      common: false,
    });
  }, [achievements]);

  const handleTextCommon = () => {
    setIsButtonPressedCommon((current) => !current);
  };

  const handleTextRare = () => {
    setIsButtonPressedRare((current) => !current);
  };

  const handleTextUncommo = () => {
    setIsButtonPressedUncommo((current) => !current);
  };

  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      <View style={tw`flex-1 flex-row items-center`}>
        <TouchableOpacity
          style={tw`flex-1 border-2 rounded-md items-center py-2 bg-${
            isButtonPressedCommon ? 'blue-400' : ''
          }`}
          onPress={() => [
            handleTextCommon(),
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

        <TouchableOpacity
          style={tw`flex-1 border-2 rounded-md items-center m-1 py-2 bg-${
            isButtonPressedUncommo ? 'blue-400' : ''
          }`}
          onPress={() => [
            handleTextUncommo(),
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
          style={tw`flex-1 border-2 rounded-md items-center py-2  bg-${
            isButtonPressedRare ? 'blue-400' : ''
          }`}
          onPress={() => [
            handleTextRare(),
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
  color: {
    color: 'blue',
  },
  color2: {
    color: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
