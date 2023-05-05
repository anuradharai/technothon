import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CountryUniversityService } from './../country-university.service';
import { University } from './api.module';
import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.services';
import { Subscription } from 'rxjs';

import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {

  // display = "none";

  signal = 'none';

  users = [];

  faEdit = faEdit;

  faTrash = faTrash;

  flag : boolean = false;

  flag1 : boolean = false;

  filterBy : string = "";

  filteredUsers = [];

  page : number = 1;

  count : number = 0;

  tableSize : number = 10;

  tableSizes : any = [4,8,12,16];
    
  searchId = document.getElementById('search');

  displayedColumns: string[] = ['position', 'name', 'country', 'web_pages'];

  University = "";

  Country = "";

  Alpha_two_code = "";

  Domains = "";

  cntry : boolean = true;

  usity : any;

  item : any = 8;

  universities : University[] = [];

  private universitiesSub : Subscription;

  constructor(private apiService : ApiService, private countryUniversityService : CountryUniversityService, private confirmService : NgConfirmService){ 

    this.Country = countryUniversityService.getCountryName();

    // this.fetchPost();

  }

  fetchPost() : void{

    this.apiService.getData();

    this.universitiesSub =  this.apiService.getUniversityUpdateListener().subscribe((data : University[]) => {

      // 1) 3rd party API
      // this.users = data;

      this.universities = data;

      // console.log(this.universities);

      this.filteredUsers = this.universities;

      // console.log(data);

    })
  }

  ngOnInit(): void {

    // It's useing for the university array of M.P. And M.H.
    // this.apiService.getData();

    // this.universitiesSub =  this.apiService.getUniversityUpdateListener().subscribe((data : University[]) => {

    //   // 1) 3rd party API
    //   // this.users = data;

    //   this.universities = data;

    //   // console.log(this.universities);

    //   this.filteredUsers = this.universities;

    //   // console.log(data);

    // })

    // this.apiService.getCountryUniversity()?.subscribe((data)=>{

    //   this.usity = data;

    //   const result : any [] = Array.from(this.usity.reduce((m, t) => m.set(t.name, t), new Map()).values());

    //   this.universities = result;

    //   this.filteredUsers = this.universities;

    // })

    this.apiService.getMockAPIData()?.subscribe((data) =>{

      this.usity = data;

      this.universities = this.usity;

      this.filteredUsers = this.universities;

      console.log(this.filteredUsers);
    })


  }

  onTableDataChange(event : any){

    this.page = event;

    this.fetchPost();

  }

  onTableSizeChange(event : any){

    this.tableSize = event.target.value;

    this.page = 1;

    this.fetchPost();
  }
  
  anotherTemp : any = [];

  filter(value : any){
    this.flag = false;
    this.flag1 = true;
    this.anotherTemp = [...this.filteredUsers.filter((user : any) => user.name.toLowerCase().includes(value.toLowerCase()))]
    const result = Array.from(this.anotherTemp.reduce((m, t) => m.set(t.name, t), new Map()).values());
    this.filteredUsers = result;
  }

  // openPopup(user) {

  //   this.University = user['name'];

  //   this.Country = user['country'];

  //   this.Alpha_two_code = user['alpha_two_code'];

  //   this.Domains = user['domains'];

  //   this.display = "block";
  // }
  
  // closePopup() {
  //   this.display = "none";
  // }

  onSelect(country:any){

    if(country != "India"){

      this.cntry = false;
    }
    if(country == "India"){

      this.cntry = true;
    }

    this.countryUniversityService.setCountryName(country);

    // this.apiService.getCountryUniversity();

    this.ngOnInit();

  }

  temp : any = [];

  onSort(val : any){

    if(val == 'A'){

      this.filteredUsers = this.filteredUsers.sort((a,b) => a.name.localeCompare(b.name));

    }
    else{

      this.filteredUsers = this.filteredUsers.sort((a,b) => b.name.localeCompare(a.name));
    }

  }

  onDelete(id : any){

    this.confirmService.showConfirm("Are you sure want to delete?",

    (): void => { 
      
      this.apiService.deleteMockAPIData(id);
    
      this.signal = 'inline';

      setTimeout(()=>{
        location.reload();
      },1000)
    },

    (): void=>{
      location.reload();
    }

    )
  
  }
  
}
