import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from './UserProfile';
import FollowingList from './FollowingList';
import PublicProfile from './PublicProfile';
import FollowersList from './FollowersList';
import ImagePickerComponent from './ImagePicker';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigate = ({ signOut }, navigation) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='UserProfile' options={{ headerShown: false }}>
        {(props) => <UserProfile {...props} signOut={() => signOut()} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name='FollowingList'
        component={FollowingList}
        options={{
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name='FollowersList'
        component={FollowersList}
        options={{
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name='PublicProfile'
        component={PublicProfile}
        options={{
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name='ProfilePicture'
        options={{
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
        component={ImagePickerComponent}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigate;
