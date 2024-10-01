import { Component } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { newUserM, service } from '../../../Modals/Modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
   userList:newUserM[]=[];
   currentEmail='';
   currentUser:newUserM={
    name:'',
    email:'',
    phoneNumber:0,
    password:'',
    isActive:true,
    role:'',
    Booking:[]
   }
    userName=''
    userPassword=''
    userEmail=''
    userPhoneNumber=0

     constructor(private service:ServicesService){
        this.userList=service.getRegisteredUsers();
        this.currentEmail=JSON.parse(service.getCurrentuser());
     }
  showUserform(){
    for(let i=0;i<this.userList.length;i++){
      if(this.userList[i].email === this.currentEmail){
        this.userName=this.userList[i].name;
        this.userEmail=this.userList[i].email;
        this.userPassword=this.userList[i].password;
        this.userPhoneNumber=Number(this.userList[i].phoneNumber);
      }
    }
    (document.querySelector('#edit-profile') as HTMLElement).style.display='block';
  }
  submitForm(){
    console.log(this.userEmail+" "+this.userName);
     for(let i=0;i<this.userList.length;i++){
         if(this.currentEmail===this.userList[i].email){
             if(this.userName==this.userList[i].name && this.userPassword===this.userList[i].password && this.userPhoneNumber==this.userList[i].phoneNumber){
                alert('Details already exist');
             }
             else{
               this.userList[i].name=this.userName;
               this.userList[i].password=this.userPassword;
               this.userList[i].phoneNumber=this.userPhoneNumber;
               this.service.setRegisteredUsers(this.userList);
                this.userList=this.service.getRegisteredUsers();
             }
         }
     }
    (document.querySelector('#edit-profile') as HTMLElement).style.display='none';
  }
  ngOnit(){
    this.showUserform();
}
  closeUserForm()
  {
    (document.querySelector('#edit-profile') as HTMLElement).style.display='none';
  }
}
