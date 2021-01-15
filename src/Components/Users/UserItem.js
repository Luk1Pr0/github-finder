import React, { Component } from 'react'

class UserItems extends Component {
    render() {
        const { login, avatar_url, html_url } = this.props.user;
        return (
            <div>
                <div className='card text-center'>
                    <img
                        src={avatar_url}
                        className='round-img'
                        alt="avatar"
                        style={{ width: '60px' }}
                    />
                    <h3>{login}</h3>
                    <div>
                        <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItems
