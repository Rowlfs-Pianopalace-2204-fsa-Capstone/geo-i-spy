/** @format */

import { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
const Toast = () => {
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);
  const colors = {
    danger: '#dc3545',
    success: '#28a745',
    info: '#343a40',
  };
  useEffect(() => {
    if (message) {
      setInterval(() => {
        setMessage(null);
      }, 3000);
    }
  });
  const onNewToast = (data) => {
    console.log('data', data);

    setMessage(data.message);
    setMessageType(data.type);
  };
  useEffect(() => {
    DeviceEventEmitter.addListener('SHOW_TOAST_MESSAGE', onNewToast);
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: '8%',
        left: '4%',
        right: '4%',
        backgroundColor: colors[messageType],
        zIndex: 11,
        elevation: 11,
        borderRadius: 4,
      }}
    >
      <Text
        style={{
          padding: 14,
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default Toast;
