import { Component } from '@angular/core';
import { newUserM, service } from '../../../../Modals/Modal';
import { ServicesService } from '../../../Services/services.service';

@Component({
  selector: 'app-user-activity',
  standalone: true,
  imports: [],
  templateUrl: './user-activity.component.html',
  styleUrl: './user-activity.component.css'
})
export class UserActivityComponent {
  userList:newUserM[]=[];
  serviceList:service[]=[];
  userArray:any[]=[];
  userActivityShow=false;
  constructor(private service:ServicesService){
    this.userList=service.getRegisteredUsers();
    this.serviceList=service.getServices();
    for(let i=0;i<this.userList.length;i++){
     let u={
         email:this.userList[i].email,
         len:this.userList[i].Booking.length
     }
     this.userArray.push(u)
    }
   }
   updateActivity(){
    this.userActivityShow=!this.userActivityShow;
  }  
}
