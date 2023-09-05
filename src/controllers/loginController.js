const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    
    return res.render('login.ejs');
}

exports.cAccount = (req, res) => res.render('c-account.ejs');


exports.register = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            })
            return;
        };

        req.flash('success', 'User created successfully!');
        req.session.save(() => {
            return res.redirect('back');
        })
    } catch (e) {
        console.log(e);
        return res.render('error.ejs');
    }
}

exports.login = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            })
            return;
        };

        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('back');
        })
    } catch (e) {
        console.log(e);
        return res.render('error.ejs');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}