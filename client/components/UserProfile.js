import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';

const UserProfile = ({ signOut }) => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <TouchableOpacity onPress={() => signOut()}>
        <View style={tw`bg-blue-500 px-5 py-3 rounded-full`}>
          <Text style={tw`text-white font-semibold text-lg`}>Sign Out!👋</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserProfile;
