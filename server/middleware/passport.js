//To extract JWT from Header
const passport = require('passport');
const localStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy; //Class, its a constructor function
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userController = require('../controllers/user.controller');

//local login - check local db
const localLogin = new localStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user ? done(null, user) : done(null, false, { error: 'Your Login credentials are not valid, Please try again !' });
});

const jwtLogin = new jwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtsecret
}, async(payload, done) => {
    const user = userController.getUserById(payload._id);
    return user ? done(null, user) : done(null, false, { error: 'Your Login credentials are not valid, Please try again !' });
});

module.exports = passport.use(localLogin).use(jwtLogin);