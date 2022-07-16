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
    name: 'DM',
    createdAt: '2022-07-16T13:37:26.416Z',
    updatedAt: '2022-07-16T13:37:26.416Z',
    users: [
      {
        id: 3,
        username: 'larry',
        first: null,
        last: null,
        password:
          '$2b$05$OZLbup/INd9.4WQ10ovERuAQcANBNWYPiuwmG8dRPThElQor1q2Ri',
        isAdmin: false,
        img_url:
          'https://res.cloudinary.com/hckemznha/image/upload/v1657506408/default-profile-picture1_m7cxma.jpg',
        email: 'larry@email.com',
        score: 0,
        biography: 'I am a generated fake user.',
        dailyToken: 1,
        createdAt: '2022-07-16T13:37:26.301Z',
        updatedAt: '2022-07-16T13:37:26.301Z',
        Rooms: {
          createdAt: '2022-07-16T13:37:26.424Z',
          updatedAt: '2022-07-16T13:37:26.424Z',
          userId: 3,
          roomId: 1,
        },
      },
      {
        id: 2,
        username: 'murphy',
        first: null,
        last: null,
        password:
          '$2b$05$R/QL36K8XfWRidfmOuPtJ.udy4/ackl2dbC1CJBgsxQi0.ewC0AAa',
        isAdmin: false,
        img_url:
          'https://res.cloudinary.com/hckemznha/image/upload/v1657506408/default-profile-picture1_m7cxma.jpg',
        email: 'murphy@email.com',
        score: 0,
        biography: 'I am a generated fake user.',
        dailyToken: 1,
        createdAt: '2022-07-16T13:37:26.295Z',
        updatedAt: '2022-07-16T13:37:26.295Z',
        Rooms: {
          createdAt: '2022-07-16T13:37:26.425Z',
          updatedAt: '2022-07-16T13:37:26.425Z',
          userId: 2,
          roomId: 1,
        },
      },
    ],
    messages: [
      {
        id: 2,
        message: 'wow!',
        createdAt: '2022-07-16T13:37:26.429Z',
        updatedAt: '2022-07-16T13:37:26.437Z',
        userId: 2,
        roomId: 1,
      },
      {
        id: 1,
        message: 'wow!',
        createdAt: '2022-07-16T13:37:26.427Z',
        updatedAt: '2022-07-16T13:37:26.435Z',
        userId: 2,
        roomId: 1,
      },
      {
        id: 3,
        message: 'You suck!',
        createdAt: '2022-07-16T13:37:26.430Z',
        updatedAt: '2022-07-16T13:37:26.433Z',
        userId: 3,
        roomId: 1,
      },
    ],
  },
];

export default function AllRooms({ navigation }) {
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
    navigation.navigate('Message');
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
              title={
                authData.id !== item.users[0].id
                  ? item.users[0].username
                  : item.users[1].username
              }
              description={item.messages[item.messages.length - 1].message}
              showUserAvatar
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
