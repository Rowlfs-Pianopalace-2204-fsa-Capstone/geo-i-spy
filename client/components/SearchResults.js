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

export const mapArray = (arr, navigation, showPublicProfile) => {
  return arr.map((ele) => {
    const LeftContent = () => (
      <Image source={{ uri: ele.img_url }} style={tw`h-16 w-16 pl-16`}></Image>
    );
    const RightContent = () => <Text style={tw`mt-4 mr-4`}>FOLLOW</Text>;
    return (
      <Card key={ele.id} resizeMode={'contain'}>
        <TouchableOpacity onPress={() => [showPublicProfile(ele.id)]}>
          <Card.Title
            title=''
            left={LeftContent}
            right={RightContent}
            style={tw`h-20`}
          />
          <Paragraph style={tw`mb-4 ml-4`}>{ele.username}</Paragraph>
        </TouchableOpacity>
      </Card>
    );
  });
};

export default function SearchResults({ navigation }) {
  const { feed, setFeed, setSingleUser, search } =
    React.useContext(GlobalDataContext);

  useEffect(() => {
    console.log(search);
  }, [search]);
  const showPublicProfile = async (id) => {
    setSingleUser(await apiSearchUser(id));
    navigation.navigate('PublicProfile');
  };

  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      {search[0] ? (
        mapArray(search, navigation, showPublicProfile)
      ) : (
        <Text style={tw`h-20`}>LOADING</Text>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
