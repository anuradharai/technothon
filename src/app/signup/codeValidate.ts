import { AbstractControl, ValidationErrors } from "@angular/forms";
// import { map, Observable } from "rxjs";

export class codeValidate{

    static passwordMatching(control : AbstractControl) : ValidationErrors | null{

        const password = control.get('password')?.value;

        const confirmpassword = control.get('confirmpassword')?.value;

        if((password === confirmpassword) && (password !== null && confirmpassword !== null)){

            return null;

        }
        else{

            return { passwordNotMatching : true };
        }
    }

    // static checkUsernameTaken(control : AbstractControl): ValidationErrors | null{

    //     const username = control.get('username')?.value;

    //     var users = [];

    //     users = JSON.parse(localStorage.getItem('Users') || '{}')

    //     let x = users.length;

    //     for(let i = 0; i < x; i++){

    //         if(users[i].username === username){

    //             return { usernameTaken : true }
    //         }
    //     }

    //     return null;
        
    // }

    

    static emailMatch(control : AbstractControl) : ValidationErrors | null{

        const email = control.get('email')?.value;

        var users = [];

        users = JSON.parse(localStorage.getItem('Users') || '{}')

        let x = users.length;

        for(let i = 0; i < x; i++){

            if(users[i].email === email){

                return { emailMatching : true };

            }

        }

        return null;
    }

}