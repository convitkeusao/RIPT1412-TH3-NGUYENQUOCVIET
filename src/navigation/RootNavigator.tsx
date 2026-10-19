import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../features/welcome/WelcomeScreen';
import HomeScreen from '../features/home/HomeScreen';

export type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            <Stack.Screen name="Welcome">
                {({ navigation }) => (
                    <WelcomeScreen
                        onStart={() => navigation.replace('Home')}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}