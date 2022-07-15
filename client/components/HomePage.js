/** @format */

import React, { useEffect, useState } from 'react';
import tw from 'twrnc';

import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import SingleChallenge from './SingleChallenge';
import { GlobalDataContext } from '../Context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomePage({ navigation }) {
  const { achievements, setSingleChallengeData, SingleChallengeData } =
    React.useContext(GlobalDataContext);

  const [weeklyChallenge, setWeeklyChallenge] = useState({});
  useEffect(() => {
    for (let i = 0; i < achievements.length; i++) {
      if (achievements[i].weeklyChallenge === true) {
        setWeeklyChallenge(achievements[i]);
      }
    }
  }, [achievements]);

  useEffect(() => {}, [SingleChallengeData, weeklyChallenge]);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center shadow-lg`}>
      <ScrollView>
        <View style={tw`pt-5 pb-5`}>
          <Card>
            <Card.Title
              title='Daily Challenge'
              left={() => (
                <MaterialCommunityIcons
                  name='compass-outline'
                  size={40}
                  color='black'
                />
              )}
            />
            <Card.Content>
              <Title>{weeklyChallenge.name}</Title>
              <Paragraph>
                Today's challenge is to take a picture of a:{' '}
                {weeklyChallenge.name}!
              </Paragraph>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Text>Rarity: {weeklyChallenge.difficulty}</Text>
              <Text>Score: {weeklyChallenge.score}</Text>
              <Text>Description: {weeklyChallenge.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => [
                  navigation.navigate('Camera'),
                  setSingleChallengeData(weeklyChallenge),
                ]}
              >
                Complete
              </Button>
            </Card.Actions>
          </Card>
        </View>
        {SingleChallengeData.name !== weeklyChallenge.name &&
          SingleChallengeData.name !== undefined && (
            <View style={tw`pt-5 pb-5`}>
              <Card>
                <Card.Title
                  title='Tracked Challenge'
                  left={() => (
                    <MaterialCommunityIcons
                      name='compass'
                      size={40}
                      color='black'
                    />
                  )}
                />
                <Card.Content>
                  <Title>{SingleChallengeData.name}</Title>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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
                          SingleChallengeData.users[0].Achievement.createdAt +
                            ''
                        ).toDateString()}
                      </Text>
                    </>
                  )}
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => [navigation.navigate('Camera')]}>
                    {SingleChallengeData.users ? 'Retake' : 'Complete'}
                  </Button>
                  <Button onPress={() => setSingleChallengeData({})}>
                    Untrack
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}
