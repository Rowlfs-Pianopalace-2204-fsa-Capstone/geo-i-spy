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
import {
  apiGetFeed,
  apiSearchUser,
  apiStartFollowing,
  apiStopFollowing,
} from '../Thunks/followers';
import { timeSince } from '../helpers/time';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export const mapArray = (
  arr,
  navigation,
  showPublicProfile,
  handleFollow,
  isFollowing
) => {
  return arr.map((ele) => {
    const LeftContent = () => (
      <Image source={{ uri: ele.img_url }} style={tw`h-16 w-16 pl-16`}></Image>
    );
    const buttonStyle = 'rounded-lg mx-12 justify-center items-center p-2';

    // const RightContent = async () => {
    //   // if (isFollowing) {
    //   //   return (
    //   //     <TouchableOpacity
    //   //       onPress={() => handleFollow()}
    //   //       style={tw`${buttonStyle} bg-red-400`}
    //   //     >
    //   //       <Text>Unfollow</Text>
    //   //     </TouchableOpacity>
    //   //   );
    //   // } else {
    //   //   return (
    //   //     <TouchableOpacity
    //   //       onPress={() => handleFollow()}
    //   //       style={tw`${buttonStyle} bg-blue-400`}
    //   //     >
    //   //       <Text>Follow!</Text>
    //   //     </TouchableOpacity>
    //   //   );
    //   // }
    //   <Text>PLACEHOLDER</Text>;
    // };
    return (
      <Card key={ele.id} resizeMode={'contain'}>
        <TouchableOpacity onPress={() => [showPublicProfile(ele.id)]}>
          <Card.Title title='' left={LeftContent} style={tw`h-20`} />
          <Paragraph style={tw`mb-4 ml-4`}>{ele.username}</Paragraph>
        </TouchableOpacity>
      </Card>
    );
  });
};

export default function SearchResults({ navigation }) {
  const {
    feed,
    setFeed,
    setSingleUser,
    search,
    followData,
    followingData,
    setFollowingData,
  } = React.useContext(GlobalDataContext);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    console.log(search);
  }, [search]);
  const showPublicProfile = async (id) => {
    const user = await apiSearchUser(id);
    setSingleUser(user[0]);
    navigation.navigate('PublicProfile');
  };

  const handleFollow = async (singleUser) => {
    if (isFollowing) {
      await apiStopFollowing(singleUser.id);
      setFollowingData(
        followingData.filter((ele) => {
          ele.id !== singleUser.id;
        })
      );
      setIsFollowing(!isFollowing);
    } else {
      await apiStartFollowing(singleUser.id);
      setFollowingData([...followingData, singleUser]);
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <ScrollView style={tw`flex-1 pt-12 px-6`}>
      {search[0] ? (
        mapArray(
          search,
          navigation,
          showPublicProfile,
          handleFollow,
          isFollowing
        )
      ) : (
        <Text style={tw`h-20`}>LOADING</Text>
      )}
      <Text style={tw`h-20`}></Text>
    </ScrollView>
  );
}
