import { faUser, faUserTie, faPhone, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user !: any;

  users !: any;

  imgUrl  = '';

  faUserTie = faUserTie;

  faUser = faUser;

  faEnvelope = faEnvelope;

  faPhone = faPhone;

  faLock = faLock;

  // username = '';
  fname = ''; 
  lname = '';
  email = ''; 
  phone  = '';
  gender = '';
  password = '';

  // file: File | null = null;

  // img  = document.getElementById("#fileInput");


  constructor() { }


  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('loged') || '{}');

    this.users = JSON.parse(localStorage.getItem('Users') || '{}');

    // this.imgUrl = JSON.parse(localStorage.getItem('image') || 'string');

    // alert(this.imgUrl);

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.user){

        // this.username = this.users[i].username;

        this.fname = this.users[i].fname;

        this.lname = this.users[i].lname;

        this.email = this.users[i].email;

        this.phone = this.users[i].number;

        this.gender = this.users[i].gender;

        this.password = this.users[i].password;

        this.imgUrl = JSON.parse(this.users[i].image);
      }
    }
  }

  onChange(event : any){

    let x = this.users.length;

    let u1 = [];

    const file = event.target.files[0];

    const fileType = event.target.files[0].type;

    if(fileType.match(/image\/*/)){

      for(let i = 0; i < x; i++){

        if(this.users[i].email === this.user){
  
          const reader = new FileReader();
  
          reader.addEventListener('load',()=>{
  
            var image = JSON.stringify(reader.result)
  
            u1 = this.users[i];
  
            this.users[i] = { ...u1, image }
  
            localStorage.setItem('Users', JSON.stringify(this.users))
  
          })

          // this.users[i] = { ...u1, image }
  
          // alert(JSON.stringify(this.users[i]))
  
          reader.readAsDataURL(file);
          
        }
  

      }
    }
    else{

      alert("Choose correct file type");
    }







    // const file = event.target.files[0];

    // const reader = new FileReader();

    // reader.addEventListener('load',()=>{ 

    //   localStorage.setItem('image', JSON.stringify(reader.result));

    // });

    // reader.readAsDataURL(file);






    

    // const reader = new FileReader();

    // reader.readAsDataURL(event.target.files[0]);

    // console.log(reader.result);

  }

  onUpload(){

    // localStorage.setItem('image',JSON.stringify(this.file?.name));

    location.reload();
    
  }


}
