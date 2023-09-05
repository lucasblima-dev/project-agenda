exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCSRFErr = (err, req, res, next) => {
    if(err){
        return res.render('error.ejs');
    }
    next();
}

exports.csrfMiddlewareTk = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'User not identified');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}