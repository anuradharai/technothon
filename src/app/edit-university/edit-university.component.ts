import { NgForm, FormGroup } from '@angular/forms';
import { University } from './../api/api.module';
import { ApiService } from './../api/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

class update{

  constructor(

    public university : string = '',
    public countrycode : string = '',
    public country : string = '',
    public website : string = ''
  ){}
}

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})

export class EditUniversityComponent implements OnInit {

  signal = 'none';

  id = "";

  data : any;

  countrycode : string;

  universityData : University[] = [];

  @ViewChild('UpdateForm') forms: NgForm;

  constructor(private activatedRouter : ActivatedRoute, private apiService : ApiService, private router : Router) { }

  model : update = new update('','','','');
 
  ngOnInit(): void {

    this.id = this.activatedRouter.snapshot.paramMap.get('id');

    this.apiService.getParamData(this.id)?.subscribe((data) => {

      this.data = data;

      this.universityData = this.data;

    })

    setTimeout( () => this.fillData(),1000);

  }

  onUpdateUniversity(form : NgForm){

    this.apiService.updateDataOnMockAPI(this.id,form.value.university, form.value.city, form.value.address, form.value.state)

    form.reset();
    
    this.signal = 'inline';

    setTimeout(() => this.router.navigateByUrl('/api'),1200);
  }

  fillData(){

    this.model = new update(this.universityData['University'],this.universityData['CountryCode'],this.universityData['Country'],this.universityData['Website']);
  }

}
