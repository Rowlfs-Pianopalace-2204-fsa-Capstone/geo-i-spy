import React from 'react';
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

const buttonStyle = 'rounded-lg mx-12 justify-center items-center p-2';
const textStyle = 'pb-2 font-bold';
const dummyData = {
  id: 1,
  name: 'Bill',
  username: 'Billy101',
  score: 100,
  img_url:
    'https://gazettereview.com/wp-content/uploads/2016/10/cyrus-2.jpg.webp',
  biography: 'Musician',
  email: 'Billy@gmail.com',
};
const dummyDataFollow = false;

export default function FriendProfile() {
  const followsYou = true;
  const [isFollowing, setIsFollowing] = useState(dummyDataFollow);
  const friendData = dummyData;
  const follow = () => {
    setIsFollowing(true);
  };
  const unfollow = () => {
    setIsFollowing(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 px-6 mt-2`}>
      <View style={tw`flex-1 items-center pb-26`}>
        <Text style={tw`font-bold text-4xl`}>{friendData.name}</Text>
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
        {isFollowing ? (
          <TouchableOpacity
            onPress={() => unfollow()}
            style={tw`${buttonStyle} bg-red-400`}
          >
            <Text>Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => follow()}
            style={tw`${buttonStyle} bg-blue-400`}
          >
            <Text>Follow!</Text>
          </TouchableOpacity>
        )}
        {followsYou ? (
          <Text>This user is following you</Text>
        ) : (
          <Text>This user isn't following you</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
