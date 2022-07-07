const { Router } = require("express");
const { authentication, sign } = require("../middleware");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = Router();

router.get("/me", authentication, async (req, res) => {
    res.json({
        user: req.token.user
    })
});

router.post('/register', async (req,res) => {
    const {username,password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide username and password"
        });
    }

    let user = await User.findOne({username});
    if(user) return res.status(400).json({message: 'User already exists'});

    if(password.length < 8 || !password.match(/[A-Z]/)) {
        return res.status(400).json({
            message: "The password must have at least 8 characters and a capital letter"
        });
    }

    user = await new User({
        username: username,
        password: bcrypt.hashSync(password, 10)
    }).save();

    res.json({
        message: "User created successfully"
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            message: "Please provide username and password"
        });
        return;
    }

    const user = await User.findOne({ username: username }).exec();

    if (!user) {
        res.status(400).json({
            message: "User not found"
        });
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(400).json({
            message: "Invalid password"
        });
        return;
    }

    sign(user.username, (err,token) => {
        if(err) return res.status(500).json({message: 'Error signing token'});
        res.json({
            message: "User logged in successfully",
            token
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.user = null
    req.session.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }

        req.session.regenerate((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }

            res.json({
                logged: false
            });
        });
    })
});


module.exports = router;