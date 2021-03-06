import React from 'react';
import './App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
//components
import Navigation from './components/main/Navigation';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route
                    path="/"
                    render={() => {
                        return <Navigation />;
                    }}
                />
            </Router>
        );
    }
}
export default App;
