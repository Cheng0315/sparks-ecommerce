import storage from 'redux-persist/lib/storage';

/* Redux Persist Configuration */
/* Store only user object in local storage */
const reduxPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

export default reduxPersistConfig;