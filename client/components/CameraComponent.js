/** @format */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
      let challengeFound = false;
      responseJson.responses[0].labelAnnotations.map((guess) => {
        console.log('GUESS:', guess);
        if (guess.description === challengeItem) {
          challengeFound = true;
        }
      });
      if (challengeFound) {
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
      // //const { responses } = await submitToGoogle(picture.base64);

      // const results = responses[0].labelAnnotations.map(
      //   (response) => response.description
      // );

      // console.log('result', results);
    }
  };

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
          <Image source={{ uri: image }} />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setresultVisible(!resultVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
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
});
