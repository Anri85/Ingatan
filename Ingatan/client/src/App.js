import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

// importing components
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import PostDetail from './components/posts/postDetail/PostDetail';
import User from './components/user/User';

const App = () => {
    return (
        <Router>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={() => <Redirect to='/posts' />} />
                    <Route path='/posts' component={Home} />
                    <Route path='/posts/search' component={Home} />
                    <Route path='/post/:id' component={PostDetail} />
                    <Route path='/user' component={User} />
                </Switch>
            </Container>
        </Router>
    )
};

export default App;