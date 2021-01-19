import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

const GithubState = (props) => {
    const initialState = {
        users: [],
        repos: [],
        user: {},
        loading: false,
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Github users
    const searchUsers = (text) => {
        setLoading();
        fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => {
                dispatch({ type: SEARCH_USERS, payload: data });
            })
            .catch(err => console.log(err));
    };
    // Get user

    // Get repos

    // Clear Users

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;