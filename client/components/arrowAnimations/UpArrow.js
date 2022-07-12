import { Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function UpArrow() {
  return (
    <LottieView
      source={require('../../../public/assets/arrowUp.json')}
      resizeMode='contain'
      autoPlay
      style={{ width: 50, height: 50 }}
    />
  );
}
