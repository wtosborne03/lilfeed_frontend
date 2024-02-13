// db.js
import Dexie from 'dexie';

const db = new Dexie('SavedPages');
db.version(1).stores({
    cache: '&key, value'
});


export default db;