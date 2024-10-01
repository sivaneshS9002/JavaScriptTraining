import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppointmentMComponent } from "./admin/appointment-m/appointment-m.component";
import { AdminComponent } from "./admin/admin.component";
import { ServiceMComponent } from "./admin/service-m/service-m.component";
import { UserMComponent } from "./admin/user-m/user-m.component";
import { UserHComponent } from "./admin/user-h/user-h.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignUpComponent, AppointmentMComponent, AdminComponent, ServiceMComponent, UserMComponent, UserHComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OABS';
}
