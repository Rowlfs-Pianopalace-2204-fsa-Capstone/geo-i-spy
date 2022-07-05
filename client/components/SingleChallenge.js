/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import tw from 'twrnc';

const dummyData = {
  id: '1',
  name: 'Beverage can',
  difficulty: '1',
  score: '10',
  officialLocation: false,
  description: 'Test description',
};

export default function SingleChallenge() {
  return (
    <View style={tw`border-2 border-gray-500 p-25`}>
      <Text>Todays challenge is to take a photo of a:</Text>
      <Text>{dummyData.name}!</Text>
      <Text>Rarity: {dummyData.difficulty}</Text>
      <Text>Score: {dummyData.score}</Text>
      <Text>Description: {dummyData.description}</Text>
      <Text>Complete Challenge</Text>
      <Pressable></Pressable>
    </View>
  );
}
