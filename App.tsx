import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import AddProduct from "./components/AddProduct";
import Product from './context/Product';
const Stack = createStackNavigator();
console.disableYellowBox = true;
const App = () => {
  return (
    <Product>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Product>

  );
};
export default App;
