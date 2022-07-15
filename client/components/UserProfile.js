/** @format */
import { Platform } from 'react-native';
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
    followingData,
    followData,
  } = React.useContext(GlobalDataContext);
  const user = authData;

  const showFollowing = () => {
    navigation.navigate('FollowingList');
  };
  const showFollowers = () => {
    navigation.navigate('FollowersList');
  };
  useEffect(() => {
    apiGetAllFollowing(user.id).then((result) => {
      setFollowingData(result);
    });
    apiGetAllFollowers(user.id).then((result) => {
      setFollowData(result);
    });
  }, []);

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
  const handleEdit = async () => {
    navigation.navigate('EditProfile');
  };
  return (
    <SafeAreaView style={tw`flex-1 mt-18 px-6 items-center`}>
      <View style={tw`flex-3 items-center`}>
        <View style={tw`h-40 w-60 mb-6 items-center`}>
          <Image
            source={{
              uri: user.img_url,
            }}
            style={tw`h-40 w-40 rounded-full mb-6`}
          />
          <View style={{ position: 'absolute', bottom: 0, right: 56 }}>
            <ImagePickerComponent />
          </View>
        </View>

        <Text style={tw`text-3xl`}>@{user.username}</Text>
      </View>

      <View style={tw`flex-1 flex-row items-center px-4`}>
        <TouchableOpacity
          onPress={() => fetchDataFollowers(user.id)}
          style={tw`flex-1`}
        >
          <View style={tw`flex-1 items-center border-r-2 border-gray-400`}>
            <Text style={tw`font-bold text-lg`}> Followers</Text>
            <Text style={tw`font-bold`}>{followData.length}</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          <View style={tw`flex-1 items-center border-r-2  border-gray-400`}>
            <Text style={tw`font-bold text-lg`}>Score</Text>
            <Text style={tw`font-bold`}>{user.score}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`flex-1`}
          onPress={() => fetchDataFollowing(user.id)}
        >
          <View style={tw`flex-1 items-center`}>
            <Text style={tw`font-bold text-lg`}>Following</Text>
            <Text style={tw`font-bold`}>{followingData.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-3`}>
        {/* This view component is just here to space stuff out */}
      </View>
      <View style={tw`flex-2 items-center w-100%`}>
        <TouchableOpacity onPress={handleEdit}>
          <View style={tw` bg-blue-400 px-13 py-2 mb-10 rounded-lg`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={tw`bg-red-400 px-12 py-2  rounded-lg`}>
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
