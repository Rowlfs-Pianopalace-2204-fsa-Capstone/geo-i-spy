/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GlobalDataContext } from '../Context';
import tw from 'twrnc';
import socket from '../Thunks/Socket';
import { timeSince } from '../helpers/time';
import { apiGetRoom } from '../Thunks/Rooms';
import { apiSearchUser } from '../Thunks/followers';

const dummyData = [
  {
    id: 1,
    name: 'DM',
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
// Replace this URL with your own socket-io host, or start the backend locally
const socketEndpoint = 'https://geoispy.herokuapp.com/';
export default function SocketComponent({ navigation }) {
  const {
    rooms,
    setRooms,
    singleRoom,
    setSingleRoom,
    authData,
    setSingleUser,
  } = React.useContext(GlobalDataContext);
  useEffect(() => {
    console.log('SOCKET');
    socket.on('resetRooms', (data) => {
      console.log(data);
      setRooms(data);
    });
  }, [rooms]);
  const setSingleRoomMessages = async (id) => {
    const data = await apiGetRoom(id);
    setSingleRoom(data);
    navigation.navigate('SingleRoom');
  };

  const showPublicProfile = async (id) => {
    const user = await apiSearchUser(id);
    setSingleUser(user[0]);
    navigation.navigate('PublicProfile');
  };

  return (
    <View>
      {dummyData.map((ele) => {
        let otherUser;
        if (authData.id === ele.users[0].id) {
          otherUser = ele.users[1];
        } else {
          otherUser = ele.users[0];
        }
        return (
          <View key={ele.id}>
            <TouchableOpacity onPress={() => showPublicProfile(otherUser.id)}>
              <Image
                source={{ uri: otherUser.img_url }}
                style={tw`h-16 w-16 pl-16`}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSingleRoomMessages(ele.id)}>
              <View>
                <Text>{otherUser.username}</Text>
                <Text>Last Message Placeholder</Text>
              </View>
              <View>
                <Text>{timeSince(new Date(ele.updatedAt))}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
