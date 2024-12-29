import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';
import reduxPersistConfig from '../config/reduxPersistConfig';

/* Utilize persistReducer to enable reducers persistence */
const persistedReducer = persistReducer(reduxPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /* Ignored actions in redux persist*/
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

/* Manage the persistence of the store */
const persistor = persistStore(store);

export { store, persistor };

