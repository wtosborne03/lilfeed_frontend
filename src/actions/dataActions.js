// @ts-nocheck
import client from '../axios-client';
import {
    FETCH_PAGE_DATA, FETCH_PAGE_DATA_FAILURE, FETCH_PAGE_DATA_LOADING,
    FETCH_USER_DATA,
    UPDATE_USER_PROFILE,
    SET_USER_DATA,
    SET_USER_PROFILE,
    SET_LOADING,
    SET_ERROR,
    FETCH_POST_LOAD,
    FETCH_POST_DATA,
    FETCH_POST_FAIL
} from './types';

import db from '../redux/db';

export const fetchData = (number) => async dispatch => {
    try {
        const cacheKey = `PAGE_${number}`;
        db.cache.get(cacheKey).then(async (cachedResult) => {
            if (cachedResult) {
                await dispatch({
                    type: FETCH_PAGE_DATA,
                    payload: cachedResult.value
                });
                //post-load
                const res = await client.get('/user/' + number);

                db.cache.put({ key: cacheKey, value: res.data }).then((a) => {
                    dispatch({ type: FETCH_PAGE_DATA, payload: res.data });
                });

            } else {
                dispatch({ type: FETCH_PAGE_DATA_LOADING, payload: true });
                const res = await client.get('/user/' + number);

                db.cache.put({ key: cacheKey, value: res.data }).then((a) => {
                    dispatch({ type: FETCH_PAGE_DATA, payload: res.data });
                });
            }
        });
    } catch (error) {
        // Dispatch an action to set error state if an error occurs
        dispatch({
            type: FETCH_PAGE_DATA_FAILURE,
            payload: error.message
        });
        console.error(error);
    }
};
// actions.js

export const fetchUserData = (number) => async dispatch => {
    const cacheKey = `USER`;
    db.cache.get(cacheKey).then(async (cachedResult) => {
        if (cachedResult) {
            console.log(
                'gabre'
            );

            await dispatch({
                type: SET_USER_DATA,
                payload: cachedResult.value
            });
            console.log('grebbe');
            //post-load
            var data;
            try {
                const res = await client.get('/user');
                data = res.data;
            } catch (e) {
                data = null;
            }
            console.log('user_data:');
            console.log(data);

            db.cache.put({ key: cacheKey, value: data }).then((a) => {
                dispatch({ type: SET_USER_DATA, payload: data });
            });

        } else {
            dispatch({ type: SET_LOADING, payload: true });
            try {

                const res = await client.get('/user').catch(err => { throw err });
                db.cache.put({ key: cacheKey, value: res.data }).then((a) => {
                    dispatch({ type: SET_USER_DATA, payload: res.data });
                    dispatch({ type: SET_LOADING, payload: false });
                });
            } catch (error) {
                console.log("GOT");
                // Dispatch an action to set error state if an error occurs
                dispatch({
                    type: SET_ERROR,
                    payload: error.message
                });
                console.error(error);
            }

        }
    });

};

export const fetchPost = (number, slug) => async dispatch => {
    try {
        const cacheKey = `POST_${number}_${slug}`;
        db.cache.get(cacheKey).then(async (cachedResult) => {
            if (cachedResult) {
                await dispatch({
                    type: FETCH_POST_DATA,
                    payload: cachedResult.value
                });
                //post-load
                const res = await client.get('/post/' + number + '/' + slug);
                console.log(res.data);
                db.cache.put({ key: cacheKey, value: res.data }).then((a) => {
                    dispatch({ type: FETCH_POST_DATA, payload: res.data });
                });

            } else {
                dispatch({ type: FETCH_POST_LOAD });
                const res = await client.get('/post/' + number + '/' + slug);

                db.cache.put({ key: cacheKey, value: res.data }).then((a) => {
                    dispatch({ type: FETCH_POST_DATA, payload: res.data });
                });
            }
        });
    } catch (error) {
        // Dispatch an action to set error state if an error occurs
        dispatch({
            type: FETCH_POST_FAIL,
            payload: error.message
        });
        console.error(error);
    }
};

export const updateUserProfile = (name, bio) => async dispatch => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const updateResponse = await client.put('/user', { name, bio });
        db.cache.put({ key: cacheKey, value: updateResponse.data.user }).then((a) => {
            dispatch({ type: SET_USER_DATA, payload: updateResponse.data.user });
        });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
        dispatch({ type: SET_LOADING, payload: false });
    }
};