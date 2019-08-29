import React, { Component } from 'react';
import AuthService from '../../serviecs/AuthService';
const Auth = new AuthService();
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
      
    }

    componentDidMount() {
       
        if (!Auth.loggedIn()){
            this.props.history.replace('/');
        }else{
            Auth.getProfile();
        }
        
    }
    render() {
        return (
            <div>
                <h1>Profile</h1>

            </div>
        );
    }
}

export default Profile; 
