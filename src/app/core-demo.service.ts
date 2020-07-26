import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class CoreDemoService {

  constructor() {

   }

  saveFencing(JsonDataNew :any){
    console.log(JsonDataNew);
// return this.http.post
  }
}
