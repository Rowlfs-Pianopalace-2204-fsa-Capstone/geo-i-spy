/** @format */

import React, { useEffect } from 'react';
import tw from 'twrnc';
import { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GlobalDataContext } from '../Context';
import {
  apiGetAllFollowing,
  apiStartFollowing,
  apiStopFollowing,
} from '../Thunks/followers';
import { apiCreateRoom } from '../Thunks/Rooms';

const buttonStyle = 'rounded-lg mx-12 justify-center items-center p-2';
const textStyle = 'pb-2 font-bold';

export default function FriendProfile({ navigation }) {
  const { singleUser, followData, followingData, setFollowingData, authData } =
    React.useContext(GlobalDataContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const friendData = singleUser;

  async function fetchDataFollowing(id) {
    const Following = await apiGetAllFollowing(parseInt(id));
    await setFollowingData(Following);
  }
  useEffect(() => {
    fetchDataFollowing(authData.id);
  }, []);

  useEffect(() => {
    const user = followData.filter((ele) => ele.id === singleUser.id);
    if (user[0]) {
      setIsFollower(true);
    }
  }, [isFollower]);

  useEffect(() => {
    const user = followingData.filter((ele) => ele.id === singleUser.id);
    if (user[0]) {
      setIsFollowing(true);
    }
  }, []);

  useEffect(() => {}, [singleUser]);

  const handleFollow = async () => {
    if (isFollowing) {
      await apiStopFollowing(singleUser.id);
      const newList = followingData.filter(
        (ele) => parseInt(ele.id) !== parseInt(singleUser.id)
      );
      setFollowingData(newList);
      setIsFollowing(!isFollowing);
    } else {
      await apiStartFollowing(singleUser.id);
      setFollowingData([...followingData, singleUser]);
      setIsFollowing(!isFollowing);
    }
  };
  const startMessage = async (id) => {
    console.log(id);
    await apiCreateRoom(id);
    navigation.navigate('Chat');
  };

  return (
    <SafeAreaView style={tw`flex-1 px-6 mt-2`}>
      <View style={tw`flex-1 items-center pb-26`}>
        <Text style={tw`font-bold text-4xl`}>{friendData.username}</Text>
        <Image
          source={{ uri: friendData.img_url }}
          style={tw`h-50 w-50 rounded-full`}
        ></Image>
      </View>
      <View style={tw`flex-2 p-2 border-2`}>
        <Text style={tw`${textStyle}`}>Username: {friendData.username}</Text>
        <Text style={tw`${textStyle}`}>Score:{friendData.score}</Text>
        <Text style={tw`${textStyle}`}>Email: {friendData.email}</Text>
        <Text style={tw`${textStyle}`}>About: {friendData.biography}</Text>
        <TouchableOpacity
          onPress={() => startMessage(friendData.id)}
          style={tw`${buttonStyle} bg-blue-400`}
        >
          <Text>Send Message</Text>
        </TouchableOpacity>
        {isFollowing ? (
          <TouchableOpacity
            onPress={() => handleFollow()}
            style={tw`${buttonStyle} bg-red-400`}
          >
            <Text>Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleFollow()}
            style={tw`${buttonStyle} bg-blue-400`}
          >
            <Text>Follow!</Text>
          </TouchableOpacity>
        )}
        {isFollower ? (
          <Text>This user is following you</Text>
        ) : (
          <Text>This user isn't following you</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
