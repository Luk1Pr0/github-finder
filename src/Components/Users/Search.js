import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Search extends Component {

    state = {
        search: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: '' });
    }

    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div style={style}>
                <form onSubmit={this.onSubmit} className='form'>
                    <input type="text" name='text' placeholder='Search users...' onChange={this.onChange} />
                    <button type="submit" value='search' className='btn btn-dark btn-block'>Search</button>
                </form>
                {showClear ? <button className='btn btn-light btn-block' onClick={clearUsers}>Clear Search</button> : null}
            </div>
        )
    }
}

const style = {
    marginTop: '5rem',
}

export default Search;
