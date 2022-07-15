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
  TextInput,
} from 'react-native';
import { GlobalDataContext } from '../Context';
import { apiGetAllFollowers, apiSearchUser } from '../Thunks/followers';
export default function FollowersList({ navigation }) {
  const { setSingleUser } = React.useContext(GlobalDataContext);
  const { followData, setSearch, authData, setFollowData } =
    React.useContext(GlobalDataContext);
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
  useEffect(() => {
    apiGetAllFollowers(authData.id).then((result) => {
      setFollowData(result);
    });
  }, []);
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
        <TextInput
          value={searchedUser}
          onChangeText={setSearchedUser}
          style={tw`border border-gray-400 w-30`}
        ></TextInput>
        <View style={tw`flex-1 flex-row`}>
          <TouchableOpacity onPress={() => searchProfile(searchedUser)}>
            <View style={tw`flex-1 bg-blue-400 rounded-lg m-2 items-center`}>
              <Text style={tw`font-bold m-4`}>Search by user</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-5 border-2 `}>
        {followData.map((follower) => {
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
              <Text>{follower.username}</Text>
              {/* <Text>Username: {follower.username}</Text> */}
              <Text>Score:{follower.score}</Text>
              {/* <Text>Email: {follower.email}</Text> */}
              {/* <Text>About: {follower.biography}</Text> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
