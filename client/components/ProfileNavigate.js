import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from './UserProfile';
import FollowingList from './FollowingList';
import PublicProfile from './PublicProfile';
import FollowersList from './FollowersList';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigate = ({ signOut }, navigation) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='UserProfile' options={{ headerShown: false }}>
        {(props) => <UserProfile {...props} signOut={() => signOut()} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name='FollowingList'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      >
        {(props) => <FollowingList {...props} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name='FollowersList'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      >
        {(props) => <FollowersList {...props} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name='PublicProfile'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        }}
      >
        {(props) => <PublicProfile {...props} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigate;
