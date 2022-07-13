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
  SafeAreaView,
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
  return arr.map((ele) => {
    return (
      <View style={tw`pt-5 pb-5`} key={ele.challenge.id}>
        <Card>
          <TouchableOpacity onPress={() => [showPublicProfile(ele.id)]}>
            <Card.Title
              title={`${ele.challenge.name} challenge!`}
              left={() => (
                <Image
                  source={{ uri: ele.img }}
                  style={tw`h-12 w-12 pl-12 rounded-full`}
                />
              )}
            />
          </TouchableOpacity>
          <Card.Content>
            <TouchableOpacity
              onPress={() => [
                setSingleChallengeData(ele.challenge),
                navigation.navigate('SingleChallenge'),
              ]}
            >
              <Title></Title>
            </TouchableOpacity>
            <Paragraph>
              {ele.username} completed the {ele.challenge.name} challenge for a
              whooping {ele.challenge.score} points!
            </Paragraph>

            <TouchableOpacity
              onPress={() => [
                setImg(ele.challenge.Achievement.img_url),
                navigation.navigate('ViewPicture'),
              ]}
            >
              <Card.Cover
                source={{ uri: ele.challenge.Achievement.img_url }}
                style={tw`h-40`}
              />
              <Paragraph>
                {timeSince(new Date(ele.challenge.Achievement.createdAt))} ago
              </Paragraph>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
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

  useEffect(() => {
    const getFeed = async () => {
      setFeed(await apiGetFeed());
    };
    getFeed();
  }, []);
  useEffect(() => {}, [feed]);
  const showPublicProfile = async (id) => {
    setSingleUser(await apiSearchUser(id));
    navigation.navigate('PublicProfile');
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center shadow-lg`}>
      <ScrollView>
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
    </SafeAreaView>
  );
}
