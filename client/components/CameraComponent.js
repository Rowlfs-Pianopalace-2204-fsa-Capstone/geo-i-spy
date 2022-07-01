import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import tw from 'twrnc';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [recording, setRecording] = useState(false);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleRecord = async () => {
    if (recording) {
      await camera.stopRecording();

      setRecording(false);
    } else if (!recording) {
      setRecording(true);
      const recording = await camera.recordAsync();
      console.log(recording);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={tw`flex-1`}>
      <Camera style={tw`flex-1`} type={type} ref={(ref) => setCamera(ref)}>
        <View style={tw`flex-1 opacity-70 bg-transparent flex-row m-4`}>
          <TouchableOpacity
            style={tw`absolute top-10 left-1`}
            onPress={() => {
              // navigation.dispatch(StackActions.pop(1));
              navigation.navigate('Home');
            }}
          >
            <MaterialCommunityIcons name='alpha-x' size={40} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`absolute bottom-10 left-5`}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <MaterialCommunityIcons
              name='camera-flip'
              size={40}
              color='black'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`absolute bottom-10  right-40`}
            onPress={() => {
              handleRecord();
            }}
          >
            <MaterialCommunityIcons
              name='radiobox-marked'
              size={50}
              color={recording ? 'red' : 'black'}
              style={tw`opacity-60`}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
