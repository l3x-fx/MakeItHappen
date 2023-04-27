import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {navStyle} from './NavigationStyle'

import { Welcome } from '../screens/Welcome'

import { Calendar } from '../screens/Calendar'
import { Today } from '../screens/Today'


const Tab = createBottomTabNavigator()

const Navigation = () => {
  const style = navStyle()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline'
            } else if (route.name === 'Today') {
              iconName = focused ? 'add-circle' : 'add-circle-outline'
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00A1A1',
          tabBarInactiveTintColor: 'gray',
            
          headerShown: false
        })}
      >
        <Tab.Screen
          name='Calendar'
          component={Calendar}
          options={{title: 'Calendar'}}
        />
        <Tab.Screen
          name='Today'
          component={Today}
          options={{title: 'Today'}}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

// https://reactnavigation.org/docs/headersKC
// https://blog.nerdjfpb.com/how-to-use-custom-google-font-with-react-native-expo-nativebase-and-typescript/
