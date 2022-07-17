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
  Image,
} from 'react-native';
const textStyle = `font-bold`;
import DownArrow from './arrowAnimations/DownArrow';
import UpArrow from './arrowAnimations/UpArrow';
import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
import { apiGetFeed, apiSearchUser } from '../Thunks/followers';
import { timeSince } from '../helpers/time';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ViewPicture({ navigation }) {
  const { img, singleUser } = React.useContext(GlobalDataContext);
  useEffect(() => {}, [img]);
  return (
    <Card style={tw`flex-1`}>
      <Card.Title title='' />

      <Card.Content style={tw`flex-1 p-[1%] items-center `}>
        {/* <Card.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}> */}
        <Card.Cover source={{ uri: img }} style={tw`w-90 h-90`} />
        {/* </ScrollView>
        </Card.ScrollArea> */}
      </Card.Content>
    </Card>
  );
}
