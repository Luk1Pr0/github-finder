import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import './App.css';

const App = () => {

    const [repos, setRepos] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Search Github users
    const searchUsers = (text) => {
        setLoading(true);
        fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => {
                setUsers(data.items);
                setLoading(false);
            })
            .catch(err => console.log(err));
    };


    // Get single github user
    const getUser = (username) => {
        setLoading(true);
        fetch(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => console.log('Something went wront', err));
    }

    // Get User repositories
    const getUserRepos = (username) => {
        setLoading(true);
        fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:dsc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then(resp => resp.json())
            .then(data => {
                setRepos(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    // Clear users from state
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // Display alert when search is empty
    const displayAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    }

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
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={users.length > 0 ? true : false}
                                        setAlert={displayAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/user/:login' render={props => (
                            <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />
                        )} />
                    </Switch>
                    <Alert alert={alert} />
                </div>
            </div>
        </Router>
    );
}

export default App;
