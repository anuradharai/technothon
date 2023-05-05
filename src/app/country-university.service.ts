import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryUniversityService {

  country : string = "India";

  constructor() { }

  getCountryName(){

    return this.country;
  }

  setCountryName(country : any){

    this.country = country;
  }
}
