import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {

  users !: any;

  loged !: any;

  userFile !: any;

  constructor() { }

  ngOnInit(): void {

    this.users = JSON.parse(localStorage.getItem('Users') || "{}");

    this.loged  = JSON.parse(localStorage.getItem('loged') || "string")

    let x = this.users.length;

    for(let i = 0;i < x; i++){

      if(this.users[i].email === this.loged){

        this.userFile = this.users[i].docText;
      }
    }
  }

}
