/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalDataContext } from '../Context';

import socket from '../Thunks/Socket';

// Replace this URL with your own socket-io host, or start the backend locally
const socketEndpoint = 'https://geoispy.herokuapp.com/';
export default function SocketComponent() {
  const [hasConnection, setConnection] = useState(false);
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (socket !== undefined) {
      socket.io.on('open', () => setConnection(true));
      socket.io.on('close', () => setConnection(false));

      socket.on('time-msg', (data) => {
        setTime(new Date(data.time).toString());
      });

      socket.on('resetFeed', (data) => {
        console.log('THIS RAN');
        console.log(data);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {!hasConnection && (
        <>
          <Text style={styles.paragraph}>
            Connecting to {socketEndpoint}...
          </Text>
          <Text style={styles.footnote}>
            Make sure the backend is started and reachable
          </Text>
        </>
      )}

      {hasConnection && (
        <>
          <TouchableOpacity onPress={() => socket.emit('resetFeed', 1)}>
            <Text>Send Users</Text>
          </TouchableOpacity>
          <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>
            Server time
          </Text>
          <Text style={styles.paragraph}>{time}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 16,
  },
  footnote: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
