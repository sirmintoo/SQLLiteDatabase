//Gaurav 
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'ItemsDB', location: 'default' },
  () => console.log('Database connected'),
  (err) => console.log('Error connecting to database:', err)
);

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
      [],
      () => console.log('Table created successfully'),
      (err) => console.log('Error creating table:', err)
    );
  });
};

export const insertItem = (name, description, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO items (name, description) VALUES (?, ?);',
      [name, description],
      (_, result) => successCallback(result.insertId),
      (err) => console.log('Error inserting item:', err)
    );
  });
};

export const fetchItems = (successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (_, result) => successCallback(result.rows.raw()),
      (err) => console.log('Error fetching items:', err)
    );
  });
};

export const updateItem = (id, name, description, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE items SET name = ?, description = ? WHERE id = ?;',
      [name, description, id],
      (_, result) => successCallback(result.rowsAffected),
      (err) => console.log('Error updating item:', err)
    );
  });
};

export const deleteItem = (id, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM items WHERE id = ?;',
      [id],
      (_, result) => successCallback(result.rowsAffected),
      (err) => console.log('Error deleting item:', err)
    );
  });
};

export default db;
