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
      'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/full/public/2017/01/13/robot.jpg',
    biography: 'Musician',
    email: 'Billy@gmail.com',
  },
  {
    id: 2,
    name: 'Brandon',
    username: 'BFlowers',
    score: 120,
    img_url:
      'https://www.dailypioneer.com/uploads/2018/story/images/big/ai-robots-can-develop-prejudice-on-their-own-2018-09-17.jpg',
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

export default function FollowersList({ navigation }) {
  const { setSingleUser } = React.useContext(GlobalDataContext);
  const followingData = dummyData;
  const showPublicProfile = (user) => {
    navigation.navigate('PublicProfile');
    setSingleUser(user);
  };
  return (
    <ScrollView style={tw`flex-1 pt-6 px-8`}>
      <View style={tw`flex-1 items-center`}>
        <Text style={tw`p-2 px-1 py-2 font-bold text-2xl`}>
          Your loyal followers!
        </Text>
        <TouchableOpacity>
          <View style={tw`bg-blue-400 rounded-lg m-2 items-center`}>
            <Text style={tw`font-bold m-4`}>Lookup profiles</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-5 border-2 `}>
        {followingData.map((follower) => {
          return (
            <View key={follower.id} style={tw`pb-10  border-2 mb-10`}>
              <TouchableOpacity
                onPress={() => showPublicProfile(follower)}
                style={tw`h-30 w-30`}
              >
                <Image
                  style={tw`h-30 w-30`}
                  source={{ uri: follower.img_url }}
                />
              </TouchableOpacity>
              <Text>{follower.name}</Text>
              {/* <Text>Username: {follower.username}</Text> */}
              {/* <Text>Score:{follower.score}</Text> */}
              {/* <Text>Email: {follower.email}</Text> */}
              {/* <Text>About: {follower.biography}</Text> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
