import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import './App.css';

class App extends Component {

    state = {
        repos: [],
        users: [],
        user: {},
        loading: false,
        alert: null,
    };

    // Search Github users
    searchUsers = (text) => {
        this.setState({ loading: true });
        fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => this.setState({ users: data.items, loading: false }))
            .catch(err => console.log(err));
    };


    // Get single github user
    getUser = (username) => {
        this.setState({ loading: true });
        fetch(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => this.setState({ user: data, loading: false }))
            .catch(err => console.log(err));
    }

    // Get User repositoeries
    getUserRepos = (username) => {
        this.setState({ loading: true });
        fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:dsc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => this.setState({ repos: data, loading: false }))
            .catch(err => console.log(err));
    }

    // Clear users from state
    clearUsers = () => this.setState({ users: [], loading: false });

    // Set alert
    setAlert = (message, type) => {
        this.setState({ alert: { message, type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    }

    render() {
        const { user, users, loading, repos } = this.state;
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={users.length > 0 ? true : false}
                                            setAlert={this.setAlert}
                                        />
                                        <Users loading={loading} users={users} />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading} />
                            )} />
                        </Switch>
                        <Alert alert={this.state.alert} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
