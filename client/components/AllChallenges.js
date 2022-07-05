/** @format */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { GlobalDataContext } from "../../App";
// const dummyData = [
//   {
//     id: "1",
//     name: foot,
//     difficulty: "1",
//     score: "10",
//     officialLocation: false,
//     description: "Test description",
//   },
//   {
//     id: "2",
//     name: "mouse",
//     difficulty: "2",
//     score: "1",
//     officialLocation: false,
//     description: "Test description",
//   },
//   {
//     id: "3",
//     name: "can",
//     difficulty: "3",
//     score: "1",
//     officialLocation: false,
//     description: "Test description",
//   },
// ];

export const mapArray = (arr) => {
  return arr.map((ele) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera")}
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

export default function AllChallenges() {
  const { challengesData } = React.useContext(GlobalDataContext);
  return <View>{mapArray(challengesData)}</View>;
}
