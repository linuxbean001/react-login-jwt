import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RegisterService from '../../serviecs/registerServiecs';
import AuthService from '../../serviecs/AuthService';
const Auth = new AuthService();
const API = new RegisterService();
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            lists: [],
            selectedFile: null
        }
        this.registerMe = this.registerMe.bind(this);
    }
    componentDidMount() {
        //  if (Auth.loggedIn()){
        //      this.props.history.replace('/');
        //      Auth.getProfile();
        //  }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    registerMe(e) {
        console.log('xxxxxxxx img', this.state.selectedFile);
        var formData = new FormData()
        formData.append('image', this.state.selectedFile)
        formData.append('username', this.refs.username.value)
        formData.append('email', this.refs.email.value)
        formData.append('password', this.refs.password.value)
         console.log('xxxxxxxxxx dtat', formData);
        
        API.registerInfo(formData)
            .then((result) => {
                console.log('xxx ', result);
                this.props.history.replace('/');
            }).catch(err => {
                console.log('xxx', err);
            })

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    fileChangedHandler = event => {
        console.log('xxxxxx hello',  event.target.files[0]);
        
        this.setState({ selectedFile: event.target.files[0] })
        console.log('xxxxxxx image', this.state.selectedFile);

    }
    render() {
        return (
            <div>
                <div id="register">
                    <h3 className="text-center text-white pt-5">Register form</h3>
                    <div className="container">
                        <div id="register-row" className="row justify-content-center align-items-center">
                            <div id="register-column" className="col-md-6">
                                <div id="register-box" className="col-md-12">
                                    <form id="register-form" className="form" action="" method="post">
                                        <h3 className="text-center text-info">Register</h3>
                                       
                                        <div className="form-group">
                                            <label htmlFor="username" className="text-info">UserName:</label><br></br>
                                            <input type="text" ref="username" name="username" value={this.state.fields["username"]}
                                            onChange={this.handleChange.bind(this, "username")} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-info">Email:</label><br></br>
                                            <input type="text" ref="email" name="email" value={this.state.fields["email"]}
                                            onChange={this.handleChange.bind(this, "email")} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="text-info">Password:</label><br></br>
                                            <input type="text" ref="password" name="password" value={this.state.fields["password"]}
                                            onChange={this.handleChange.bind(this, "password")} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="file" className="text-info">Profile Image:</label><br></br>
                                            <input type="file" onChange={this.fileChangedHandler}/>
                                        </div>
                                        <div className="form-group">

                                            <input onClick={this.registerMe} type="button" name="submit" className="btn btn-info btn-md" value="submit" />
                                        </div>
                                        <div id="register-link" className="text-right">
                                            <Link to={"/"} className="text-info">Login</Link>
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

export default Register; 
