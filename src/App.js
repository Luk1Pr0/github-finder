import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {

    return (
        <GithubState>
            <AlertState>
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
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/user/:login' component={User} />
                            </Switch>
                            <Alert alert={alert} />
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
}

export default App;
