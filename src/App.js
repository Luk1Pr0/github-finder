import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://api.github.com/users')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ users: data, loading: false })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className="container" style={{ paddingTop: '4rem' }}>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
