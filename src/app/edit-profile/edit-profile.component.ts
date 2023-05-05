import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { faEnvelope, faPhone, faLock, faUserTie, faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  loggedUser !: any;

  users !: any;

  Updateform !: FormGroup;

  imgUrl = '';

  faUserTie = faUserTie;

  faUser = faUser;

  faEnvelope = faEnvelope;

  faPhone = faPhone;

  faLock = faLock;

  faImage = faImage;

  // userUserName = '';

  userFirstName = '';

  userLastName = '';

  userGender = '';

  userEmail = '';

  userPhone = '';

  userPassword = '';

  user : any = {};

  constructor( private router : Router) { }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('loged') || '{}');

    this.users = JSON.parse(localStorage.getItem('Users') || '{}');

    // this.imgUrl = JSON.parse(localStorage.getItem('image') || 'string');

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loggedUser){

        // this.userUserName = this.users[i].username;

        this.userFirstName = this.users[i].fname;

        this.userLastName = this.users[i].lname;

        this.userGender = this.users[i].gender;

        this.userEmail = this.users[i].email;

        this.userPhone = this.users[i].number;

        const secret = "y@QU+fWq8/3**#o";

        let ps = CryptoJS.AES.decrypt(this.users[i].password,secret);

        this.userPassword = ps.toString(CryptoJS.enc.Utf8);

        this.imgUrl = JSON.parse(this.users[i].image);

      }
    }

    this.Updateform = new FormGroup({

      // username : new FormControl(),

      fname : new FormControl(),

      lname : new FormControl(),

      gender : new FormControl(),

      email : new FormControl(),

      number : new FormControl(),

      password : new FormControl(),

      image : new FormControl()

    })


    this.Updateform.setValue({

      // username : this.userUserName,

      fname : this.userFirstName,

      lname : this.userLastName,

      gender : this.userGender,

      email : this.userEmail,

      number : this.userPhone,

      password : this.userPassword,

      image : JSON.stringify(this.imgUrl)
    })

  }


  get email(){

    return this.Updateform.get('email');
  }

  onSubmit(){

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loggedUser){

        this.users.splice(i,1);

        localStorage.setItem('Users',JSON.stringify(this.users));

        break;

      }
    }

    // this.users.splice(this.users.findIndex((a:any) => a.email == this.loggedUser),1);

    this.user = Object.assign(this.user,this.Updateform.value);

    this.addUserToDatabase(this.user);

    // alert( JSON.stringify(this.Updateform.value))

    // this.Updateform.reset();

    alert('Profile Updated')

    this.Updateform.reset();

    this.router.navigate(['profile']);

  }

  addUserToDatabase(user : any){

    const secret = "y@QU+fWq8/3**#o";

    let x = CryptoJS.AES.encrypt(this.user.password,secret).toString();

    this.user.password = x;

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
