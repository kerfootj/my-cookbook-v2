import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Recipe from './Recipe';
import { Home } from './pages/Home';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/recipe/:id" component={Recipe} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}
