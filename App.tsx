/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import {
  enableBiometrics,
  loginWitBiometrics,
  logout,
} from './src/utils/biometrics';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log('isLoggedIn', isLoggedIn);

  const authHandler = async () => {
    console.log('start the biometrics process');

    const isEnabled = await enableBiometrics({
      email: 'david',
      password: '123Test!',
    });

    setIsLoggedIn(isEnabled);
  };

  const loginHandler = async () => {
    console.log('login please!');

    const loggedIn = await loginWitBiometrics();
    setIsLoggedIn(loggedIn);
  };

  const logoutHandler = async () => {
    console.log('logging out');

    const loggedOut = await logout();
    setIsLoggedIn(!loggedOut);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {!isLoggedIn ? (
            <>
              <View>
                <Button
                  onPress={authHandler}
                  title="Authenticate Biometric login"
                />
              </View>

              <View style={styles.buttonWrapper}>
                <Button onPress={loginHandler} title="Login" />
              </View>
            </>
          ) : null}

          {isLoggedIn ? (
            <View style={styles.buttonWrapper}>
              <Button onPress={logoutHandler} title="Logout" />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 50,
  },
});

export default App;
