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

import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
export const mapArray = (
  arr,
  navigation,
  setSingleChallengeData,
  difficulty
) => {
  return arr.map((ele) => {
    let diffColor = 'white';

    let completed = null;
    if (ele.difficulty === 'Rare') {
      diffColor = 'red';
    } else if (ele.difficulty === 'Uncommon') {
      diffColor = 'orange';
    } else if (ele.difficulty === 'Common') {
      diffColor = 'green';
    }
    if (ele.users) {
      diffColor = 'blue';
      completed = <Text style={tw`font-bold`}> Completed!</Text>;
    }
    if (difficulty === ele.difficulty) {
      return (
        <TouchableOpacity
          onPress={() => [
            setSingleChallengeData(ele),
            navigation.navigate('SingleChallenge'),
          ]}
          key={ele.id}
          style={tw`border bg-${diffColor}-300 rounded-lg p-6 ml-2 flex-1 flex-col items-center`}
        >
          <Text style={tw`flex-1 items-center font-bold`}>
            <Text>Challenge:</Text>
            <Text>{ele.name}</Text>
          </Text>
          <Text style={tw`font-bold`}>
            <Text>Difficulty:</Text>
            <Text>{ele.difficulty}</Text>
          </Text>
          <Text style={tw`font-bold`}>
            <Text> Score: </Text>
            <Text>{ele.score}</Text>
          </Text>
          {completed}
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
  const [CommonColor, setCommonColor] = useState('white');
  const [RareColor, setRareColor] = useState('white');
  const [UncommonColor, setUncommonColor] = useState('white');
  const { achievements, setSingleChallengeData } =
    React.useContext(GlobalDataContext);
  useEffect(() => {
    setHandleToggle({
      rare: false,
      uncommon: false,
      common: false,
    });
    setIsButtonPressedCommon(false);
    setIsButtonPressedRare(false);
    setIsButtonPressedUncommo(false);
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
            isButtonPressedCommon ? 'green-300' : 'white'
          }`}
          onPress={() => [
            handleTextCommon(),
            setHandleToggle({
              ...handleToggle,
              Common: !handleToggle.Common,
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
            isButtonPressedUncommo ? 'orange-300' : 'white'
          }`}
          onPress={() => [
            handleTextUncommo(),
            setHandleToggle({
              ...handleToggle,
              Uncommon: !handleToggle.Uncommon,
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
            isButtonPressedRare ? 'red-300' : 'white'
          }`}
          onPress={() => [
            handleTextRare(),
            setHandleToggle({
              ...handleToggle,
              Rare: !handleToggle.Rare,
            }),
          ]}
        >
          {}
          <View>
            <Text>Rare</Text>
          </View>
        </TouchableOpacity>
      </View>
      {handleToggle.Common ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'Common')
      ) : (
        <></>
      )}
      {handleToggle.Uncommon ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'Uncommon')
      ) : (
        <></>
      )}
      {handleToggle.Rare ? (
        mapArray(achievements, navigation, setSingleChallengeData, 'Rare')
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
