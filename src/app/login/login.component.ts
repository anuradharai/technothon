import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { faEnvelope , faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myID !: any;

  Loginform : FormGroup;

  faEnvelope = faEnvelope;

  faLock = faLock;

  constructor( private router : Router) {

    this.Loginform = new FormGroup({

      email : new FormControl('',[Validators.required,Validators.email]),

      password : new FormControl('',[Validators.required, Validators.minLength(6)])

    })
   }

  ngOnInit(): void {
  }

  get email(){

    return this.Loginform.get('email');
  }

  get password(){

    return this.Loginform.get('password');
  }

  onSubmit(){

    // this.myID = JSON.parse(localStorage.getItem('formdata') || 'string');

    this.myID = JSON.parse(localStorage.getItem('Users') || 'string');

    // alert(JSON.stringify(this.myID[0].email));

    let x = this.myID.length;

    let y = true;

    for(let i = 0; i < x; i++ ){

      if(this.myID[i].email === this.Loginform.value.email){

        const secret = "y@QU+fWq8/3**#o";

        let pass = CryptoJS.AES.decrypt(this.myID[i].password,secret);

        let password = pass.toString(CryptoJS.enc.Utf8);

        if(password === this.Loginform.value.password){ 

          localStorage.setItem('loged',JSON.stringify(this.Loginform.value.email))

          this.Loginform.reset();
    
          this.router.navigate(['welcome']);

          y = false;

        }
  
      }

    }
    
    if(y){

      this.Loginform.reset();

      alert("Invalid Credentials")

    }

    
  }

}
