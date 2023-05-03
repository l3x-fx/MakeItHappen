import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Navigation from './src/navigation/Navigation.js';
import { Welcome } from './src/screens/Welcome.js';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from './src/store.js';


// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Condiment': require('./assets/fonts/Condiment-Regular.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
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
    <Provider store={store}>
      <Navigation />
    </Provider>
    
  );
  }
}


