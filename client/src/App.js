import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from './Components/login/login';
import Register from './Components/register/register';
import Profile from './Components/profile/profile';
import UserList from './Components/user-list/user-list';
import Header from './Components/header/header';

function App() {
  return (
    <div className="App">
       <Router>
          <div>
            <Header />
            <hr />
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/user-list" component={UserList} />
           
          </div>
        </Router>
    </div>
  );
}

export default App;
