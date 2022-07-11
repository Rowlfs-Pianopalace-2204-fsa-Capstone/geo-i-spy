import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity } from 'react-native';
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
      // style={tw`absolute bottom-10  right-40`}
      onPress={pickImage}
    >
      <MaterialCommunityIcons
        style={tw`relative ml-45`}
        name='cog'
        size={30}
        color='black'
      />
    </TouchableOpacity>
  );
}
