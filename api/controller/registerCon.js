const Register = require('../models/registerModel');

exports.addRegisterTODb = async (req, res, next) => {  
    const reg = new Register({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        image: req.file.originalname
    }); 

    try {
        let result = await reg.save();
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

exports.getEmpListTODb = (req, res, next) => {
   
    Register.find({}).then(result => {

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