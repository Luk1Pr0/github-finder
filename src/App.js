import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';
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
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/user/:login' component={User} />
                                <Route component={NotFound} />
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
