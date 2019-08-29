import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Modal, Button, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink,withRouter } from "react-router-dom";
import RegisterService from '../../serviecs/registerServiecs';
import AuthService from '../../serviecs/AuthService';
const Auth = new AuthService();
const Reg = new RegisterService();
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            show: false,
            userDetails: {},
            fields: {},
            id: '',
            fname: '',
            email: '',
            message: '',
            showAlert:false
        };

        this.getAllUser = this.getAllUser.bind(this); 
        this.handleHide = this.handleHide.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.searchName = this.searchName.bind(this);

    }
    componentDidMount() {
       
        if (!Auth.loggedIn()){
            this.props.history.replace('/');
        }else{
            Auth.getProfile();
            this.getAllUser();
        }
        
    }
    handleHide() {
        this.setState({ show: false });
    }

    searchName(e) {
        const searchText = e.target.value;
        console.log('xxxxxxx ddd', searchText);
        
        Reg.searchUserByName(searchText)
            .then(res => {
                console.log('xxxxxxxx search', res);
                if (res.data.data.length > 0) {
                    this.setState({ users: res.data.data });
                }

            }).catch(err => {
                console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
            });

    }
    getAllUser() {
        Reg.getUserAll()
            .then(res => {
                this.setState({ users: res.data.data });
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    delUser(id) {
      
        Reg.deleteUserById(id)
            .then(res => {
                this.getAllUser();
                console.log('xxxxxxxx', res);
                if (res.data.success) {
                    this.setState({
                        showAlert: true,
                        color: 'success',
                        message: res.data.message

                    });

                    setTimeout(
                        function () {
                            this.setState({ showAlert: false });
                        }
                            .bind(this),
                        2000
                    );

                } else {
                    this.setState({
                        showAlert: true,
                        color: 'warning',
                        message: res.data.message

                    });

                }

            }).catch(err => {
                console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
            });

    }

    EditUser(user) {
        console.log('xxxxxxx xxxx user data ', user);

        this.setState({
            show: true,
            userDetails: user

        });
    }

    handleUpdateSubmit() {
        const userInfoVo = {
            'id': this.refs.id.value,
            'username': this.refs.username.value,
            'email': this.refs.email.value,
            'message': this.refs.message.value
        }

        Reg.EditUserInfo(userInfoVo)
            .then((result) => {
                console.log('xxx ', result);
                this.getAllUser();
                this.setState({ show: false});
                if (result.data.success) {
                    this.setState({
                        showAlert: true,
                        color: 'success',
                        message: result.data.message

                    });

                    setTimeout(
                        function () {
                           
                            this.setState({ showAlert: false });
                        }
                            .bind(this),
                        2000
                    );

                } else {
                    this.setState({
                        showAlert: true,
                        color: 'warning',
                        message: result.data.message

                    });

                }
               
            }).catch(err => {
                console.log('xxx', err);
            });

        console.log('xxxxxxxxx', userInfoVo);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div className="height100">
                <div className="container">
                    <section>

                        <h1> User List</h1>
                        {this.state.showAlert ? (
                            <Alert bsStyle={this.state.color}>
                                <strong>{this.state.message}</strong>
                            </Alert>

                        ) : (
                                null

                            )}
                        <div className="form-group">
                            <label>Search</label>
                            <input className="form-control" placeholder="Write your name here" value={this.state.value} onKeyUp={this.searchName} fullWidth={true} />
                        </div>
                        <table className="table">
                            <thead>
                                <th>Img</th>
                                <th>Name</th>
                                <th>Email</th>

                                <th>Action</th>
                            </thead>
                            <tbody>
                                {this.state.users.map((user, index) =>
                                    <tr key={index}>
                                         <td><img className="img-box" src={"upload/"+user.image}/></td>
                                         <td>{user.username}</td>
                                        <td>{user.email}</td>
                                       
                                        <td>
                                            <button className="btn btn-sm btn-warning" onClick={this.EditUser.bind(this, user)}>
                                            <i className="fa fa-edit"></i>
                                            </button>&nbsp;
                                            <button className="btn btn-sm btn-danger" onClick={this.delUser.bind(this, user._id, index)}>
                                            <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Contained Modal
            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form >
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input className="form-control" onChange={this.handleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.userDetails._id} />
                                        <input className="form-control" onChange={this.handleChange.bind(this, "username")} type="text" ref="username" id="username" name="username" defaultValue={this.state.userDetails.username} placeholder="Write your name here" required="" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className="form-control" onChange={this.handleChange.bind(this, "email")} ref="email" type="email" id="email" name="email" defaultValue={this.state.userDetails.email} placeholder="Enter your email address" required="" />
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea ref="message" onChange={this.handleChange.bind(this, "message")} defaultValue={this.state.userDetails.message} className="form-control" id="message" name="message" placeholder="Enter free text, your purpose etc." rows="6"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input className="submit_btn btn custom_theme_btn" onClick={this.handleUpdateSubmit} type="button" value="Send" />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleHide}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </section>
                </div>
            </div>
        );
    }
}

export default withRouter(UserList) ;