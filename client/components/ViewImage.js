import React from 'react';
import { Image } from 'react-native';
import tw from 'twrnc';

const ViewImage = ({ route }) => {
  console.log('viewimage', route.params.image.uri);
  return (
    <Image
      style={tw`flex-1 justify-center`}
      source={{
        uri: route.params.image.uri,
      }}
    />
  );
};

export default ViewImage;
