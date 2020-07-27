import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class CoreDemoService {

  // constructor(private http : HttpClient) { }
 

  saveFencing(geofence :any){
    console.log(geofence);
// return this.http.post("http://localhost:5000",)
  }

  userCurrentLocation(currentLocation : any)
  {
    console.log(currentLocation+"abcd");
  }
}
