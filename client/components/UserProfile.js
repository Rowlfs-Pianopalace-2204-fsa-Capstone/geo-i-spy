/** @format */
import { Platform } from 'react-native';
import React from 'react';
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
const textStyle = `font-bold pb-2`;

import ImagePickerComponent from './ImagePicker';

const UserProfile = ({ navigation }) => {
  const { setIsSigned } = React.useContext(GlobalIsSignedContext);
  const {
    authData,
    singleUser,
    setChallengesData,
    setSingleChallengeData,
    setAuthData,
    setFollowData,
    setSingleUser,
    setFollowingData,
    setAchievements,
  } = React.useContext(GlobalDataContext);
  const user = authData;

  const showFollowing = () => {
    navigation.navigate('FollowingList');
  };
  const showFollowers = () => {
    navigation.navigate('FollowersList');
  };

  async function fetchDataFollowers(id) {
    const Followers = await apiGetAllFollowers(parseInt(id));
    await setFollowData(Followers);
    showFollowers();
  }

  async function fetchDataFollowing(id) {
    const Following = await apiGetAllFollowing(parseInt(id));
    await setFollowingData(Following);
    showFollowing();
  }

  const editPhoto = () => {
    navigation.navigate('ProfilePicture');
  };

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      window.localStorage.removeItem('token');
    } else {
      await SecureStore.deleteItemAsync('token');
    }

    setAuthData({});
    setIsSigned(false);
    setChallengesData([]),
      setSingleChallengeData({}),
      setFollowData([]),
      setSingleUser({});
    setFollowingData([]);
    setAchievements([]);
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
        <ImagePickerComponent />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`${textStyle}`}>ID: {user.id}</Text>
        <Text style={tw`${textStyle}`}>Name: {user.name}</Text>
        <Text style={tw`${textStyle}`}>Username: {user.username}</Text>
        <Text style={tw`${textStyle}`}>E-mail: {user.email}</Text>
        <Text style={tw`${textStyle}`}>Score: {user.score}</Text>
      </View>

      <View style={tw`flex-1 items-center`}>
        <TouchableOpacity onPress={() => fetchDataFollowing(user.id)}>
          <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              View following
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchDataFollowers(user.id)}>
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
