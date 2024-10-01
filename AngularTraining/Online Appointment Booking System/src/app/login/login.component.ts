import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterLink,RouterOutlet,RouterLinkActive } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin, newUserM } from '../../Modals/Modal';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,SignUpComponent,RouterOutlet, RouterLink, RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    AllowAdmin:boolean=false;
    constructor(private route:Router,private service:ServicesService){
      localStorage.setItem('adminAcess',JSON.stringify(this.AllowAdmin) || 'false' )  
    }
    p="password"
    usersList:newUserM[]=[];
    adminList:Admin[]=[];
    currentUser='';
    admin:Admin={
      name:'Admin1',
      email:'admin1@gmail.com',
      phoneNumber:6381472190,
      password:'Admin@123',
      isActive:true,
      role:'Admin',
      Booking:[]
    }
     ngOnInit(): void {
       let admins=this.service.getAdmins();
       if(admins.length==0){
        admins.push(this.admin);
       }
       this.service.setAdmins(admins);
       console.log(this.service.getAdmins());
       this.usersList=this.service.getRegisteredUsers();
       this.adminList=this.service.getAdmins();
        this.currentUser=this.service.getCurrentuser();
     }
    checkUser(detail:NgForm){
      console.log(this.usersList)
      console.log(this.adminList);
         console.log(detail);
         console.log(detail.value.UserEmail+"  "+detail.value.UserPassword);
         if(this.adminList.find(i=>i.email === detail.value.UserEmail && i.isActive===true && i.password === detail.value.UserPassword)){
          this.service.setcurrentAdmin(detail.value.UserEmail);
         localStorage.setItem('adminAcess',JSON.stringify(this.AllowAdmin=!this.AllowAdmin)); 
           this.route.navigate(['/Admin'])

         }
         else if(this.usersList.find(i=>i.email === detail.value.UserEmail && i.isActive === true && i.password === detail.value.UserPassword)){
           this.service.setCurrentUser(detail.value.UserEmail);
          this.route.navigate(['/User'])
         }
         else{
          alert('Account not found');
         }
         
         
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
