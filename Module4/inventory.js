
function Product(name,price,quantity){
     this.pName =name;
     this.pPrice =price;
      this.pQuantity =quantity;
    this.display = function()
      {
        console.log(this.pName+" "+this.pPrice+" "+this.pQuantity);
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
 document.querySelector('.price-input').addEventListener('input',(event)=>{
    if(isNaN(event.target.value))
    {
        document.querySelector('.price-input').style.color ='red';
        document.querySelector('.price-input').style.borderColor='red';
    }
    else{
        
        document.querySelector('.price-input').style.color ='black';
        document.querySelector('.price-input').style.borderColor='lightgrey';
    }
 });
 document.querySelector('.quantity-input').addEventListener('input',(event)=>{
    if(isNaN(event.target.value))
    {
        document.querySelector('.quantity-input').style.color ='red';
        document.querySelector('.quantity-input').style.borderColor='red';
    }
    else{
        
        document.querySelector('.quantity-input').style.color ='black';
        document.querySelector('.quantity-input').style.borderColor='lightgrey';
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
      let s=``;
      for(let i=0;i<inventory.length;i++)
      {
        s+=`<tr>
          <td>${inventory[i].pName}</td>
          <td>${inventory[i].pPrice}</td>
          <td>${inventory[i].pQuantity}</td>
         </tr>`
      }
      console.log(s);
      document.querySelector('.body-st').innerHTML = s;
    }
}); 