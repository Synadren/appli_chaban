import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './page/homePage';
import SinglePage from './page/singlePage';
import NotFoundPage from './page/notFoundPage';
import './style/style.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component{

    render(){
        return(
            <Router>
                <div>
                    <Route path="/:id" component={SinglePage} />
                    <Route path="/" exact component={HomePage} />
                    <Route path="/404" component={NotFoundPage} />
                    
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

