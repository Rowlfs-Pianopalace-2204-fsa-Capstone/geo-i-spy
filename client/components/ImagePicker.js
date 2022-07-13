import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { changeProfilePic } from '../Thunks/cloud';
import tw from 'twrnc';
import { GlobalDataContext } from '../Context';

export default function ImagePickerComponent() {
  const { authData, setAuthData } = React.useContext(GlobalDataContext);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);

      const newUrl = await changeProfilePic(result.base64);

      const newAuth = { ...authData, img_url: newUrl };
      setAuthData(newAuth);
    }
  };

  return (
    <TouchableOpacity
      style={tw`bg-sky-400 h-9 w-9 rounded-full items-center justify-center`}
      onPress={pickImage}
    >
      <MaterialCommunityIcons name='cog' size={25} color='black' />
    </TouchableOpacity>
  );
}
