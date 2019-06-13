/**
 * author: https://github.com/Simple-MAX
 * Praktil MVC - app.js
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(expressSession);
const helpers = require('handlebars-helpers')();

const config = require('./config.json');
require('./config/passport')(passport);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();

mongoose.connect(`mongodb://${config.dbUsername}:${config.dbPass}@ds141815.mlab.com:41815/heroku_v142fhx1`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log('Connection has been made ...');
}).on('error', (error) => {
    console.log('Connection error: ', error);
});

// Create `ExpressHandlebars` instance with a default layout.
const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers         : helpers,
    layoutsDir: './views/layouts/',
    // Uses multiple partials dirs, templates in "views/templates/" are shared
    partialsDir: [
        './views/templates/',
        './views/partials/'
    ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger(':date[clf]'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// , saveUninitialized: true, resave: true
app.use(expressSession({
    secret: 'max',
    saveUninitialized: true,
    resave: true,
    // using store session on mongo
    store: new MongoStore({
        url: `mongodb://${config.dbUsername}:${config.dbPass}@ds141815.mlab.com:41815/heroku_v142fhx1`,
        collection: 'sessions'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Messages Middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
})

// Global Vars
/*
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    next();
});
*/
app.use('/uploads/jobs/', express.static('uploads/jobs/'));
app.use('/uploads/profiles/', express.static('uploads/profiles/'));


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/authentication', usersRouter);

var route, routes = [];

app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route);
    } else if (middleware.name === 'router') { // router middleware 
        middleware.handle.stack.forEach(function (handler) {
            route = handler.route;
            route && routes.push(route);
        });
    }
});

routes.forEach(function (temp) {
    var methods = "";
    for (var method in temp.methods) {
        methods += method + ", ";
    }
    console.log(temp.path + ": " + methods);
});

module.exports = app;