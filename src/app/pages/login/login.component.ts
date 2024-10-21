import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginResponse: any = {
    "userName": "",
    "password": ""
  }

  router = inject(Router);
  http1=inject(HttpClient);
  onLogin() {
    this.http1.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginResponse).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('laveUser', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      }
      else {
        alert(res.message);
      }
    });
  }
}