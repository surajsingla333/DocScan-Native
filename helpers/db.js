// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('images.db');

// export const init = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql('CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL);', [], () => {
//         resolve();
//       }, (_, err) => {
//         reject(err);
//       });
//     });
//   })
// }

// // export const insertPlace = (title)