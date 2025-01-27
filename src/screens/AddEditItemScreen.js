import React from 'react';
import { useDispatch } from 'react-redux';
import { insertItem, updateItem as updateItemInDB } from '../database/db';
import { addItem, updateItem } from '../redux/itemsSlice';
import ItemForm from '../components/ItemForm';

const AddEditItemScreen = ({ route, navigation }) => {
  const item = route.params?.item;
  const dispatch = useDispatch();

  const handleSubmit = ({ name, description }) => {
    if (item) {
      updateItemInDB(item.id, name, description, () => {
        dispatch(updateItem({ id: item.id, name, description }));
        navigation.goBack();
      });
    } else {
      insertItem(name, description, (id) => {
        dispatch(addItem({ id, name, description }));
        navigation.goBack();
      });
    }
  };

  return <ItemForm initialData={item} onSubmit={handleSubmit} />;
};

export default AddEditItemScreen;
