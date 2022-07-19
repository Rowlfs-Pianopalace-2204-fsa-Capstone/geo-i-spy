/** @format */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { GlobalDataContext } from '../Context';
import { apiGetRoom } from '../Thunks/Rooms';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

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

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
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
              description={item.messages[0] ? item.messages[0].message : ''}
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
