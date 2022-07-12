import { Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function DownArrow() {
  return (
    <LottieView
      source={require('../../../public/assets/arrowDown.json')}
      resizeMode='contain'
      autoPlay
      style={{ width: 50, height: 50 }}
    />
  );
}
