import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Condiment_400Regular } from '@expo-google-fonts/condiment';
import * as Font from 'expo-font';
import Navigation from './src/navigation/Navigation.js';
import { Welcome } from './src/screens/Welcome.js';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {


  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Condiment': require('./assets/fonts/Condiment-Regular.ttf'),
        });
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


