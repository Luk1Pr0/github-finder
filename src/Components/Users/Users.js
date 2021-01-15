import React, { Component } from 'react'
import UserItem from './UserItem';

class Users extends Component {

    state = {
        users: [
            {
                "login": "kevinclark",
                "id": 20,
                "avatar_url": "https://avatars3.githubusercontent.com/u/20?v=4",
                "html_url": "https://github.com/kevinclark",
            },
            {
                "login": "technoweenie",
                "id": 21,
                "avatar_url": "https://avatars3.githubusercontent.com/u/21?v=4",
                "html_url": "https://github.com/technoweenie",
            },
            {
                "login": "macournoyer",
                "id": 22,
                "avatar_url": "https://avatars3.githubusercontent.com/u/22?v=4",
                "html_url": "https://github.com/macournoyer",
            }
        ]
    }

    render() {
        const { users } = this.state;
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}



export default Users
