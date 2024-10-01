import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ServicesService } from '../Services/services.service';
import { newUserM } from '../../Modals/Modal';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private service:ServicesService){

  }
  users:newUserM[]=[]
    p="password"
   newUser(data:NgForm){
    console.log(data.value);
     this.users=this.service.getRegisteredUsers();
     let newU:newUserM={
      name:data.value.userName,
      email:data.value.userEmail,
       phoneNumber:data.value.phoneNumber,
       password:data.value.UserPassword,
        isActive:true,
        role:'User',
        Booking:[]
      }
      this.users.push(newU)
        this.service.setRegisteredUsers(this.users);
     data.resetForm();
   }

  getUserName(name:any){
      console.log(name)
      console.log(name.touched);
  }
  getUserEmail(email:any){
    console.log(email)
  }


  getUserPhone(phone:any){
    console.log(phone);
  }

  getUserPassword(password:any){
    console.log(password);
  }
  showPassword(){
    console.log("eye Clicked");
     if(this.p=="password"){
       this.p="text";
     }
     else {
      this.p='password';
     }
  }
}
