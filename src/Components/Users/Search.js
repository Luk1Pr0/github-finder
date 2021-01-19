import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showClear, clearUsers, setAlert }) => {

    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            setAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    }

    return (
        <div className='search-comp' style={style}>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type="text"
                    name='text'
                    placeholder='Search users...'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>
            {showClear ? <button className='btn btn-light btn-block' onClick={clearUsers}>Clear Search</button> : null}
        </div>
    );
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const style = {
    marginTop: '5rem',
}

export default Search;
