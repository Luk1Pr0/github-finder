import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {

    const [alert, setAlert] = useState(null);

    // Display alert when search is empty
    const displayAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    }

    return (
        <GithubState>
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
                                        <Search setAlert={displayAlert} />
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
        </GithubState>
    );
}

export default App;
