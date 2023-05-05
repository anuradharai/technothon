import { AbstractControl, ValidationErrors } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

export class codeValidate{

    static prePasswordmatch(control : AbstractControl) : ValidationErrors | null{

        const password = control.get('prePassword')?.value;

        let users = [];

        users = JSON.parse(localStorage.getItem('Users') || "{}");

        let loged = JSON.parse(localStorage.getItem('loged') || "string")

        let x = users.length;

        for(let i = 0; i < x; i++){

            if(users[i].email === loged){

                const secret = "y@QU+fWq8/3**#o";

                const ps = CryptoJS.AES.decrypt(users[i].password,secret)

                let pass = ps.toString(CryptoJS.enc.Utf8);

                if(pass !== password){

                    return { passwordMatching : true }
                }
                
            }

        }

        return null;

    }

    static passwordMatching(control : AbstractControl) : ValidationErrors | null{

        const pass = control.get('password')?.value;

        const confirmpass = control.get('confirmPassword')?.value;

        if((pass === confirmpass) && (pass !== null && confirmpass !== null)){

            return null;
        }
        else{

            return { passwordNotMatching : true };
        }

    }
}