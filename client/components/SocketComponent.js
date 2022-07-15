/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GlobalDataContext } from '../Context';
import tw from 'twrnc';
import socket from '../Thunks/Socket';

// Replace this URL with your own socket-io host, or start the backend locally
const socketEndpoint = 'https://geoispy.herokuapp.com/';
export default function SocketComponent() {
  const { rooms, setRooms, singleRoom, setSingleRoom } =
    React.useContext(GlobalDataContext);
  useEffect(() => {
    console.log('SOCKET');
    socket.on('resetRooms', (data) => {
      console.log(data);
      setRooms(data);
    });
  }, [rooms]);

  return (
    <View>
      <TouchableOpacity>
        <Image />
      </TouchableOpacity>

      <TouchableOpacity>
        <View>
          <Text>Grey</Text>
          <Text>lmao you sucl</Text>
        </View>
        <View>
          <Text>1/23/22</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
