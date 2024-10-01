import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private route:Router){

  }
  routeToLogin(){
   this.route.navigate(['/Login']);
   localStorage.removeItem('currentAdmin');
  }
}
