
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreateUSerScreen } from '../screens/CreateUserScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: null }} />
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: null }} />
                <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: null }} />
                <Stack.Screen name="new_user" component={CreateUSerScreen} options={{ headerShown: null }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
