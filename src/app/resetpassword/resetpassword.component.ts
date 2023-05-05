import { Router } from '@angular/router';
import { codeValidate } from './codeValidate'; 
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  users !: any;

  logedUser !: any;

  resetPasswordForm !: FormGroup

  fname = "";

  lname = "";

  email = "";

  number = "";

  gender = "";

  userpassword = "";

  imgUrl = "";

  faLock = faLock

  user : any = {};

  constructor(private router : Router) { 
    
  }

  ngOnInit(): void {

    this.users = JSON.parse(localStorage.getItem('Users') || '{}')

    this.logedUser = JSON.parse(localStorage.getItem('loged') || 'string')

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.logedUser){

        this.fname = this.users[i].fname;

        this.lname = this.users[i].lname;

        this.email = this.users[i].email;

        this.number = this.users[i].number;

        this.gender = this.users[i].gender;

        this.userpassword = this.users[i].password;

        this.imgUrl = JSON.parse(this.users[i].image);
      }
    }


    this.resetPasswordForm = new FormGroup({

      fname : new FormControl(),

      lname : new FormControl(),

      email : new FormControl(),

      number : new FormControl(),

      gender : new FormControl(),

      prePassword : new FormControl('',[Validators.required]),

      password : new FormControl(),

      confirmPassword : new FormControl(),

      image : new FormControl()


    },
    
    { validators : [codeValidate.prePasswordmatch, codeValidate.passwordMatching] }
    )

    this.resetPasswordForm.patchValue({

      fname : this.fname,

      lname : this.lname,

      email : this.email,

      number : this.number,

      gender : this.gender,

      image : JSON.stringify(this.imgUrl)


    })
  }

  get prePassword(){

    return this.resetPasswordForm.get('prePassword');

  }

  get password(){

    return this.resetPasswordForm.get('password');
  }

  get confirmPassword(){

    return this.resetPasswordForm.get('confirmPassword');
  }



  onSubmit(){

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.logedUser){

        this.users.splice(i,1);

        localStorage.setItem('Users',JSON.stringify(this.users));

        break;

      }

    }

    this.user = Object.assign(this.user,this.resetPasswordForm.value)

    const secret = "y@QU+fWq8/3**#o";

    const ps = CryptoJS.AES.encrypt(this.user.password,secret).toString()

    this.user.password = ps;

    this.addUserToDatabase(this.user)

    alert('Password Reset')

    this.resetPasswordForm.reset();

    this.router.navigate(['home'])

  }

  addUserToDatabase(user : any){

    let users = [];

    if(localStorage.getItem('Users')){

      users = JSON.parse(localStorage.getItem('Users') || '{}');

      users = [...users,user];
    }
    else{

      users = [user];
    }

    localStorage.setItem('Users',JSON.stringify(users));

  }

}
