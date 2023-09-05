require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true })
    .then(() => {
        console.log('Success a connect DataBase');
        app.emit('Ok')
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
//const helmet = require('helmet');
const CSRF = require('csurf');
const { middlewareGlobal, checkCSRFErr, csrfMiddlewareTk } = require('./src/middlewares/middlewares');

//app.use(helmet());
//Quando utiliza-se o localhost, evitar usar o Helmet pois dá erro com arquivos CDN, scripts e CSS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'hse164ATGBT6414@sddfn$FLAjn#4165548/()$asFJGhg4.',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true
    }
})

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(sessionOptions);
app.use(flash());

app.use(CSRF());
//Middleware próprios
app.use(checkCSRFErr);
app.use(csrfMiddlewareTk);
app.use(middlewareGlobal);
app.use(routes);

app.on('Ok', () => {
    app.listen(3000, () => {
        console.log();
        console.log('Servidor online');
        console.log('http://localhost:3000');
    });
})
