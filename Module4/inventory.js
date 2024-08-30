class Product {
  constructor(name, price, quantity) {
    this.pName = name;
    this.pPrice = price;
    this.pQuantity = quantity;

    this.display = function () {
      console.log(this.pName + " " + this.pPrice + " " + this.pQuantity);
    };
  }
}

let inventory = [];
let editIndex = -1;

function inputFun(event) {
  if (!isNaN(event.target.value)) {
    document.querySelector('.product-name').style.color = 'red';
    document.querySelector('.product-name').style.borderColor = 'red';
  } else {
    document.querySelector('.product-name').style.color = 'black';
    document.querySelector('.product-name').style.borderColor = 'lightgrey';
  }
}

const addBtn = document.querySelector('.add-btn');

function handleSubmit(event) {
  event.preventDefault();

  const Pname = document.querySelector('.product-name').value;
  const Pprice = document.querySelector('.price-input').value;
  const pQuantity = document.querySelector('.quantity-input').value;

  if (!Pname || !Pprice || !pQuantity) {
    document.querySelector('.product-name').style.borderColor = 'red';
    document.querySelector('.quantity-input').style.borderColor = 'red';
    document.querySelector('.price-input').style.borderColor = 'red';
    return;
  } else {
    document.querySelector('.product-name').style.borderColor = 'black';
    document.querySelector('.quantity-input').style.borderColor = 'black';
    document.querySelector('.price-input').style.borderColor = 'black';
  }

  if (editIndex !== -1) {
    // Update existing product
    inventory[editIndex].pName = Pname;
    inventory[editIndex].pPrice = Number(Pprice);
    inventory[editIndex].pQuantity = Number(pQuantity);

    editIndex = -1;
    addBtn.textContent = 'Add Product';
  } else {
    // Add new product
    inventory.push(new Product(Pname, Number(Pprice), Number(pQuantity)));
  }

  document.querySelector('.body-st').innerHTML = display();
  clearInputs();
}

function editFunction(index) {
  editIndex = index;
  addBtn.textContent = 'Update Product';

  document.querySelector('.product-name').value = inventory[index].pName;
  document.querySelector('.price-input').value = inventory[index].pPrice;
  document.querySelector('.quantity-input').value = inventory[index].pQuantity;
}

function deleteFunction(index) {
  inventory.splice(index, 1);
  document.querySelector('.body-st').innerHTML = display();
}

function display() {
  let s = '';
  for (let i = 0; i < inventory.length; i++) {
    s += `<tr>
      <td>${inventory[i].pName}</td>
      <td class="price-input${i}">${inventory[i].pPrice}</td>
      <td class="quantity-input${i}">${inventory[i].pQuantity}</td>
      <td><button id="edit-btn" class="edit-btn${i}" onClick="editFunction(${i})">Edit</button></td>
      <td><button id="delete-btn" class="delete-btn${i}" onClick="deleteFunction(${i})">Delete</button></td>
    </tr>`;
  }
  return s;
}

function clearInputs() {
  document.querySelector('.product-name').value = '';
  document.querySelector('.price-input').value = '';
  document.querySelector('.quantity-input').value = '';
}
