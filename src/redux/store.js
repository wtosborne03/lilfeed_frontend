// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import db from './db';

// Create a thunk middleware that checks the cache before making a network request




// Create the Redux store with the cache middleware

export const r_store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});