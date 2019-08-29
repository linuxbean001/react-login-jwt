
import axios from 'axios';
//export default class RegisterService extends AuthService {
export default class RegisterService {

    constructor() {
        this.domain = 'http://localhost:3300'; // API server domain
    }
    registerUser(userInfoVo) {
        return axios.post(this.domain + '/api/v1/user/addUser', userInfoVo) 
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getUserAll() {
        return axios.get(this.domain + '/api/v1/user/getUser')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    deleteUserById(id) {
        return axios.delete(this.domain + '/api/v1/user/delUser/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    EditUserInfo(userInfoVo) {
        return axios.post(this.domain + '/api/v1/user/editUser', userInfoVo)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    searchUserByName(searchText) {
        return axios.get(this.domain + '/api/v1/user/searchData/'+searchText)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    registerInfo(userInfoVo) {
        console.log('xxxxxxx info', userInfoVo);
        
        return axios.post(this.domain + '/api/v1/user/addUserInfo', userInfoVo)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AllEmployee() {
        return axios.get(this.domain + '/api/v1/user/getEmpList')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
   
}
