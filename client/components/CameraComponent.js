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

export default function CameraComponent({ navigation }) {
  const isFocused = useIsFocused();
  const { SingleChallengeData } = React.useContext(GlobalDataContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [recording, setRecording] = useState(false);
  const [camera, setCamera] = useState(null);
  const [resultVisible, setresultVisible] = useState(false);
  const [uploading, setUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(false);
  const animationRef = useRef(null);

  const submitToGoogle = async (image) => {
    try {
      setUpload(true);

      const response = await apiSendToCloudVision(image);
      const testFunction = () => {
        toast.success({ message: null });
      };
      let responseJson = await response.json();
      console.log('@@@@@@', responseJson), '@@@@@@@';
      const challengeItem = SingleChallengeData.name;
      let challengeResult = false;
      setResult(false);

      responseJson.responses[0].labelAnnotations.map((guess) => {
        console.log('GUESS:', guess);
        if (guess.description === challengeItem) {
          setResult(true);
          challengeResult = true;
        }
      });
      if (challengeResult) {
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
      console.log('THIS RAN');
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [isFocused]);

  const handleRecord = async () => {
    if (recording) {
      //await camera.stopRecording();
    } else if (!recording) {
      setRecording(true);
      const picture = await camera.takePictureAsync({ base64: true });
      setImage(picture.uri);
      setRecording(false);

      // const pushAction = StackActions.push('Image', { image: picture });
      // navigation.dispatch(pushAction);
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

  useEffect(() => {
    console.log('image', image);
  }, [resultVisible]);

  if (hasPermission === null) {
    return <Text>{hasPermission}</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (isFocused) {
    return (
      <View style={tw`flex-1`}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={resultVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setresultVisible(!resultVisible);
          }}
        >
          <Pressable
            style={tw`flex-1 justify-center`}
            onPress={() => setresultVisible(!resultVisible)}
          >
            <View style={tw`flex-1 justify-center m-10 mt-40 mb-50 `}>
              <Image
                style={tw`flex-1 border-8 border-white rounded-lg`}
                source={{
                  uri: image,
                }}
              />
              {uploading ? (
                <LottieView
                  source={require('../../public/assets/loading.json')}
                  resizeMode='contain'
                  autoPlay
                />
              ) : result ? (
                <LottieView
                  source={require('../../public/assets/success.json')}
                  resizeMode='contain'
                  loop={false}
                  ref={animationRef}
                />
              ) : (
                <LottieView
                  source={require('../../public/assets/failed.json')}
                  resizeMode='contain'
                  loop={false}
                  ref={animationRef}
                />
              )}
            </View>
          </Pressable>
        </Modal>
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
  } else {
    setHasPermission(null);
    return <View />;
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
