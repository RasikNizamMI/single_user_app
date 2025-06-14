import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Images from './constants/images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.splash} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 303,
    height: 141,
  },
});

export default SplashScreen;
