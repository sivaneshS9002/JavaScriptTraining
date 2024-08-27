
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

 document.querySelector('.product-name').addEventListener('input',(event)=>{
    if(!isNaN(event.target.value))
    {
        document.querySelector('.product-name').style.color ='red';
        document.querySelector('.product-name').style.borderColor='red';
    }
    else{
        document.querySelector('.product-name').style.color ='black';
        document.querySelector('.product-name').style.borderColor='lightgrey';
    }
 });

document.getElementById('details').addEventListener('submit',(event)=>{
   event.preventDefault();
     const Pname =document.querySelector('.product-name').value;
     const Pprice =document.querySelector('.price-input').value;
     const pQuantity=document.querySelector('.quantity-input').value;

      if(!Pname || !Pprice || !pQuantity)
      {
        document.querySelector('.product-name').style.borderColor = 'red';
        document.querySelector('.quantity-input').style.borderColor = 'red';
        document.querySelector('.price-input').style.borderColor = 'red';
      }
      else{
        document.querySelector('.product-name').style.borderColor = 'black';
        document.querySelector('.quantity-input').style.borderColor = 'black';
        document.querySelector('.price-input').style.borderColor = 'black';
      inventory.push(new Product(Pname,Number(Pprice),Number(pQuantity)));
      document.querySelector('.body-st').innerHTML =  display(``);
    }


    document.querySelector('.product-name').value="";
    document.querySelector('.price-input').value="";
    document.querySelector('.quantity-input').value="";
}); 


     function editFunction(index)
     {
           const editQuantity= document.querySelector(`.quantity-input${index}`);
           const editPrice =document.querySelector(`.price-input${index}`);
           const btn =document.querySelector(`.edit-btn${index}`);
           if(btn.textContent === "Edit")
           {
              btn.textContent = "Update";
              editQuantity.setAttribute('contenteditable','true');
              editPrice.setAttribute('contenteditable','true')
           }
           else{
             
            btn.textContent ="Edit";
            let editedQuantity =editQuantity.textContent;
            let editedPrice =editPrice.textContent;
           console.log(editedPrice+"  "+editedQuantity);
            inventory[index].pPrice=editedPrice;
            inventory[index].pQuantity=editedQuantity;
            console.log(inventory[index]);
           }
     }
     function deleteFunction(index)
     {
            inventory.splice(index,1);
            document.querySelector('.body-st').innerHTML =  display(``);
     }



     function display(s)
     {
      for(let i=0;i<inventory.length;i++)
        {
          s+=`<tr>
            <td>${inventory[i].pName}</td>
            <td class="price-input${i}">${inventory[i].pPrice}</td>
            <td class="quantity-input${i}">${inventory[i].pQuantity}</td>
            <td><button id="edit-btn" class="edit-btn${i}" onClick="editFunction(${i})">Edit</button></td>
            <td><button id="delete-btn" class="delete-btn${i}" onClick="deleteFunction(${i})">Delete</button></td>
           </tr>`
        }
        return s;
     }