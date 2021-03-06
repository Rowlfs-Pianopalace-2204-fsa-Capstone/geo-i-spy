/** @format */

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  Image,
  Modal,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import tw from 'twrnc';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import toast from '../helpers/toast';
import { GlobalDataContext } from '../Context';
import { apiSendToCloudVision } from '../Thunks/Challenges';
import LottieView from 'lottie-react-native';
import { pictureToCloud } from '../Thunks/cloud';
import socket from '../Thunks/Socket';

export default function CameraComponent({ navigation }) {
  const isFocused = useIsFocused();
  const {
    SingleChallengeData,
    setSingleChallengeData,
    setAchievements,
    achievements,
    authData,
  } = React.useContext(GlobalDataContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [recording, setRecording] = useState(false);
  const [camera, setCamera] = useState(null);
  const [resultVisible, setresultVisible] = useState(false);
  const [uploading, setUpload] = useState(false);
  const [image, setImage] = useState({});
  const [result, setResult] = useState(false);
  const [padding, setPadding] = useState('');
  const animationRef = useRef(null);
  const submitToGoogle = async (image) => {
    try {
      setUpload(true);

      const response = await apiSendToCloudVision(image);
      const testFunction = () => {
        toast.success({ message: null });
      };
      let responseJson = await response.json();
      console.log(responseJson);
      const challengeItem = SingleChallengeData.name;
      let challengeResult = false;
      setResult(false);

      responseJson.responses[0].labelAnnotations.map((guess) => {
        console.log('GUESS:', guess.description);
        if (guess.description === challengeItem) {
          setResult(true);
          challengeResult = true;
        }
      });

      if (challengeResult) {
        const achievement = await pictureToCloud(
          `data:image/jpeg;base64,${image}`,
          SingleChallengeData.id,
          authData.userId
        );
        const newAchievements = achievements.filter(
          (ele) => ele.id !== SingleChallengeData.id
        );
        socket.emit('resetFeed', authData.id);
        console.log(
          'ACHIEVEMENT RETURNED _______________________',
          achievement
        );
        setSingleChallengeData(achievement);
        setAchievements([achievement, ...newAchievements]);

        toast.success({ message: `You found a ${challengeItem}!` });
        setTimeout(testFunction, 5000);
      } else {
        toast.danger({ message: `No ${challengeItem} detected, try again.` });
        setTimeout(testFunction, 5000);
      }
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
  }, [isFocused]);
  useEffect(() => {
    if (Platform.OS === 'android') {
      setPadding('mt-15 mb-15');
    }
  }, []);

  const handleRecord = async () => {
    if (recording) {
      //await camera.stopRecording();
    } else if (!recording) {
      setRecording(true);
      const picture = await camera.takePictureAsync({ base64: true });
      setImage(picture);
      setRecording(false);

      // const pushAction = StackActions.push('Image', { image: picture });
      // navigation.dispatch(pushAction);
      // pictureToCloud(`data:image/jpeg;base64,${picture.base64}`);
      setresultVisible(true);
      setUpload(true);
      const { responses } = await submitToGoogle(picture.base64);

      const results = responses[0].labelAnnotations.map(
        (response) => response.description
      );
      setUpload(false);

      console.log('result', results);
    }
  };

  useEffect(() => {
    if (uploading === false) {
      if (animationRef.current !== null) {
        if (result) {
          animationRef.current.play(0, 120);
        } else {
          animationRef.current.play(0, 59);
        }

        console.log('uploading is false');
      }
    }

    // Or set a specific startFrame and endFrame with:
  }, [uploading]);

  const uploadResult = async () => {
    setresultVisible(!resultVisible);
    navigation.navigate('SingleChallenge');
  };
  const tryAgain = () => {
    setresultVisible(!resultVisible);
  };

  useEffect(() => {}, [resultVisible]);

  if (hasPermission === null) {
    return <Text>{hasPermission}</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (isFocused) {
    return (
      <View style={tw`flex-1 bg-black`}>
        <Modal
          style={tw`bg-gray-100`}
          animationType='slide'
          transparent={true}
          visible={resultVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setresultVisible(!resultVisible);
          }}
        >
          <View style={tw`flex-1 justify-center m-10 mt-40 mb-50 `}>
            <Image
              style={tw`flex-1 border-8 border-white rounded-lg`}
              source={{
                uri: image.uri,
              }}
            />
            {uploading ? (
              <LottieView
                source={require('../../public/assets/loading.json')}
                resizeMode='contain'
                autoPlay
              />
            ) : result ? (
              <>
                <LottieView
                  source={require('../../public/assets/success.json')}
                  resizeMode='contain'
                  loop={false}
                  ref={animationRef}
                />
                <View style={tw`flex-none flex-row justify-center`}>
                  <TouchableOpacity style={tw`grow`} onPress={tryAgain}>
                    <View style={tw` bg-red-500 px-5 py-3 rounded-full`}>
                      <Text style={tw`text-white font-semibold text-lg `}>
                        Retake
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`grow`} onPress={uploadResult}>
                    <View style={tw`bg-green-500 px-5 py-3 rounded-full`}>
                      <Text style={tw`text-white font-semibold text-lg`}>
                        Select
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <LottieView
                  source={require('../../public/assets/failed.json')}
                  resizeMode='contain'
                  loop={false}
                  ref={animationRef}
                />
                <TouchableOpacity onPress={tryAgain}>
                  <View style={tw`bg-red-500 px-5 py-3 rounded-full`}>
                    <Text style={tw`text-white font-semibold text-lg`}>
                      Retake
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
        <Camera
          style={tw`flex-1 ${padding}`}
          type={type}
          ratio={'16:9'}
          ref={(ref) => setCamera(ref)}
        >
          <View
            style={
              resultVisible
                ? tw`flex-1 opacity-0 bg-transparent flex-row m-4`
                : tw`flex-1 opacity-70 bg-transparent flex-row m-4`
            }
          >
            <TouchableOpacity
              style={tw`absolute top-10 left-1`}
              onPress={() => {
                // navigation.dispatch(StackActions.pop(1));
                navigation.navigate('Home');
              }}
            >
              <MaterialCommunityIcons name='close' size={40} color='white' />
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
                color='white'
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
                color={recording ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  } else {
    setHasPermission(null);
    return <View />;
  }
}
