import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(loginObj: any):Observable<any> {
    return this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login', loginObj);
  } 
}
