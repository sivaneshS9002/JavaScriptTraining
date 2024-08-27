 document.querySelector('.principal-amount').addEventListener('input',(event)=>{
      if(isNaN(event.target.value))
      {
        document.querySelector('.principal-amount').style.color ='red';
        document.querySelector('.principal-amount').style.borderColor='red';
      }
      else{
        document.querySelector('.principal-amount').style.color ='black';
        document.querySelector('.principal-amount').style.borderColor='black';
      }
 })
 document.querySelector('.year').addEventListener('input',(event)=>{
  if(isNaN(event.target.value))
  {
    document.querySelector('.year').style.color ='red';
    document.querySelector('.year').style.borderColor ='red';
  }
  else{
    document.querySelector('.year').style.color ='black';
    document.querySelector('.year').style.borderColor ='black';
  }
}) 
document.querySelector('.rate').addEventListener('input',(event)=>{
  if(isNaN(event.target.value))
  {
    document.querySelector('.rate').style.color ='red';
    document.querySelector('.rate').style.borderColor='red';
  }
  else{
    document.querySelector('.rate').style.color ='black';
    document.querySelector('.rate').style.borderColor='black';  
  }
})

document.getElementById('form-detail').addEventListener('submit',(event)=>{
    event.preventDefault();
    let p=document.querySelector('.principal-amount').value;
let n=document.querySelector('.year').value;
let r=document.querySelector('.rate').value;
 if(n==="" || r==="" || p==="")
 {
   alert('-----Enter the Appropriate fields----');
 }
  n=Number(n);
  r=Number(r);
  p=Number(p);
  if(p>=500 && p<=10000)
  {
    if(p<1000)
    {
  
        document.querySelector('.Interest-c').innerHTML = `${interest(p,r,n)}`;
  document.querySelector('.Total').innerHTML = `${interest(p,r,n)+p}`;
  document.querySelector('.Additional-c').innerHTML = `Your applied with extra ${r}% rate`;
    }
    else if(p>1000 &&  p<5000)
    {
    
       document.querySelector('.Interest-c').innerHTML = `${interest(p,r,n)}`;
  document.querySelector('.Total').innerHTML = `${interest(p,r,n)+p}`;
  document.querySelector('.Additional-c').innerHTML = `Your applied with extra ${r}% rate`;

    }
    else if(p>5000)
    {

        document.querySelector('.Interest-c').innerHTML = `${interest(p,r,n)}`;
  document.querySelector('.Total').innerHTML = `${interest(p,r,n)+p}`;
  document.querySelector('.Additional-c').innerHTML = `Your applied with extra ${r}% rate`;
    }
    else if(n>5)
    {
         b=true;
        r=r+2;
        document.querySelector('.Interest-c').innerHTML = `${interest(p,r,n)}`;
       document.querySelector('.Total').innerHTML = `${interest(p,r,n)+p}`;
        document.querySelector('.Additional-c').innerHTML = 'Your applied with extra 2% rate';
    }
}
  else{
    document.querySelector('.err-message').style.display = 'block';
  }
    if(b===false)
    {
     document.querySelector('.Additional-c').innerHTML = `---`;
    }


     document.querySelector('.principal-amount').value ="";
     document.querySelector('.year').value="";
     document.querySelector('.rate').value="";
});
function interest(principal,rate,time)
{
console.log(principal+" "+rate+" "+time);
return  Math.round((principal*rate*time )/100);
}