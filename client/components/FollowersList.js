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
      <View style={tw`flex-5`}>
        {followData.map((follower) => {
          return (
            <View
              key={follower.id}
              style={tw`pt-2 px-2  border-2 border-gray-300 mb-2 flex-1 flex-row`}
            >
              <TouchableOpacity
                onPress={() => showPublicProfile(follower)}
                style={tw`h-30 w-30 flex-row flex-1`}
              >
                <Image
                  style={tw`h-25 w-25 rounded-full `}
                  source={{ uri: follower.img_url }}
                />
                <View style={tw`pl-4 pt-2flex-1`}>
                  <Text style={tw`font-bold text-lg`}>{follower.username}</Text>
                  <Text style={tw`font-bold text-lg`}>
                    Score:{follower.score}
                  </Text>
                  <Text style={tw`font-bold text-gray-400`}>Name: Example</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
