import React from 'react';
import tw from 'twrnc';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { GlobalDataContext } from '../Context';

const dummyData = [
  {
    id: 1,
    name: 'Bill',
    username: 'Billy101',
    score: 100,
    img_url:
      'https://gazettereview.com/wp-content/uploads/2016/10/cyrus-2.jpg.webp',
    biography: 'Musician',
    email: 'Billy@gmail.com',
  },
  {
    id: 2,
    name: 'Brandon',
    username: 'BFlowers',
    score: 120,
    img_url:
      'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-193943-467432500.jpg',
    biography: 'Astronaut',
    email: 'Killers@gmail.com',
  },
  {
    id: 3,
    name: 'David',
    username: 'DGrowl',
    score: 130,
    img_url:
      'https://i1.wp.com/genreisdead.com/wp-content/uploads/2020/02/davegrohl-e1581532554655.jpg?zoom=2&resize=800%2C445&ssl=1',
    biography: 'Actor, Pretender',
    email: 'David@gmail.com',
  },
];

export default function FollowingList({ navigation }) {
  const followingData = dummyData;
  const showPublicProfile = () => {
    navigation.navigate('PublicProfile');
  };
  return (
    <ScrollView style={tw`flex-1 pt-6 px-8`}>
      <View style={tw`flex-1 items-center`}>
        <Text style={tw`p-2 px-1 py-2 font-bold text-2xl`}>
          Your following!
        </Text>
        <TouchableOpacity>
          <View style={tw`bg-blue-400 rounded-lg m-2 items-center`}>
            <Text style={tw`font-bold m-4`}>Lookup profiles</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-5 border-2 `}>
        {followingData.map((friend) => {
          return (
            <View key={friend.id} style={tw`pb-10  border-2 mb-10`}>
              <TouchableOpacity
                onPress={() => showPublicProfile()}
                style={tw`h-30 w-30`}
              >
                <Image style={tw`h-30 w-30`} source={{ uri: friend.img_url }} />
              </TouchableOpacity>
              <Text>{friend.name}</Text>
              <Text>Username: {friend.username}</Text>
              <Text>Score:{friend.score}</Text>
              <Text>Email: {friend.email}</Text>
              <Text>About: {friend.biography}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
