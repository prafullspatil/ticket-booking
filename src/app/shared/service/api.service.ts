import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoggedIn = false;
  // loggined= new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  savedata(data: any) {
    return this.http.post<any>(`${environment.baseUrl}/users`, data);    
  }

  getAllShows(){
    return this.http.get<any>(`${environment.baseUrl}/shows`);
  }

  getShowById(id:any){
    return this.http.get(`${environment.baseUrl}/shows/${id}`)
  }

  getLoginDetails(userEmail: any, userPass: any) {
    this.http.get<any>(`${environment.baseUrl}/users`).subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email === userEmail && a.password === userPass;
        });
        if (user) {
          alert("Login SuccessFully !!!")
          this.isLoggedIn = true;
        
          this.router.navigate(['/dashboard']);
        } else {
         
        }
      },
      (err) => {
        alert('Something went wrong !!!');
      }
    );
  }

  authenticateUser() {
    return this.isLoggedIn;
  }

}
