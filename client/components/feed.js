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

export const mapArray = (
  arr,
  navigation,
  showPublicProfile,
  setImg,
  setSingleChallengeData
) => {
  let user;
  return arr.map((ele) => {
    const LeftContent = () => (
      <Image source={{ uri: ele.img }} style={tw`h-12 w-12 pl-12`}></Image>
    );
    return (
      <Card key={ele.challenge.id} style={tw`mb-8`} resizeMode={'contain'}>
        <TouchableOpacity onPress={() => [showPublicProfile(ele.id)]}>
          <Card.Title title='' left={LeftContent} />
        </TouchableOpacity>
        <Card.Content>
          <TouchableOpacity
            onPress={() => [
              setSingleChallengeData(ele.challenge),
              navigation.navigate('SingleChallenge'),
            ]}
          >
            <Title>{ele.challenge.name} challenge!</Title>
          </TouchableOpacity>
          <Paragraph>
            {ele.username} completed the {ele.challenge.name} challenge for a
            whooping {ele.challenge.score} points!
          </Paragraph>
          <Paragraph>
            {timeSince(new Date(ele.challenge.Achievement.createdAt))} ago
          </Paragraph>
          <TouchableOpacity
            onPress={() => [
              setImg(ele.challenge.Achievement.img_url),
              navigation.navigate('ViewPicture'),
            ]}
          >
            <Card.Cover
              source={{ uri: ele.challenge.Achievement.img_url }}
              style={tw`h-vh`}
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
  });
};

export default function Feed({ navigation }) {
  const {
    feed,
    setFeed,
    setSingleUser,
    singleUser,
    setImg,
    setSingleChallengeData,
  } = React.useContext(GlobalDataContext);
  useEffect(async () => {
    setFeed(await apiGetFeed());
  }, []);
  useEffect(() => {}, [feed]);
  const showPublicProfile = async (id) => {
    setSingleUser(await apiSearchUser(id));
    navigation.navigate('PublicProfile');
  };
  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      {feed[0] ? (
        mapArray(
          feed,
          navigation,
          showPublicProfile,
          setImg,
          setSingleChallengeData
        )
      ) : (
        <></>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
