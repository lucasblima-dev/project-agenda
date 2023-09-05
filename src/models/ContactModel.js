const mongoose = require('mongoose'); //import { Schema, model } from 'mongoose';
const validator = require('validator'); //import { isEmail } from 'validator';

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    cellphone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    createIn: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.validation();
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    validation() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail invalid!');
        }

        if (!this.body.firstName) this.errors.push('Name is required!');
        if (!this.body.cellphone && !this.body.email) this.errors.push('At least one contact is required!');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            cellphone: this.body.cellphone,
            email: this.body.email
        }
    }

    async edit(id) {
        if(typeof id !== 'string') return;

        this.validation();
        if(this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    //Methods statics
    static async findId(id) {
        if(typeof id !== 'string') return;

        const user = await ContactModel.findById(id);
        return user;
    }
    
    static async findContacts() {
        const contacts = await ContactModel.find()
            .sort({ createIn: 1 });
        return contacts;
    }

    static async delete(id) {
        if(typeof id !== 'string') return;

        //const contact = await ContactModel.findByIdAndDelete({ _id: id });
        const contact = await ContactModel.findByIdAndDelete(id);
        return contact;
    }
}

module.exports = Contact;
