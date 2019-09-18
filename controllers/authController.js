const User = require('./../controllers/userController');

exports.signUp = async (req, res, next => {
    
    const newUser = await User.create(req.body)
    const savedUser = await newUser.save()

    res.status(201).json({
            status: "success"
            data: {
                user: newUser
            }
    })
};
