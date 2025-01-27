import React, { useEffect } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, deleteItem as deleteItemFromDB } from '../database/db';
import { setItems, deleteItem } from '../redux/itemsSlice';

const ItemListScreen = ({ navigation }) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems((data) => dispatch(setItems(data)));
  }, [dispatch]);

  const deleteItemHandler = (id) => {
    deleteItemFromDB(id, () => dispatch(deleteItem(id)));
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Item" onPress={() => navigation.navigate('AddEditItem')} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('AddEditItem', { item })}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteItemHandler(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItemListScreen;
