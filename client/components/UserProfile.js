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
import EditUser from './EditProfle';

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

  const editUser = () => {
    navigation.navigate('EditProfile');
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

        <Text style={tw`flex-1 font-bold`}>@{user.username}</Text>
      </View>

      <View style={tw`flex-1 flex-row px-8`}>
        <TouchableOpacity onPress={() => fetchDataFollowers(user.id)}>
          <View style={tw`flex-1 items-center`}>
            <Text style={tw`font-bold`}> Followers</Text>
            <Text>{followData.length}</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1 items-center`}>
          <Text style={tw`font-bold`}>Score</Text>
          <Text>{user.score}</Text>
        </View>
        <TouchableOpacity onPress={() => fetchDataFollowing(user.id)}>
          <View style={tw`flex-1 items-center`}>
            <Text style={tw`font-bold`}>Following</Text>
            <Text>{followingData.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 items-center`}>
        <TouchableOpacity onPress={handleLogout}>
          <View style={tw`bg-blue-500 px-12 py-5  rounded-lg`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              Sign Out!👋
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 items-center`}>
        <TouchableOpacity onPress={editUser}>
          <View style={tw`bg-blue-500 px-12 py-5  rounded-lg`}>
            <Text style={tw`text-white font-semibold text-lg`}>
              Edit Profile!👋
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
