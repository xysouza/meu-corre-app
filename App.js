// In App.js in a new project
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardScreen from './screens/DashBoardScreen';
import AddLancamentoScreen from './screens/AddLancamentoScreen';

/*
function DashBoardScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DashBoard Screen</Text>
      <Button title="Go to Add Lancamento" onPress={() => navigation.navigate('AddLancamento')}/>
    </View>
  );
}

function AddLancamentoScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Lancamento Screen</Text>
      <Button title="Go to Add Lancamento... again" onPress={() => navigation.push('AddLancamento')}/>
      <Button title="Go back" onPress={ () => navigation.goBack() } />
    </View>
  );
} */

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="DashBoard"
      screenOptions={{ 
        headerStyle: { backgroundColor: 'tomato'},
    }}
    >
      <Stack.Screen name="DashBoard" component={DashBoardScreen}
      options={{ title: 'Meu Corre - Dashboard' }}
      />
      <Stack.Screen name="AddLancamento" component={AddLancamentoScreen} />
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