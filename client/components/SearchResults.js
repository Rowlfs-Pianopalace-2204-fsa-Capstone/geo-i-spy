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
import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
import {
  apiSearchUser,
  apiStartFollowing,
  apiStopFollowing,
} from '../Thunks/followers';

import { Card, Title, Paragraph } from 'react-native-paper';

export const mapArray = (
  arr,
  navigation,
  showPublicProfile,
  followingData,
  setFollowingData
) => {
  return arr.map((ele) => {
    const alreadyFollowing = followingData.filter((e) => e.id === ele.id);

    //Checks to see if user is already following

    if (alreadyFollowing[0]) {
      ele.isFollowing = true;
    }
    // Follow function

    const handleFollow = async (singleUser) => {
      if (ele.isFollowing) {
        await apiStopFollowing(singleUser.id);
        ele.isFollowing = false;
        const newList = followingData.filter(
          (ele) => parseInt(ele.id) !== parseInt(singleUser.id)
        );
        console.log(newList);
        setFollowingData(newList);
      } else {
        await apiStartFollowing(singleUser.id);
        setFollowingData([...followingData, singleUser]);
      }
    };
    //FOLLOW BUTTON STYLE

    const buttonStyle = 'rounded-lg mx-12 justify-center items-center p-2';

    //PICTURE

    const LeftContent = () => (
      <Image source={{ uri: ele.img_url }} style={tw`h-16 w-16 pl-16`}></Image>
    );

    // FOLLOW BUTTON

    const RightContent = () => {
      if (ele.isFollowing) {
        return (
          <TouchableOpacity
            onPress={() => handleFollow(ele)}
            style={tw`${buttonStyle} bg-red-400`}
          >
            <Text>Unfollow</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => handleFollow(ele)}
            style={tw`${buttonStyle} bg-blue-400`}
          >
            <Text>Follow!</Text>
          </TouchableOpacity>
        );
      }
    };

    //CARD BOXES

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
  const { setSingleUser, search, followingData, setFollowingData } =
    React.useContext(GlobalDataContext);

  useEffect(() => {}, [followingData]);
  const showPublicProfile = async (id) => {
    const user = await apiSearchUser(id);
    setSingleUser(user[0]);
    navigation.navigate('PublicProfile');
  };

  return (
    <ScrollView>
      {search[0] ? (
        mapArray(
          search,
          navigation,
          showPublicProfile,
          followingData,
          setFollowingData
        )
      ) : (
        <Text style={tw`h-20`}>LOADING</Text>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
