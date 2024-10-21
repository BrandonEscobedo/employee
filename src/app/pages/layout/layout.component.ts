import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
loggedUserData:any;
router=inject(Router);
constructor(){
  const localdata=localStorage.getItem('laveUser');
  if(localdata){
    this.loggedUserData= JSON.parse(localdata);
  }
  
}
onLogOff(){
localStorage.removeItem('laveUser');
this.router.navigateByUrl('login');
}
} 
