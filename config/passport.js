const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../api/models/user');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'Email is not registered'
                        });
                    }
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) {
                            throw error;
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'password incorrect'
                            })
                        }
                    });
                }).catch(error => console.log(error));
        })
    );

    passport.serializeUser((user, done) => {
        console.log('serializing user: ');
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('no im not serial');
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
}