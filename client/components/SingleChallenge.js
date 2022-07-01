/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import tw from 'twrnc';

const dummyData = {
  id: '1',
  name: 'Bridge',
  difficulty: '1',
  score: '10',
  officialLocation: false,
  description: 'Test description',
};

export default function SingleChallenge() {
  return (
    <View>
      <Text>{dummyData.name}</Text>
      <Text>{dummyData.difficulty}</Text>
      <Text>{dummyData.score}</Text>
      <Text>{dummyData.description}</Text>
      <Pressable>Complete Challenge</Pressable>
    </View>
  );
}
