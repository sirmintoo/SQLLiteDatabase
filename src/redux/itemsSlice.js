import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setItems: (state, action) => action.payload,
    addItem: (state, action) => [...state, action.payload],
    updateItem: (state, action) => state.map((item) => (item.id === action.payload.id ? action.payload : item)),
    deleteItem: (state, action) => state.filter((item) => item.id !== action.payload),
  },
});

export const { setItems, addItem, updateItem, deleteItem } = itemsSlice.actions;

export default itemsSlice.reducer;
