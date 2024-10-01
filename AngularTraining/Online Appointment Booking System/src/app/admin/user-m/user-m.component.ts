import { Component } from '@angular/core';
import { Admin, newUserM } from '../../../Modals/Modal';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../Services/services.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-m',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-m.component.html',
  styleUrl: './user-m.component.css'
})
export class UserMComponent {
  userList: newUserM[] = [];
  adminList: Admin[] = [];
  constructor(private service: ServicesService) {
    this.userList = this.service.getRegisteredUsers();
    this.adminList = this.service.getAdmins();
  }

  editUsername = ''
  editPhone = ''
  editPassword = ''
  editRole = ''
  editEmail = ''
  toggleActivateButtonName='Deactivate'
  ngOnInit(): void {
 
    this.saveUserChanges();
  }
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  role: string = '';
  password: string = '';

  AddUser(user: NgForm) {
    console.log(user);
    console.log(user.value);
    this.userList = this.service.getRegisteredUsers();
    if(user.value.Role === 'User'){
    let newData: newUserM = {
      name: user.value.userName,
      email: user.value.userEmail,
      phoneNumber: user.value.userPhoneNumber,
      password: user.value.userPassword,
      isActive: true,
      role: user.value.Role,
      Booking:[]
    }
    console.log(this.userList);
    this.userList.push(newData);
    console.log(this.userList)
    this.service.setRegisteredUsers(this.userList);
  }
  else if(user.value.Role === 'Admin')
  {
    let newAdmin:Admin={
      name: user.value.userName,
      email: user.value.userEmail,
      phoneNumber: user.value.userPhoneNumber,
      password: user.value.userPassword,
      isActive: true,
      role: user.value.Role,
      Booking:[]
    }
    this.adminList.push(newAdmin);
     this.service.setAdmins(this.adminList);
  }
    user.resetForm();
  }

  getName(name: any) {
    this.name = name.value;
  }
  getEmail(email: any) {
    this.email = email.value;
  }
  getNumber(phone: any) {
    this.phoneNumber = phone.value;
  }
  getRole(role: any) {
    this.role = role.value;
  }
  getPassword(password: any) {
    this.password = password;
  }

  saveUserChanges() {
    let users = this.service.getRegisteredUsers();
    let admins = this.service.getAdmins();
    if (this.editRole === 'User') {
      console.log('edited role')
      if(users.length==0){
        admins=admins.filter((admin: { email: string; })=>admin.email !== this.editEmail);
        this.service.setAdmins(admins);
         users.push({
            name:this.editUsername,
            email:this.editEmail,
            phoneNumber:this.editPhone,
            password:this.editPassword,
            role:this.editRole,
            isActive:true,
         });
         this.service.setRegisteredUsers(users);
         this.userList=this.service.getRegisteredUsers();
      }
      for (let i = 0; i < users.length; i++) {
        if (this.editEmail && users[i].email === this.editEmail) {
          users[i].name = this.editUsername;
          users[i].phoneNumber = this.editPhone;
          users[i].role = this.editRole;
          users[i].password = this.editPassword;
        }
        else{
         let b=[];
         for(let i=0;i<admins.length;i++){
          if(admins[i].email === this.editEmail){
             b=admins[i].Booking;
          }
         }
         admins=admins.filter((admin: { email: string; })=>admin.email !== this.editEmail);
         this.service.setAdmins(admins);

          users.push({
             name:this.editUsername,
             email:this.editEmail,
             phoneNumber:this.editPhone,
             password:this.editPassword,
             role:this.editRole,
             isActive:true,
             Booking:b
          });
          this.service.setRegisteredUsers(users);
          this.userList=this.service.getRegisteredUsers();
          return;

        }
      }
      this.service.setRegisteredUsers(users);
      this.userList=this.service.getRegisteredUsers();
    }
    else if (this.editRole === 'Admin') {
      
      console.log(this.adminList)
      for (let i = 0; i < admins.length; i++) {
        if (this.editEmail && admins[i].email === this.editEmail) {
          admins[i].name = this.editUsername;
          admins[i].phoneNumber = this.editPhone;
          admins[i].role = this.editRole;
          admins[i].password = this.editPassword;
          this.service.setAdmins(admins);
          this.adminList=this.service.getAdmins();
        }
        else{
          let b=[];
          for(let i=0;i<this.userList.length;i++){
             if(this.userList[i].email === this.editEmail){
               b=this.userList[i].Booking;
             }
          }
          users=users.filter((user:{email:string})=>user.email !== this.editEmail);
          this.service.setRegisteredUsers(users);
          admins.push({
            name:this.editUsername,
            email:this.editEmail,
            phoneNumber:this.editPhone,
            password:this.editPassword,
            role:this.editRole,
            isActive:true,
            Booking:b
          });
        }
        this.service.setAdmins(admins);
        this.adminList=this.service.getAdmins();
      }
    }
    const editUserForm = document.getElementById('edit-user');
    if (editUserForm) editUserForm.style.display = 'none';
    const addUserForm = document.getElementById('add-user');
    if (addUserForm) addUserForm.style.display = 'block';
  }
  toggleStatus(i: any) {

    let users = this.service.getRegisteredUsers();
    users[i].isActive = !users[i].isActive;
    this.service.setRegisteredUsers(users);
     this.userList=this.service.getRegisteredUsers();
  }
  redirectToAddUser() {
    const editUserForm = document.getElementById('edit-user');
    if (editUserForm) editUserForm.style.display = 'none';
    const addUserForm = document.getElementById('add-user');
    if (addUserForm) addUserForm.style.display = 'block';
    console.log("canclled")
  }
 
  editUser(i: any) {
    console.log(i);
    let users = this.service.getRegisteredUsers();
    this.editUsername = users[i].name;
    this.editEmail = users[i].email;
    this.editPassword = users[i].password;
    this.editPhone = users[i].phoneNumber;
    this.editRole = users[i].role
    const editUserForm = document.getElementById('edit-user');
    if (editUserForm) editUserForm.style.display = 'block';
    const addUserForm = document.getElementById('add-user');
    if (addUserForm) addUserForm.style.display = 'none';
  }
  deleteUser(i: any) {
    let users = this.service.getRegisteredUsers();
    users.splice(i, 1);
    this.service.setRegisteredUsers(users);
    this.userList=this.service.getRegisteredUsers();
  }
  editAdmin(i:any){
   let admins=this.service.getAdmins();
   this.editUsername = admins[i].name;
   this.editEmail = admins[i].email;
   this.editPassword = admins[i].password;
   this.editPhone = admins[i].phoneNumber;
   this.editRole = admins[i].role
   this.service.setAdmins(admins);
   this.adminList=this.service.getAdmins();
   const editUserForm = document.getElementById('edit-user');
   if (editUserForm) editUserForm.style.display = 'block';
   const addUserForm = document.getElementById('add-user');
   if (addUserForm) addUserForm.style.display = 'none';
  }
  deleteAdmin(i:any){
    let admins=this.service.getAdmins();
    admins.splice(i,1);
    this.service.setAdmins(admins);
  }
  toggleStatusadmin(i:any){
    let admins = this.service.getAdmins();
    admins[i].isActive = !admins[i].isActive;
     this.service.setAdmins(admins);
     this.adminList=this.service.getAdmins();
  }

}

