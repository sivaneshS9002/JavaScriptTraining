"use strict";
var EditIndex = -1;
var err = document.querySelector('.err-message');
var userName = document.querySelector('.userName');
var userEmail = document.querySelector('.user-Email');
var selectedPosition = document.querySelector('.selected-positions');
var userArray = [];
var UserManager = /** @class */ (function () {
    function UserManager() {
    }
    UserManager.createUser = function (user) {
        if (userArray.length > 0) {
            if (userArray.find(function (i) { return i.email == user.email; })) {
                err.textContent = "User email Already Exists";
                err.style.display = 'block';
            }
            else {
                err.textContent = '';
                err.style.display = 'none';
                userArray.push(user);
            }
        }
        else {
            userArray.push(user);
        }
    };
    UserManager.prototype.display = function () {
        console.log(userArray);
    };
    UserManager.createRow = function () {
        var rootElement = document.querySelector('.display-container');
        var s = "";
        var cnt = 1;
        for (var _i = 0, userArray_1 = userArray; _i < userArray_1.length; _i++) {
            var user = userArray_1[_i];
            s += "<div class=\"f1\" >\n                    <p class='userN'>".concat(cnt++, ")").concat(user.name, "</p>\n                    <p class=\"userE\">").concat(user.email, "</p>\n                    <p class=\"userR\" data-id=\"").concat(user.id, "\">").concat(user.role, "</p>\n                     <div >\n                        <button class=\"s-btn\" id=\"ed-st\"  data-id=\"").concat(user.id, "\" onclick=\"handleEdit(").concat(user.id, ",event)\">Edit</button>\n                        <button class=\"s-btn delete-btn\" onclick=\"handleDelete(").concat(user.id, ")\">Delete</button>\n                     </div>\n                  </div>");
        }
        rootElement.innerHTML = s;
    };
    UserManager.deleteRow = function (id) {
        userArray = userArray.filter(function (index) { return index.id != id; });
    };
    UserManager.editRow = function (id, event) {
        var editBtn = event.target;
        var btnId = Number(editBtn.getAttribute('data-id'));
        var userP = document.querySelectorAll('.userR');
        var rP = document.querySelector('.userR');
        userP.forEach(function (index) {
            if (Number(index.getAttribute('data-id')) === btnId) {
                rP = index;
                return;
            }
        });
        if (editBtn.textContent === 'Edit') {
            editBtn.textContent = 'Update';
            var obj = userArray.find(function (index) { return index.id === id; });
            userName.value = obj === null || obj === void 0 ? void 0 : obj.name;
            userEmail.value = obj === null || obj === void 0 ? void 0 : obj.email;
            EditIndex = obj === null || obj === void 0 ? void 0 : obj.id;
            console.log("Edit Clicked" + EditIndex);
        }
        else {
            editBtn.textContent = 'Edit';
        }
    };
    return UserManager;
}());
function handleUserName(event) {
    if (Number(event.target.value)) {
        userName.style.borderColor = 'red';
        userName.style.color = 'red';
    }
    else {
        userName.style.borderColor = 'lightgrey';
        userName.style.color = 'black';
    }
}
var b = true;
var userRole;
function handleChangingElement() {
    userRole = selectedPosition.value;
    b = false;
}
if (b) {
    userRole = selectedPosition.value;
}
//  const addUser = document.querySelector('.add-st') as HTMLButtonElement;
var cnt = 1;
function handleCLick(event) {
    event.preventDefault();
    if (!userName.value || !userEmail.value) {
        err.textContent = "Please Enter the Fields";
        err.style.display = 'block';
    }
    else {
        if (EditIndex != -1) {
            console.log(EditIndex);
            for (var i = 0; i < userArray.length; i++) {
                if (userArray[i].id === EditIndex) {
                    userArray[i].name = userName.value;
                    userArray[i].email = userEmail.value;
                    userArray[i].role = userRole;
                }
            }
            console.log(userArray);
            UserManager.createRow();
        }
        else {
            err.style.display = 'none';
            err.textContent = '';
            console.log(userName.value + "  " + userEmail.value + " " + userRole);
            var user = {
                id: cnt++,
                name: userName.value,
                email: userEmail.value,
                role: userRole
            };
            var u = new UserManager();
            UserManager.createUser(user);
            u.display();
            UserManager.createRow();
        }
    }
    userName.value = "";
    userEmail.value = "";
}
function handleDelete(id) {
    UserManager.deleteRow(id);
    UserManager.createRow();
    console.log(userArray + " " + id);
}
function handleEdit(id, event) {
    UserManager.editRow(id, event);
}
//    user.name=editedName,
//    user.email=editedEmail,
//    user.role=editedRole
