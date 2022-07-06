/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, Platform, ToastAndroid } from 'react-native';
// import Animated, {
//   withTiming,
//   useSharedValue,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
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

  // const animatedOpacity = useSharedValue(0.5);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: animatedOpacity.value,
  //   };
  // });
  const [timeOutDuration, setTimeOutDuration] = useState(6000);
  const timeOutRef = useRef(null);
  const colors = {
    danger: 'red',
    success: '#28a745',
    info: '#343a40',
  };

  // useEffect(() => {
  //   if (message) {
  //     setInterval(() => {
  //       setMessage(null);
  //     }, 6000);
  //   }
  // });

  const onNewToast = (data) => {
    if (data.duration) {
      setTimeOutDuration(6000);
    }

    setMessage(data.message);
    setMessageType(data.type);
  };
  // const closeToast = () => {
  //   setMessage(null);
  //   setTimeOutDuration(6000);
  // };

  // useEffect(() => {
  //   if (message) {
  //     timeOutRef.current = setInterval(() => {
  //       if (timeOutDuration === 0) {
  //         setMessage(null);
  //         setTimeOutDuration(6000);
  //       } else {
  //         console.log(timeOutDuration);
  //         setTimeOutDuration((prev) => prev - 1000);
  //       }
  //     }, 1000);
  //   }
  //   return () => {
  //     clearInterval(timeOutRef.current);
  //   };
  // }, [message, timeOutDuration]);
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
      <TouchableOpacity>
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
      </TouchableOpacity>
    </View>
  );
};

export default Toast;
