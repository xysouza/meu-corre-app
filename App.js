// In App.js in a new project
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants';
import DashBoardScreen from './src/screens/DashBoardScreen';
import AddLancamentoScreen from './src/screens/AddLancamentoScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="DashBoard"
      screenOptions={{ 
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
    }}
    >
      <Stack.Screen name="DashBoard" component={DashBoardScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen name="AddLancamento" component={AddLancamentoScreen} 
      options={{ title: 'Novo Lançamento' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}