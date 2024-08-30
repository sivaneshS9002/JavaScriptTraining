interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

let EditIndex:number=-1;
const err = document.querySelector('.err-message') as HTMLParagraphElement ;
const userName = document.querySelector('.userName') as HTMLInputElement;
const userEmail = document.querySelector('.user-Email') as HTMLInputElement;
const selectedPosition = document.querySelector('.selected-positions') as HTMLSelectElement;
let userArray: User[] = [];
class UserManager {
    public static createUser(user: User) {
        if (userArray.length > 0) {
            if (userArray.find((i) => i.email == user.email)) {
                err.textContent="User email Already Exists";
                err.style.display='block';
            }
            else
            {
                err.textContent='';
                err.style.display='none';
                userArray.push(user);
            }

        }
        else {
            userArray.push(user);
        }
    }
    display() {
        console.log(userArray);
    }
    public static createRow() {
        const rootElement = document.querySelector('.display-container') as HTMLDivElement;

        let s: string = ``;
        let cnt = 1;
        for (let user of userArray) {
            s += `<div class="f1" >
                    <p class='userN'>${cnt++})${user.name}</p>
                    <p class="userE">${user.email}</p>
                    <p class="userR" data-id="${user.id}">${user.role}</p>
                     <div >
                        <button class="s-btn" id="ed-st"  data-id="${user.id}" onclick="handleEdit(${user.id},event)">Edit</button>
                        <button class="s-btn delete-btn" onclick="handleDelete(${user.id})">Delete</button>
                     </div>
                  </div>`
        }
        rootElement.innerHTML = s;
    }

    public static deleteRow(id: number) {
        userArray = userArray.filter((index) => index.id != id);
    }

    public static editRow(id: number, event: Event) {
        const editBtn = event.target as HTMLButtonElement;
        const btnId: number = Number(editBtn.getAttribute('data-id'));
        const userP = document.querySelectorAll('.userR');

        let rP = document.querySelector('.userR')

        userP.forEach((index) => {
            if (Number(index.getAttribute('data-id')) === btnId) {
                rP = index as HTMLParagraphElement;
                return;
            }
        })
        if (editBtn.textContent === 'Edit') {
            editBtn.textContent = 'Update';
           let obj:any=userArray.find((index)=>index.id === id);
             userName.value = obj?.name;
             userEmail.value =obj?.email
             EditIndex = obj?.id;
             console.log("Edit Clicked"+EditIndex);
        }
        else {
            editBtn.textContent = 'Edit';
          
        }
    }


}
function handleUserName(event: Event): void {
    if (Number((event.target as HTMLInputElement).value)) {
        userName.style.borderColor = 'red';
        userName.style.color = 'red';
    }
    else {
        userName.style.borderColor = 'lightgrey';
        userName.style.color = 'black';
    }
}
let b: boolean = true
let userRole: string;
function handleChangingElement(): void {
    userRole = selectedPosition.value;
    b = false;
}
if (b) {
    userRole = selectedPosition.value;
}
//  const addUser = document.querySelector('.add-st') as HTMLButtonElement;
let cnt = 1;

function handleCLick(event: Event): void {
    event.preventDefault();
    if (!userName.value || !userEmail.value) {
        err.textContent="Please Enter the Fields";
        err.style.display = 'block';

    }
    else {

         if(EditIndex!=-1)
         {
             console.log(EditIndex)
             for(let i=0;i<userArray.length;i++)
             {
                 if(userArray[i].id === EditIndex)
                 {
                    userArray[i].name=userName.value;
                    userArray[i].email=userEmail.value;
                    userArray[i].role=userRole;
                 }
             }
           console.log(userArray);
         UserManager.createRow();
         EditIndex =-1;
         }
         else 
         {
        err.style.display = 'none';
        err.textContent ='';
        console.log(userName.value + "  " + userEmail.value + " " + userRole);
        let user = {
            id: cnt++,
            name: userName.value,
            email: userEmail.value,
            role: userRole
        }
        let u = new UserManager();
        UserManager.createUser(user)
        u.display();
        UserManager.createRow();
    }
    }

    userName.value = "";
    userEmail.value = "";
}

function handleDelete(id: number) {
    UserManager.deleteRow(id);
    UserManager.createRow();
    console.log(userArray + " " + id);
}

function handleEdit(id: number, event: Event) {
    UserManager.editRow(id, event);
}








//    user.name=editedName,
//    user.email=editedEmail,
//    user.role=editedRole