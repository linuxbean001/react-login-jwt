const express = require('express');
const router = express.Router();
const userCon = require('../controller/userCon'); 
const registerCon = require('../controller/registerCon'); 
const checkAuth = require('../middleware/check-auth');

router.get('/getUser', userCon.getUserTODb);
router.post('/login', userCon.getUserLoginTODb);
router.post('/addUser', userCon.addUserTODb);

router.delete('/delUser/:id', userCon.delUserTODb);

router.post('/editUser', userCon.editUserTODb);

router.get('/searchData/:username', userCon.searchUserTODb);

router.post('/addUserInfo', registerCon.addRegisterTODb); 

router.get('/getEmpList', registerCon.getEmpListTODb); 

module.exports = router; 