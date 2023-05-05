import { ApiService } from './../api.services';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {

  signal = 'none';
  

  constructor(public apiService : ApiService, private location : Location, private router : Router) { }

  ngOnInit(): void {
  }

  onAddUniversity(form : NgForm){

    if(form.invalid){

      return;
    }

    this.apiService.addUniversity(form.value.university, form.value.city, form.value.address, form.value.state)

    form.resetForm();

    this.signal = 'inline';
    // Back to the previous location
    // this.location.back();

    // add route path in app-routing.modules.ts and import router form @angualr/router
    setTimeout(() => this.router.navigateByUrl('/api'),1000);

  }
}

