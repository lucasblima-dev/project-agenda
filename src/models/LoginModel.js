const mongoose = require('mongoose');
const validator = require('validator'); //Checar e-mail
const bcryptjs = require('bcryptjs'); //Hash para senhas na DB

const LoginSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.validation();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async login() {
        this.validation();
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('User does not exist!');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Password invalid');
            this.user = null;
            return;
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) this.errors.push('E-mail already registered');
    }

    validation() {
        this.cleanUp();

        if(this.body.firstName === "") {
            this.errors.push('First Name is required!');
        }

        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail invalid!');
        }

        if(this.body.password.length < 8) {
            this.errors.push('Password must contain at least 8 characters.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
            firstName: this.body.firstName
        }
    }
}

module.exports = Login;
