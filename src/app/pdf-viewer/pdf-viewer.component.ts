import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})

export class PdfViewerComponent implements OnInit {

  file !: any;

  users !: any;

  loged !: any;

  constructor() { }

  ngOnInit(): void {

    this.users = JSON.parse(localStorage.getItem('Users') || '{}');

    this.loged = JSON.parse(localStorage.getItem('loged')||'{}');

    let x = this.users.length;

    for(let i = 0 ;i < x; i++){


      if(this.users[i].email === this.loged){

        this.file = JSON.parse(this.users[i].document.docPDF);


      }
    }

    // handleError(error) : alert("")
  }

}
