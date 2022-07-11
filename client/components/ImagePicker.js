import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
