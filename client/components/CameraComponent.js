/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import tw from 'twrnc';
import * as MediaLibrary from 'expo-media-library';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import toast from '../helpers/toast';

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [recording, setRecording] = useState(false);
  const [camera, setCamera] = useState(null);
  const [uploading, setUpload] = useState(false);
  const [image, setImage] = useState(null);

  const submitToGoogle = async (image) => {
    try {
      setUpload(true);
      // const encoded = await FileSystem.readAsStringAsync(image, {
      //   encoding: 'base64',
      // });

      // const fs = require('fs');
      // let imageFile = fs.readFileSync(image);
      // let encoded = Buffer.from(imageFile).toString('base64');

      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              // { type: 'LANDMARK_DETECTION', maxResults: 5 },
              // { type: 'FACE_DETECTION', maxResults: 5 },
              // { type: 'LOGO_DETECTION', maxResults: 5 },
              // { type: 'TEXT_DETECTION', maxResults: 5 },
              // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              // { type: 'CROP_HINTS', maxResults: 5 },
              // { type: 'WEB_DETECTION', maxResults: 5 },
            ],
            image: {
              content: image,
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7XC9GtbutkELajb80zbyoOCJfraTFPgg',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        }
      );
      let responseJson = await response.json();
      console.log('@@@@@@', responseJson), '@@@@@@@';
      const challengeItem = 'Beverage can';
      let challengeFound = false;
      responseJson.responses[0].labelAnnotations.map((guess) => {
        console.log('GUESS:', guess);
        if (guess.description === challengeItem) {
          challengeFound = true;
        }
      });
      challengeFound
        ? toast.success({ message: `You found a ${challengeItem}!` })
        : toast.danger({
            message: `${challengeItem} not detected, try again.`,
          });
      // this.setState({r
      //   googleResponse: responseJson,
      //   uploading: false
      // });

      // .responses.map((response) => {
      //   return response.description;
      // });
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    console.log('permission', hasPermission);
  }, [hasPermission]);

  const handleRecord = async () => {
    if (recording) {
      //await camera.stopRecording();
    } else if (!recording) {
      setRecording(true);
      const picture = await camera.takePictureAsync({ base64: true });
      setImage(picture.uri);
      setRecording(false);

      const pushAction = StackActions.push('Image', { image: picture });
      navigation.dispatch(pushAction);
      const { responses } = await submitToGoogle(picture.base64);
      const results = responses[0].labelAnnotations.map(
        (response) => response.description
      );

      console.log('result', results);
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
