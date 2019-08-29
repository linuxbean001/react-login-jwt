import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import AuthService from '../../serviecs/AuthService';
const Auth = new AuthService();
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
     
    }
    componentDidMount() {
     
    }
    logout = () => {
        Auth.logout();
        this.props.history.replace('/');
    }
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  <a className="navbar-brand" href="#">Logo</a>
  <ul className="navbar-nav">
    <li className="nav-item">
        <Link className="nav-link" to={"/user-list"}>UserList</Link>
     
    </li>
    <li className="nav-item">
    <Link className="nav-link" to={"/profile"}>Profile</Link>
    </li>
    <li className="nav-item">
    <button className="button" onClick={this.logout.bind(this)}>Logout</button>
    </li>
  </ul>
</nav>
               
            </div>
        );
    }
}

export default withRouter(Header); 
