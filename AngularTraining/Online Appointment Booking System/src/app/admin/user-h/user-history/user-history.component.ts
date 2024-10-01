import { Component } from '@angular/core';
import { newUserM, service } from '../../../../Modals/Modal';
import { ServicesService } from '../../../Services/services.service';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent {
  userList:newUserM[]=[];
  serviceList:service[]=[];
  history:any[]=[];
  constructor(private service:ServicesService){
    this.userList=service.getRegisteredUsers();
    this.serviceList=service.getServices();
    for(let i=0;i<this.userList.length;i++){

      for(let j=0;j<this.userList[i].Booking.length;j++)
       {
         let x={
           email:'',
           aName:'',
          aDate:'',
           aTime:'',
          aStatus:''
         }
           x.email=this.userList[i].email;
           x.aName=this.userList[i].Booking[j].aName;
           x.aDate=this.userList[i].Booking[j].aDate;
           x.aTime=this.userList[i].Booking[j].aTime;
           x.aStatus=this.userList[i].Booking[j].aStatus;
           this.history.push(x);
        }
    }
  }
}
