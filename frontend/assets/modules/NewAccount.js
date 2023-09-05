import validator from "validator";

export default class Account {
    constructor(formAccount) {
        this.form = document.querySelector(formAccount);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;

        const inputName = el.querySelector('input[name="firstName"]');
        const inputEmail = el.querySelector('input[name="email"]');
        const inputPassword = el.querySelector('input[name="password"]');
        const areaFeedBack = el.querySelectorAll('.feedback');
            
        let error = false;

        //Transformar a senha em Number (parseInt()) e depois checar se são apenas números ou uma string

        if(!inputName.value) {
            areaFeedBack[0].innerText = 'Name cannot be empty';
            error = true;

            inputName.addEventListener('focus', () => {
                if (!inputName.value) {
                    areaFeedBack[0].innerText = `Name cannot be empty`;
                    error = true
                } else {
                    areaFeedBack[0].innerText = '';
                    error = false;
                }
            })
    
            inputName.addEventListener('blur', () => {
                if(inputName.value) {
                    areaFeedBack[0].innerText = '';
                    error = false;
                } else {
                    areaFeedBack[0].innerText = 'Name cannot be empty';
                    error = true;
                }
            })
        }

        if(!inputEmail.value || !validator.isEmail(inputEmail.value)) {
            areaFeedBack[1].innerText = 'E-mail empty or invalid';
            error = true;

            inputEmail.addEventListener('focus', () => {
                if (!inputEmail.value) {
                    areaFeedBack[1].innerText = `E-mail is required`;
                    error = true
                }

                if (!validator.isEmail(inputEmail.value)) {
                    areaFeedBack[1].innerText = 'E-mail invalid';
                    error = true;
                } else {
                    areaFeedBack[1].innerText = '';
                    error = false
                }
            })

            inputEmail.addEventListener('blur', () => {
                if (validator.isEmail(inputEmail.value)) {
                    areaFeedBack[1].innerText = '';
                } else {
                    areaFeedBack[1].innerText = 'E-mail invalid';
                    error = true;
                }
            }) 
        }

        if (inputPassword.value.length < 8) {
            areaFeedBack[2].innerText = 'The password must contain at least 8 characters';
            error = true;

            inputPassword.addEventListener('focus', () => {
                if (!inputPassword.value) {
                    areaFeedBack[2].innerText = `The password must contain at least 8 characters`;
                    error = true
                }
            })
    
            inputPassword.addEventListener('blur', () => {
                if(inputPassword.value.length >= 8) {
                    areaFeedBack[2].innerText = '';
                    error = false;
                } else {
                    areaFeedBack[2].innerText = 'The password must contain at least 8 characters';
                    error = true;
                }
            }) 
        }

        if (!error) el.submit();
    }
}