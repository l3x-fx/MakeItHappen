import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {light, dark, screenStyles} from '../screens/screenStyles'

import { Calendar } from '../screens/Calendar'
import { ToDo } from '../screens/ToDo'


const Tab = createBottomTabNavigator()

const Navigation = () => {
  const style = screenStyles()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline'
            } else if (route.name === 'ToDo') {
              iconName = focused ? 'list-circle' : 'list-circle-outline'
            } 

            return <Ionicons name={iconName} size={33} color={color} />;
          },
          tabBarActiveTintColor: dark,
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
          name='ToDo'
          component={ToDo}
          options={{title: 'ToDo'}}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

// https://reactnavigation.org/docs/headersKC
// https://blog.nerdjfpb.com/how-to-use-custom-google-font-with-react-native-expo-nativebase-and-typescript/
