import { CountryUniversityService } from './../country-university.service';
import { University } from './api.module';
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
 
import { Observable, Subject } from "rxjs";
import { response } from 'express';

@Injectable({

    providedIn : 'root'
})

export class ApiService{

    country : any = " ";

    constructor(private http : HttpClient, private countryService : CountryUniversityService){

        this.country = this.countryService.getCountryName();
    }

    private universitys : University[] = [];

    private universityUpdated = new Subject<University[]>();

    // getData():Observable<any>{

    //     // http://universities.hipolabs.com/search?country=United+Kingdom

    //     return this.http.get('http://localhost:3000/fetchUniversityInfo/');

    // }


    getData(){

        //     // http://universities.hipolabs.com/search?country=United+Kingdom
    
        this.http.get<{message : string, universitys : University[] }>('http://localhost:3000/fetchUniversityInfo/').subscribe((data : any) => {

            this.universitys = data.university;

            console.log(this.universitys)

            this.universityUpdated.next([...this.universitys])
        })
    
    }

    getUniversityUpdateListener(){

        return this.universityUpdated.asObservable();
    }

    addUniversity(un : string, city : string, address : string, state : string){


        const newUniversity : University = { University : un, CountryCode : city, Country : address, Website : state };

        // this.universitys.push(newUniversity);

        // this.universityUpdated.next([...this.universitys]);

        // this.http.post<{ message : string }>('http://localhost:3000/addUniversity',newUniversity).subscribe( responseData => {

        //     console.log(responseData.message);

        //     // this.universitys.push(newUniversity);

        //     this.universityUpdated.next([...this.universitys]);

        // })

        this.http.post<any>("https://63ef0bc14d5eb64db0c23e56.mockapi.io/university",newUniversity).subscribe( responseData => {

            console.log(responseData);
        });
    }

    // getCountryUniversity(){

    //     this.country = this.countryService.getCountryName();

    //     return this.http.get("http://localhost:3000/"+this.country);
    // }

    getMockAPIData(){

        return this.http.get("https://63ef0bc14d5eb64db0c23e56.mockapi.io/university");
    }

    deleteMockAPIData(id : any){

        this.http.delete<number>("https://63ef0bc14d5eb64db0c23e56.mockapi.io/university/"+id).subscribe(data =>{
            
            console.log(data);
            
        });
    }

    getParamData(id : any){

        return this.http.get("https://63ef0bc14d5eb64db0c23e56.mockapi.io/university/"+id);
    }

    updateDataOnMockAPI(id : any, un : string, city : string, address : string, state : string){

        const newUniversity : University = { University : un, CountryCode : city, Country : address, Website : state };

        this.http.put("https://63ef0bc14d5eb64db0c23e56.mockapi.io/university/"+id, newUniversity).subscribe(data =>{

            console.log(data);
        })
    }

    
}