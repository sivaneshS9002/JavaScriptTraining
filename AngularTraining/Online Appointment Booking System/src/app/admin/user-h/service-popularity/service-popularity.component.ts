import { Component } from '@angular/core';
import { newUserM, service } from '../../../../Modals/Modal';
import { ServicesService } from '../../../Services/services.service';

@Component({
  selector: 'app-service-popularity',
  standalone: true,
  imports: [],
  templateUrl: './service-popularity.component.html',
  styleUrl: './service-popularity.component.css'
})
export class ServicePopularityComponent {
  userList:newUserM[]=[];
  serviceList:service[]=[];
  serviceArray:any[]=[];
  servicePopularity=false;

  constructor(private service:ServicesService){
    this.userList=service.getRegisteredUsers();
    this.serviceList=service.getServices();

      for(let i=0;i<this.serviceList.length;i++){
       let len=0;
       let c={
         sName:'',
         len:0
       }
         for(let j=0;j<this.userList.length;j++){
            for(let k=0;k<this.userList[j].Booking.length;k++){
                if(this.serviceList[i].serviceName === this.userList[j].Booking[k].aName){
                      len=len+1;
                }
            }
         }
         console.log(this.serviceList[i].serviceName+"  "+len);
         c.sName=this.serviceList[i].serviceName;
         c.len=len;
         this.serviceArray.push(c);
      }
      console.log(this.serviceArray)
      this.serviceArray=this.service.sortByLengthDescending(this.serviceArray);
     
   }
}
