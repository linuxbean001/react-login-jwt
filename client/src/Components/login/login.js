import React, { Component } from 'react';
import { Link,withRouter } from "react-router-dom";
import AuthService from '../../serviecs/AuthService';
const Auth = new AuthService();
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
        }
        this.LoginMe = this.LoginMe.bind(this);
      
    }

    componentDidMount() {
        console.log('xxxxxxx ----', Auth.loggedIn());
        
    }

    LoginMe(e) {
        const userInfoVo = {
            'username': this.refs.username.value,
            'password': this.refs.password.value
        }
        Auth.login(userInfoVo)
            .then((result) => {
                console.log('xxx results ', result);
                this.props.history.replace('/profile');
            }).catch(err => {
                console.log('xxx', err);
            })

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div>
               <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label for="username" className="text-info">Username:</label><br></br>
                                <input type="text" ref="username" id="username" name="username" value={this.state.fields["username"]}
                                    onChange={this.handleChange.bind(this, "username")} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label for="password" className="text-info">Password:</label><br></br>
                                <input type="text" ref="password" type="password" id="password" name="password" value={this.state.fields["password"]}
                                    onChange={this.handleChange.bind(this, "password")} className="form-control"/>
                            </div>
                            <div className="form-group">
                                
                                <input className="button btn " onClick={this.LoginMe} type="button" value="Send" />
                            </div>
                            <div id="register-link" className="text-right">
                                <Link to={"/register"} className="text-info">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

            </div>
        );
    }
}

export default withRouter(Login); 
