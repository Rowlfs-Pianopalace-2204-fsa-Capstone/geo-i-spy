import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Lookup = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the lookup screen</Text>
      <Button title="Go to About Screen" />
      <Button
        title="Go to Lookup Screen"
        onPress={() => navigation.navigate('Lookup')} // We added an onPress event which would navigate to the About screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Lookup;
