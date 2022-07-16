/** @format */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { GlobalDataContext } from '../Context';
import { apiGetRoom } from '../Thunks/Rooms';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
const dummyData = [
  {
    id: 1,
    name: 'Name',
    createdAt: '2022-07-15T20:28:08.403Z',
    updatedAt: '2022-07-15T20:28:08.403Z',
    users: [
      {
        id: 3,
        username: 'larry',
        password:
          '$2b$05$Hi9AfqSorVjfoFb5esQ5WeYvH0bPGNnthnFORSzcBkqSu94ZBMtUC',
        isAdmin: false,
        img_url:
          'https://res.cloudinary.com/hckemznha/image/upload/v1657506408/default-profile-picture1_m7cxma.jpg',
        email: 'larry@email.com',
        score: 0,
        biography: 'I am a generated fake user.',
        dailyToken: 1,
        createdAt: '2022-07-15T20:28:08.294Z',
        updatedAt: '2022-07-15T20:28:08.294Z',
        Rooms: {
          createdAt: '2022-07-15T20:28:08.411Z',
          updatedAt: '2022-07-15T20:28:08.411Z',
          userId: 3,
          roomId: 1,
        },
      },
      {
        id: 2,
        username: 'murphy',
        password:
          '$2b$05$WqvxyBLMIPk9W.p0ggPvNOS2yVtQtHVwRDd3azOr8z0tdKUIXK/PG',
        isAdmin: false,
        img_url:
          'https://res.cloudinary.com/hckemznha/image/upload/v1657506408/default-profile-picture1_m7cxma.jpg',
        email: 'murphy@email.com',
        score: 0,
        biography: 'I am a generated fake user.',
        dailyToken: 1,
        createdAt: '2022-07-15T20:28:08.287Z',
        updatedAt: '2022-07-15T20:28:08.287Z',
        Rooms: {
          createdAt: '2022-07-15T20:28:08.413Z',
          updatedAt: '2022-07-15T20:28:08.413Z',
          userId: 2,
          roomId: 1,
        },
      },
    ],
  },
];

export default function HomeScreen({ navigation }) {
  const {
    rooms,
    setRooms,
    singleRoom,
    setSingleRoom,
    authData,
    setSingleUser,
  } = React.useContext(GlobalDataContext);

  const setSingleRoomMessages = async (id) => {
    const data = await apiGetRoom(id);
    setSingleRoom(data);
    navigation.navigate('RoomScreen');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSingleRoomMessages(item.id)}>
            <List.Item
              title={item.name}
              description='Last Message Placeholder'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
