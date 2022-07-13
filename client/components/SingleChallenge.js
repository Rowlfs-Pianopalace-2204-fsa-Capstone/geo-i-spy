/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import tw from 'twrnc';
import { GlobalDataContext } from '../Context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SingleChallenge({ navigation }) {
  const { SingleChallengeData } = React.useContext(GlobalDataContext);
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center shadow-lg`}>
      <ScrollView>
        <View style={tw`pt-5 pb-5`}>
          <Card>
            <Card.Title
              title={SingleChallengeData.name}
              left={() => (
                <MaterialCommunityIcons
                  name='camera-iris'
                  size={40}
                  color='black'
                />
              )}
            />
            <Card.Content>
              <Text>Rarity: {SingleChallengeData.difficulty}</Text>
              <Text>Score: {SingleChallengeData.score}</Text>
              <Text>Description: {SingleChallengeData.description}</Text>
              {SingleChallengeData.users && (
                <>
                  <Card.Cover
                    source={{
                      uri: SingleChallengeData.users[0].Achievement.img_url,
                    }}
                  />
                  <Text>
                    Completed:{' '}
                    {new Date(
                      SingleChallengeData.users[0].Achievement.createdAt + ''
                    ).toDateString()}
                  </Text>
                </>
              )}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Camera')}>
                {SingleChallengeData.users
                  ? 'Retake Photo!'
                  : 'Complete Challenge1'}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
