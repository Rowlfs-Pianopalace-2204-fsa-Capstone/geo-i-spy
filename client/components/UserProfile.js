/** @format */

import React, { useEffect } from 'react';
import tw from 'twrnc';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalIsSignedContext } from '../Context';
import { GlobalDataContext } from '../Context';
import * as SecureStore from 'expo-secure-store';
import { apiGetAllFollowers, apiGetAllFollowing } from '../Thunks/followers';
const dummyData = {
  id: 1,
  name: 'Johnny Cash',
  username: 'Coder21',
  email: 'mail@gmail.com',
  img_url:
    'https://arielle.com.au/wp-content/uploads/2018/01/ai-robot-job-search-1024x576.jpg',
  score: 200,
};
const textStyle = `font-bold pb-2`;

const UserProfile = ({ navigation }) => {
  const { setIsSigned } = React.useContext(GlobalIsSignedContext);
  const { authData, setAuthData, singleUser, setFollowData, setFollowingData } =
    React.useContext(GlobalDataContext);
  const user = authData;

  const showFollowing = () => {
    navigation.navigate('FollowingList');
  };
  const showFollowers = () => {
    navigation.navigate('FollowersList');
  };

  const handleLogout = async () => {
    const logout = await SecureStore.deleteItemAsync('token');

    if (logout === undefined) {
      setAuthData({});
      setIsSigned(false);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 mt-12 px-6`}>
      <View style={tw`flex-1 items-center`}>
        <Image
          source={{
            uri: user.img_url,
          }}
          style={tw`h-40 w-40 rounded-full mb-6`}
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`${textStyle}`}>ID: {user.id}</Text>
        <Text style={tw`${textStyle}`}>Name: {user.name}</Text>
        <Text style={tw`${textStyle}`}>Username: {user.username}</Text>
        <Text style={tw`${textStyle}`}>E-mail: {user.email}</Text>
        <Text style={tw`${textStyle}`}>Score: {user.score}</Text>
      </View>

      <View style={tw`flex-1 items-center`}>
        <TouchableOpacity onPress={() => showFollowing()}>
          <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              View following
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showFollowers()}>
          <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              View followers
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              Sign Out!👋
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
