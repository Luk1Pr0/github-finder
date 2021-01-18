import React, { Component } from 'react';
import './App.css';

import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';

class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null,
  };

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
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set alert
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
