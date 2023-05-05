import { validators } from './../announcement/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.css']
})
export class EditAnnouncementComponent implements OnInit {

  editAnnouncement : FormGroup;

  id = "";

  title = " ";

  content = " ";

  sDate = " ";

  eDate = " ";

  announce !: any;

  minDate : any;

  newData : any = {};

  signal = 'none';

  //activate route from angular
  constructor(@Inject(LOCALE_ID) public locale: string, private activatedRoute : ActivatedRoute , private router : Router) { 
  }

  ngOnInit(): void {

    const today = new Date();

    const curr = formatDate(today,'yyyy-MM-dd',this.locale);

    this.minDate = curr;

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.announce = JSON.parse(localStorage.getItem('Announce') || '{}');

    let length = this.announce.length;

    for(let i = 0; i < length; i++){

      if(this.announce[i].id === this.id){

        this.title = this.announce[i].title;

        this.content = this.announce[i].content;

        this.sDate = this.announce[i].strtDate;

        this.eDate = this.announce[i].edDate;
      }
    }

    this.editAnnouncement = new FormGroup({

      id : new FormControl('',[Validators.required]),

      title : new FormControl('',[Validators.required]),

      content : new FormControl('',[Validators.required]),

      strtDate : new FormControl('',Validators.required),

      edDate : new FormControl('',[Validators.required])

    },

    { validators : [validators.dateValidate] }
    )

    this.editAnnouncement.setValue({

      id : this.id,

      title : this.title,

      content : this.content,

      strtDate : this.sDate,

      edDate : this.eDate
    })
  }

  get edDate(){

    return this.editAnnouncement.get('edDate');
    
  }

  onEdit(){

    this.signal = 'inline';

    let length = this.announce.length;

    for(let i = 0; i < length; i++){

      if(this.announce[i].id === this.id){

        this.announce.splice(i,1);

        localStorage.setItem('Announce', JSON.stringify(this.announce));

        break;
      }
    }

    this.newData = Object.assign(this.newData,this.editAnnouncement.value);

    this.addData(this.newData);

    // this.editAnnouncement.reset();

    this.router.navigate(['announcement']);

  }

  addData(data : any){

    let updateData = [];

    updateData = JSON.parse(localStorage.getItem('Announce') || '{}');

    updateData = [...updateData, data];

    localStorage.setItem('Announce',JSON.stringify(updateData));
  }


}
