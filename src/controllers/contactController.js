// const { async } = require("regenerator-runtime");
// const { use } = require("../../routes");
const Contact = require('../models/ContactModel');

exports.index = (req, res) => res.render('contact.ejs', {contact: {} });

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact created successfully!');
        //req.session.save(() => res.redirect('/contact'));
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('error.ejs');
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('error.ejs');

    const contact = await Contact.findId(req.params.id);

    if(!contact) return res.render('error.ejs');

    res.render('contact.ejs', { contact });
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('error.ejs');

        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact edited successfully!');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('error.ejs');
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('error.ejs');

    const contact = await Contact.delete(req.params.id);

    if (!contact) return res.render('error.ejs');

    req.flash('success', 'Contact deleted successfully!');
    req.session.save(() => res.redirect('back'));
    return;
}