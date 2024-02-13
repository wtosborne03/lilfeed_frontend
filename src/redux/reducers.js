import { combineReducers } from 'redux';
import {
    FETCH_PAGE_DATA, FETCH_PAGE_DATA_LOADING, FETCH_PAGE_DATA_FAILURE, SET_USER_DATA,
    SET_USER_PROFILE,
    SET_LOADING,
    SET_ERROR,
    FETCH_POST_DATA,
    FETCH_POST_LOAD,
    FETCH_POST_FAIL
} from '../actions/types';

const userInitialState = {
    user: null,
    loading: true,
    error: null
};

const dataInitialState = {
    data: null,
    loading: true,
    error: null
};

const postInitialState = {
    post: null,
    loading: true,
    error: null
}




const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
                loading: false,
                error: null
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};


const dataReducer = (state = dataInitialState, action) => {
    switch (action.type) {
        case FETCH_PAGE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case FETCH_PAGE_DATA_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PAGE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

const postReducer = (state = postInitialState, action) => {
    switch (action.type) {
        case FETCH_POST_DATA:
            return {
                ...state,
                post: action.payload,
                loading: false,
                error: null
            };
        case FETCH_POST_LOAD:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export default combineReducers({
    post: postReducer,
    user: userReducer,
    data: dataReducer
});