import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    //creating database called 'jate'
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
        //checking to see if 'jate' database is already there, if so return
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        //if objectstore 'jate' does not exist, create it and increment it automatically
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  //exports function putDB which will add to database

  console.log('Post to the database');
  const contentDb = await openDB('jate', 1);
  //create connection to 'jate' database

  const tx = contentDb.transaction('jate', 'readwrite');
  //dictates which database on the its data privileges.

  const store = tx.objectStore('jate');

  const request = store.put({jate: content});
  //update the content
  const result = await request;
  console.log('Data saved to database', result);
};


export const getDb = async () => {
  //export function to get data from database

  console.log('Get data from database');
  const contentDb = await openDB('jate', 1);
  //create connection to jate database

  const tx = contentDb.transaction('jate', 'readonly');
  //dictates which database and its data privilege

  const store = tx.objectStore('jate');

  const request = store.getAll();
  //gets all the data in the jate database

  const result = await request;
  console.log('Data from database', result);
  return result;
}


initdb();
//start database
