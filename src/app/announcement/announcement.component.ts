import { validators } from './validators';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  faTrash = faTrash;

  faEdit = faEdit;

  signal = 'none';

  signal2 = 'none';

  addAnnouncement : FormGroup;

  annc : any = {};

  announcements !: any;

  minDate : any;

  an !: any;

  constructor(@Inject(LOCALE_ID) public locale: string, private confirmService : NgConfirmService) { 

    this.addAnnouncement = new FormGroup({

      id : new FormControl('',[Validators.required]),

      title : new FormControl('',[Validators.required]),

      content : new FormControl('',[Validators.required]),

      strtDate : new FormControl('',Validators.required),

      edDate : new FormControl('',[Validators.required])

    },
      { validators : [validators.uniqueId, validators.dateValidate] }
    )
  }

  ngOnInit(): void {

    const today = new Date();

    const curr = formatDate(today,'yyyy-MM-dd',this.locale);

    this.minDate = curr;

    this.announcements = JSON.parse(localStorage.getItem('Announce') || '{}');
    
  }

  reload(){

    location.reload();
  }

  onAdd(){

    this.annc = Object.assign(this.annc,this.addAnnouncement.value);

    this.announcement(this.annc)

    this.addAnnouncement.reset();

    setTimeout(this.reload, 1500);

    this.signal = 'inline';
    
  }

  announcement(annu : any){

    let announcements = [];

    if(localStorage.getItem('Announce')){

      announcements = JSON.parse(localStorage.getItem('Announce') || '{}')

      announcements = [...announcements,annu];
    }
    else{

      announcements = [annu];
    }

    localStorage.setItem('Announce', JSON.stringify(announcements));

  }

  get id(){

    return this.addAnnouncement.get('id');
  }

  get edDate(){

    return this.addAnnouncement.get('edDate');
  }

  removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }

  onDelete(id : any){

    this.confirmService.showConfirm("Are you sure want to delete?",

    () => {

      this.an = this.removeObjectWithId(this.announcements, id);

      localStorage.setItem('Announce',JSON.stringify(this.an));

      this.signal2 = 'inline';

      setTimeout(this.reload,1500);

    },
    () => {
      location.reload();
    }
    )

    

  }

}

