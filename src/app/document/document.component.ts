import { faFile, faImage, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import {ThemePalette} from '@angular/material/core';
// import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  Alert = false;

  documentForm : FormGroup;

  faImage = faImage;

  faFile = faFile;

  faDelete = faTrash;

  faTime = faTimesCircle;

  users !: any;

  loged !: any;

  filename !: any;

  filesize !: any;

  fileprogress !: any;

  userImage !: any;

  userFile !: any;

  documents !: any;

  show : boolean = false;

  constructor( private router : Router) {

    this.documentForm = new FormGroup({

      document : new FormControl()
    }) 
  }

  ngOnInit(): void {

    this.users = JSON.parse(localStorage.getItem('Users') || '{}');

    this.loged = JSON.parse(localStorage.getItem('loged') || '{}');

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loged){

        this.userImage = JSON.parse(this.users[i].docImage);

        this.userFile = this.users[i].docText;

        // this.file = JSON.parse(this.users[i].document.docPDF);

        // alert(this.users.keys(document).length)

        // alert(this.users[i].document.docImage)

      }
    }

  }

  onChange(event:any){
    
    const file = event.target.files[0];

    const fileType = event.target.files[0].type;

    this.filename = file.name;

    this.filesize = file.size;

    this.fileprogress = file.progress;

    this.show = true;


    if(fileType.match(/image\/*/) || fileType.match(/application\/*/) || fileType.match(/text\/*/)){

      let x = this.users.length;

      let user = [];

      let document = [];

      for(let i = 0; i < x; i++){

        if(this.users[i].email === this.loged){
          

          const reader = new FileReader();

          reader.addEventListener('load',()=>{
          
            if(fileType.match(/image\/*/)){

              if(this.users[i].document){

                document = this.users[i].document;
  
                var docImage = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docImage}
  
                // this.users[i].document[1].push(JSON.stringify(reader.result))
  
              }
              else{
  
                this.users[i].document = [];
  
                document = this.users[i].document;
  
                var docImage = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docImage}
  
                // this.users[i].document[0].push(JSON.stringify(reader.result))
  
              }

            }


            if(fileType.match(/application\/*/)){

              if(this.users[i].document){

                document = this.users[i].document;
  
                let docPDF = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docPDF}
  
                // this.users[i].document[1].push(JSON.stringify(reader.result))
  
              }
              else{
  
                this.users[i].document = [];
  
                document = this.users[i].document;
  
                var docPDF = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docPDF}
  
                // this.users[i].document[0].push(JSON.stringify(reader.result))
  
              }
              
            }


            if(fileType.match(/text\/*/)){

              if(this.users[i].document){

                document = this.users[i].document;
  
                var docText = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docText}
  
                // this.users[i].document[1].push(JSON.stringify(reader.result))
  
              }
              else{
  
                this.users[i].document = [];
  
                document = this.users[i].document;
  
                var docText = JSON.stringify(reader.result);
  
                this.users[i].document = { ...document, docText}
  
                // this.users[i].document[0].push(JSON.stringify(reader.result))
  
              }
              
            }


            // user = this.users[i];

            // var docImage = JSON.stringify(reader.result);
            
            // this.users[i] = { ...user, docImage};

            localStorage.setItem('Users',JSON.stringify(this.users));

          })

          if(fileType.match(/image\/*/) || fileType.match(/application\/*/)){

            reader.readAsDataURL(file);

          }
          else{

            reader.readAsText(file);

          }

          
        }


      }

    }

    else{

      alert('Choose correct file type')

      location.reload();
    }

  }

  

  onChange1(event:any){

    const file = event.target.files[0];
 
    const fileType = file.type;

    if(fileType.match(/application\/*/)){

      let x = this.users.length;

      let user = [];

      // for(let i = 0; i < x; i++){

      //   if(this.users[i].email === this.loged){

      //     const reader = new FileReader();

      //     reader.addEventListener('load',()=>{

      //       user = this.users[i];

      //       var docPDF = JSON.stringify(reader.result);

      //       this.users[i] = { ...user, docPDF};

      //       localStorage.setItem('Users',JSON.stringify(this.users))
            
      //     })

      //     reader.readAsDataURL(file);

      //   }

      // }

    }

    else{

      alert('Choose correct file type');

      location.reload();

    }

  }

  onChange2(event:any){

    const file = event.target.files[0];

    const fileType = file.type;

    if(fileType.match(/text\/*/)){

      let x = this.users.length;

      let user = [];

      for(let i = 0; i < x; i++){

        if(this.users[i].email === this.loged){

          const reader = new FileReader();

          reader.addEventListener('load',()=>{

            user = this.users[i];

            var docText = JSON.stringify(reader.result);

            this.users[i] = { ...user, docText};

            localStorage.setItem('Users',JSON.stringify(this.users))
            
          })

          reader.readAsText(file);

        }

      }

    }

    else{

      alert('Choose correct file type');

      location.reload();

    }

  }

  onSubmit(){

    // this.file = JSON.parse(this.users[0].docImage);


  }

  delImage(){

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loged){

        this.users[i].docImage = "\"data:image/png;base64,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\""
        
        localStorage.setItem('Users',JSON.stringify(this.users));

        alert('Image Deleted');

        location.reload();
      }
    }


  }

  delPDF(){

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loged){

        this.users[i].docPDF = '';

        localStorage.setItem('Users',JSON.stringify(this.users));
      }
    }

    this.Alert = true;

  }

  delText(){

    let x = this.users.length;

    for(let i = 0; i < x; i++){

      if(this.users[i].email === this.loged){

        this.users[i].docText = '';

        localStorage.setItem('Users',JSON.stringify(this.users));
      }
    }

    alert("Text file Deleted");


  }

  upload(){

    alert("File Uploaded");

    location.reload();
  }

  upload1(){

    alert('PDF Uploaded');

    location.reload();
  }

  upload2(){

    alert('Text file Uploaded');

    location.reload();
  }

  refresh(){

    location.reload();

  }


  formatBytes(bytes : any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
