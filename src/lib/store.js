import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import { rootReducer } from './rootReducer';
import { middleware } from './middleware';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export const persistor = persistStore(store);
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;

export default store;
