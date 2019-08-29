const User = require('../models/registerModel');
const jwt = require('jsonwebtoken');

exports.addUserTODb = async (req, res, next) => { 
    const user = new User({
        fname: req.body.fname,
        email: req.body.email,
        message: req.body.message,
    }); 

    try {
        let result = await user.save();
        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message:'User insert Successfully'

            });
        }
    } catch (err) {

        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}

exports.getUserTODb = (req, res, next) => {
    // res.status(200).json({
    //     k: "uikldywyo2iydo8yo8"
    // });
    
    User.find({}).then(result => {

        console.log('xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }

    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delUserTODb = (req, res, next) => {
   
    User.remove({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'User delete successfully'
            });

        }

    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'User not delete'
        });
        console.log('xxx x xxx', err);
    });
}

exports.editUserTODb = async (req, res, next) => {
    
    try {
        const result = await User.findByIdAndUpdate({ _id: req.body.id, }, {
            username: req.body.username,
            email: req.body.email,
            message: req.body.message,
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'User Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: result,
            success: false,
            message: 'User not Update successfully'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

exports.searchUserTODb = (req, res, next) => {
    console.log('xxx x xxx', req.params.username);
    User.find({ username: req.params.username }).then(result => {
        console.log('xxx x xxx', result);
        if (result) {
            res.status(201).json({
                data: result
            });

        }

    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.getUserLoginTODb = async (req, res, next) => {
    console.log('xxxxxxxxxx xxxxx', req.body.email);
    
    User.findOne({ email: req.body.email.username, password: req.body.email.password })
    .then(data => {
        if (data) {
            console.log('login data', data);
            const token = jwt.sign({
                email: data.email,
                _id: data._id,
                image: data.image,
            },
                '@' + data._id + '-' + data.email,
                {
                    expiresIn: "1h"
                });
            res.status(201).json({
                message: "Loged In",
                token: token
            });
        } else {
            res.status(201).json({
                message: "Unauthorised",
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: err,
        });
    })
}