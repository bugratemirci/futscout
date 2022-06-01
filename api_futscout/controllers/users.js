const User = require("../models/User");

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

    User.findOne({ username: userreq.username, password: userreq.password }, (err, data) => {
        if (data)
            res.json({ status: true, user: data });
        else
            res.json({ status: false })
    });

}


module.exports = {
    signUp,
    signIn
};