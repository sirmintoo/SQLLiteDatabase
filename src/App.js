import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { initializeDatabase } from './database/db';
import ItemListScreen from './screens/ItemListScreen';
import AddEditItemScreen from './screens/AddEditItemScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'Items' }} />
          <Stack.Screen name="AddEditItem" component={AddEditItemScreen} options={{ title: 'Add / Edit Item' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
