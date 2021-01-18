import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       this.setState({ users: data, loading: false })
  //     })
  //     .catch(err => console.log(err));
  // }

  // Search Github users
  searchUsers = (text) => {
    this.setState({ loading: true });
    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ users: data.items, loading: false })
      })
      .catch(err => console.log(err));
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
