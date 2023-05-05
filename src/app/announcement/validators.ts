import { AbstractControl, ValidationErrors } from "@angular/forms";

export class validators{

    static uniqueId(control : AbstractControl) : ValidationErrors | null{

        const id = control.get('id')?.value;

        let announce = [];

        announce = JSON.parse(localStorage.getItem('Announce') || '{}');

        let x = announce.length;

        for(let i = 0; i < x; i++){

            if(announce[i].id === id){

                return{ idMatch : true};
            }
        }

        return null;
    }

    static dateValidate(control : AbstractControl) : ValidationErrors | null{

        const sDate = new Date(control.get('strtDate')?.value);

        const eDate = new Date(control.get('edDate')?.value);

        return sDate && eDate && sDate <= eDate ? null : { dateValidate : true };

    }
}