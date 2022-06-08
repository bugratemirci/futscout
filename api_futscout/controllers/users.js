const User = require("../models/User");
var ObjectID = require('mongodb').ObjectID;

const signUp = (req, res, next) => {
    const { userreq } = req.body;

    const user = new User({
        username: userreq.username,
        password: userreq.password,
        team: userreq.team,
        mail: userreq.mail,
        tel: userreq.tel
    });

    user.save((err, data) => {
        if (err)
            res.json({ status: false })
        else
            res.json({ status: true });
    })
}

const signIn = (req, res, next) => {
    const { userreq } = req.body;
    console.log(userreq);
    User.findOne({ username: userreq.username, password: userreq.password }, (err, data) => {
        if (data)
            res.json({ status: true, user: data });
        else
            res.json({ status: false })
    });

}
const getUser = (req, res, next) => {
    const { username } = req.body;

    User.findOne({ username: username }, (err, data) => {
        if (data)
            res.json({ user: data });
        else
            res.json({ status: false })
    });
}
const updateUser = async (req, res, next) => {
    const { username, password, id, team, mail, tel, isPremium, isAdmin } = req.body;

    const user = await User.updateOne({ _id: id },
        {
            $set:
                { username: username, password: password, team: team, mail: mail, tel: tel, isPremium: isPremium, isAdmin: isAdmin }
        });

    res.status(200).json({
        status: true,
        user: user
    });
}
module.exports = {
    signUp,
    signIn,
    getUser,
    updateUser
};