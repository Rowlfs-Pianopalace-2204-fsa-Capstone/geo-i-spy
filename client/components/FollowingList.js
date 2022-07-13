/** @format */

import React, { useState } from 'react';
import tw from 'twrnc';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { GlobalDataContext } from '../Context';
import { apiSearchUser } from '../Thunks/followers';
export default function FollowingList({ navigation }) {
  const { setSingleUser } = React.useContext(GlobalDataContext);
  const { followingData, setSearch } = React.useContext(GlobalDataContext);
  const [searchedUser, setSearchedUser] = useState('');

  const searchProfile = async (searchId) => {
    if (searchId.length > 0) {
      apiSearchUser(searchId).then((result) => {
        setSearch(result);
        navigation.navigate('SearchResults');
      });
    } else {
      alert('Enter a username or ID');
    }
  };

  const showPublicProfile = (user) => {
    navigation.navigate('PublicProfile');
    setSingleUser(user);
  };
  return (
    <ScrollView style={tw`flex-1 pt-6 px-8`}>
      <View style={tw`flex-1 items-center`}>
        <Text style={tw`p-2 px-1 py-2 font-bold text-2xl`}>
          Your following!
        </Text>
        <TextInput
          value={searchedUser}
          onChangeText={setSearchedUser}
          style={tw`border border-gray-400 w-30`}
        ></TextInput>
        <View style={tw`flex-1 flex-row`}>
          <TouchableOpacity onPress={() => searchProfile(searchedUser)}>
            <View style={tw`flex-1 bg-blue-400 rounded-lg m-2 items-center`}>
              <Text style={tw`font-bold m-4`}>Search by users</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-5 border-2 `}>
        {followingData ? (
          followingData.map((friend) => {
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
