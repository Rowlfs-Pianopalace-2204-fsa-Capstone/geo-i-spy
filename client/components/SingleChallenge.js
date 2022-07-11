/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { GlobalDataContext } from '../Context';

export default function SingleChallenge({ navigation }) {
  const { SingleChallengeData } = React.useContext(GlobalDataContext);
  const image = SingleChallengeData.users[0].Achievement.img_url;
  return (
    <View style={tw`border-2 border-gray-500 p-25`}>
      {SingleChallengeData.users ? (
        <Image source={{ uri: image }} style={tw`h-50 w-50`}></Image>
      ) : (
        <Text>
          This challenge is to take a picture of a {SingleChallengeData.name}!
        </Text>
      )}
      <Text>Rarity: {SingleChallengeData.difficulty}</Text>
      <Text>Score: {SingleChallengeData.score}</Text>
      <Text>Description: {SingleChallengeData.description}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
          {SingleChallengeData.users ? (
            <Text style={tw`text-white font-semibold text-lg`}>
              Retake Photo!👋
            </Text>
          ) : (
            <Text style={tw`text-white font-semibold text-lg`}>
              Complete Challenge👋
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
