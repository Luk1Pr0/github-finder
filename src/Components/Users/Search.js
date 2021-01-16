import React, { Component } from 'react'

class Search extends Component {

    state = {
        search: ''
    }

    setSearch = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.text);
    }

    render() {
        return (
            <div style={style}>
                <form onSubmit={this.onSubmit} className='form'>
                    <input type="text" name='text' placeholder='Search users...' onChange={this.setSearch} />
                    <input type="submit" value='search' className='btn btn-dark btn-block' />
                </form>
            </div>
        )
    }
}

const style = {
    marginTop: '5rem',
}

export default Search;
