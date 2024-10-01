
import { Injectable } from '@angular/core';
import { Admin, newUserM, service } from '../../Modals/Modal';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor() { }
  getRegisteredUsers(){  
    let users=localStorage.getItem('registeredUsers') || '[]'; 
     return JSON.parse(users);
  }
  setRegisteredUsers(users:newUserM[]){
     localStorage.setItem('registeredUsers',JSON.stringify(users));
  }
  getAdmins(){
    let admins=localStorage.getItem('registeredAdmins') || '[]';
    return JSON.parse(admins);
  }
  setAdmins(admins:Admin[]){
      localStorage.setItem('registeredAdmins',JSON.stringify(admins));
  }
  getServices(){
    let services=localStorage.getItem('services') || '[]';
    return JSON.parse(services);
  }
  setServices(services:service[]){
     localStorage.setItem('services',JSON.stringify(services));
  }
  getCurrentuser(){
   let user = localStorage.getItem('currentUser') || '';
   return user;
  }
  setCurrentUser(u:any){
    localStorage.setItem('currentUser',JSON.stringify(u))
  }
  sortByLengthDescending(userArray:any) {
    return userArray.sort((a:any, b:any) => b.len - a.len);
  }
  getCurrentAdmin(){
     let admin=localStorage.getItem('currentAdmin') || '';
     return JSON.parse(admin);
  }
  setcurrentAdmin(u:any){
    localStorage.setItem('currentAdmin',JSON.stringify(u))
  }
}
