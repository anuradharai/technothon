import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admins !: any;

  userData !: any;

  admin = 'none';

  constructor() { 
  }

  ngOnInit(): void {

    this.admins = JSON.parse(localStorage.getItem('Admins') || '{}');

    this.userData = JSON.parse(localStorage.getItem('loged') || '{}');


    for(let i = 0; i < 2; i++){

      if(this.admins[i] === this.userData){

        this.admin = 'inline';
      }
    }
  }

}
