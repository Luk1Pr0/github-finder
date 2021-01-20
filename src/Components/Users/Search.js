import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

    const githubContext = useContext(GithubContext);

    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alertContext.setAlert('Please enter something', 'light');
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
            {githubContext.users.length ? <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear Search</button> : null}
        </div>
    );
}

const style = {
    marginTop: '5rem',
}

export default Search;
