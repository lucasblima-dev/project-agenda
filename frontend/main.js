import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Login from './assets/modules/Login';
import Account from './assets/modules/NewAccount';
import Contact from './assets/modules/Contact';

const makeLogin = new Login('.form-login');
const cAccount = new Account('.form-account');
const newContact = new Contact('.form-contact');

makeLogin.init();
cAccount.init();
newContact.init();