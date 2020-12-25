import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { Dashboard, Login, Home, Cources, Quizzes, ErrorPage, Lessons, Profile } from './screens/index'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator options={{headerShown: false}} >
          {/* <Stack.Screen name="Dash" component={Lessons} options={{ headerShown : false }} /> */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown : false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown : false }} />
          <Stack.Screen name="Cources" component={Cources} options={{ headerShown : false }} />
          <Stack.Screen name="Quizzes" component={Quizzes} options={{ headerShown : false }} />
          <Stack.Screen name="Error" component={ErrorPage} options={{ headerShown : false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
