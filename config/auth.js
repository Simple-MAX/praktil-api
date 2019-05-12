module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            console.log('authentication successful');
            next();
        } else {
            console.log('authentication failed');
            res.redirect('/');
        }
    }
}