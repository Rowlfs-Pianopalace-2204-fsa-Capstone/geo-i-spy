/** @format */

import React, { useEffect, useState } from 'react';
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
import { apiGetAllFollowing } from '../Thunks/followers';

export default function FollowingList({ navigation }) {
  const { setSingleUser } = React.useContext(GlobalDataContext);
  const { followData } = React.useContext(GlobalDataContext);
  const [following, setFollowing] = useState([]);
  const showPublicProfile = (user) => {
    navigation.navigate('PublicProfile');
    setSingleUser(user);
  };
  useEffect(() => {
    console.log(followData);
    setFollowing(followData);
  }, [followData]);
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
        {following ? (
          following.map((friend) => {
            return (
              <View key={friend.id} style={tw`pb-10  border-2 mb-10`}>
                <TouchableOpacity
                  onPress={() => showPublicProfile(friend)}
                  style={tw`h-30 w-30`}
                >
                  <Image
                    style={tw`h-30 w-30`}
                    source={{ uri: friend.img_url }}
                  />
                </TouchableOpacity>
                <Text>{friend.username}</Text>
                {/* <Text>Username: {friend.username}</Text> */}
                <Text>Score:{friend.score}</Text>
                {/* <Text>Email: {friend.email}</Text> */}
                {/* <Text>About: {friend.biography}</Text> */}
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
}
