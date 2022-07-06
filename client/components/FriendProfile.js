import React from 'react';
import tw from 'twrnc';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GlobalDataContext } from '../Context';

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

export default function FriendProfile() {
  //--
  const friendData = dummyData;

  return (
    <SafeAreaView style={tw`flex-1 p-6 mt-6`}>
      <View style={tw`flex-1 items-center pb-22`}>
        <Text style={tw`font-bold text-4xl`}>{friendData.name}</Text>
        <Image
          source={{ uri: friendData.img_url }}
          style={tw`h-50 w-50 rounded-full`}
        ></Image>
      </View>
      <View style={tw`flex-2 p-2`}>
        <Text style={tw`${textStyle}`}>Username: {friendData.username}</Text>
        <Text style={tw`${textStyle}`}>Score:{friendData.score}</Text>
        <Text style={tw`${textStyle}`}>Email: {friendData.email}</Text>
        <Text style={tw`${textStyle}`}>About: {friendData.biography}</Text>
      </View>
    </SafeAreaView>
  );
}
