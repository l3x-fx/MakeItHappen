import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Condiment_400Regular } from '@expo-google-fonts/condiment';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation.js';
import { Welcome } from './src/screens/Welcome.js';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Condiment_400Regular,
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {       
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return  (
      <Welcome />
    );
  }
  if (appIsReady) {
  return   (
    <Navigation />
  );
  }
}


