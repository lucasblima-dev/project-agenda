import validator from "validator";

export default class Login {
    constructor(formLogin) {
        this.form = document.querySelector(formLogin);
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

        const inputEmail = el.querySelector('input[name="email"]');
        const inputPassword = el.querySelector('input[name="password"]');
        const areaFeedBack = el.querySelectorAll('.feedback');

        let error = false;

        if (!inputEmail.value) {
            areaFeedBack[0].innerText = 'E-mail empty or invalid';
            error = true;

            inputEmail.addEventListener('focus', () => {
                if (!inputEmail.value) {
                    areaFeedBack[0].innerText = `E-mail empty or invalid`;
                    error = true
                } 
                
                if (!validator.isEmail(inputEmail.value)) {
                    areaFeedBack[0].innerText = 'E-mail invalid';
                    error = true;
                } else {
                    areaFeedBack[0].innerText = '';
                    error = false
                }
            })
    
            inputEmail.addEventListener('blur', () => {
                if (validator.isEmail(inputEmail.value)) {
                    areaFeedBack[0].innerText = '';
                } else {
                    areaFeedBack[0].innerText = 'E-mail invalid';
                    error = true;
                }
            })          
        }

        if (inputPassword.value.length < 8) {
            areaFeedBack[1].innerText = 'The password must contain at least 8 characters';
            error = true;

            inputPassword.addEventListener('focus', () => {
                if (!inputPassword.value) {
                    areaFeedBack[1].innerText = `The password must contain at least 8 characters`;
                    error = true
                }
            })
    
            inputPassword.addEventListener('blur', () => {
                if(inputPassword.value.length >= 8) {
                    areaFeedBack[1].innerText = '';
                    error = false;
                } else {
                    areaFeedBack[1].innerText = 'The password must contain at least 8 characters';
                    error = true;
                }
            }) 
        }

        if (!error) el.submit();
    }
}