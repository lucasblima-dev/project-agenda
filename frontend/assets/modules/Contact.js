import validator from "validator";

export default class Account {
    constructor(formContact) {
        this.form = document.querySelector(formContact);
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
        const inputCellphone = el.querySelector('input[name="cellphone"]');
        const areaFeedBack = el.querySelectorAll('.feedback');
            
        let error = false;

        if(!inputName.value) {
            inputName.addEventListener('focus', () => {
                if (!inputName.value) {
                    areaFeedBack[0].innerText = `Name cannot be empty`;
                    error = true
                } else {
                    areaFeedBack[0].innerText = '';
                }
            })
    
            inputName.addEventListener('blur', () => {
                if(inputName.value) {
                    areaFeedBack[0].innerText = '';
                } else {
                    areaFeedBack[0].innerText = 'Name cannot be empty';
                    error = true;
                }
            })

            areaFeedBack[0].innerText = 'Name cannot be empty';
            error = true;
        }

        if(!inputCellphone.value) {
            if(validator.isEmail(inputEmail.value)) {
                areaFeedBack[1].innerText = '';
                areaFeedBack[2].innerText = '';
                error = false
            } else {
                areaFeedBack[1].innerText = 'Cellphone or e-mail valid is required';
                error = true;
            }

            inputCellphone.addEventListener('focus', () => {
                if (!validator.isEmail(inputEmail.value) && !inputCellphone.value) {
                    areaFeedBack[1].innerText = `Cellphone or e-mail valid is required`;
                    error = true
                } else {
                    areaFeedBack[1].innerText = '';
                }
            })
    
            inputCellphone.addEventListener('blur', () => {
                if(validator.isEmail(inputEmail.value) || inputCellphone.value) {
                    areaFeedBack[1].innerText = '';
                } else {
                    areaFeedBack[1].innerText = 'Cellphone or e-mail valid is required';
                    error = true;
                }
            }) 
        }

        if(!inputEmail.value) {
            if(inputCellphone.value) {
                areaFeedBack[1].innerText = '';
                areaFeedBack[2].innerText = '';
                error = false
            } else {
                areaFeedBack[2].innerText = 'Cellphone or e-mail valid is required';
                error = true;
            }

            inputEmail.addEventListener('focus', () => {
                if (!inputEmail.value && !inputCellphone.value) {
                    areaFeedBack[2].innerText = `Cellphone or e-mail valid is required`;
                    error = true
                } else {
                    areaFeedBack[2].innerText = '';
                }
            })
    
            inputEmail.addEventListener('blur', () => {
                if(inputEmail.value || inputCellphone.value) {
                    areaFeedBack[2].innerText = '';
                } else {
                    areaFeedBack[2].innerText = 'Cellphone or e-mail valid is required';
                    error = true;
                }
            })          
        }

        if (!error) el.submit();
    }
}