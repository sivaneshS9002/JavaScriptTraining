const arr = [];
 function handleStudent(event) {
    if (Number(event.target.value)) {
        document.querySelector('.st-name').style.color = 'red';
        document.querySelector('.st-name').style.borderColor = 'red';
    }
    else {
        document.querySelector('.st-name').style.color = 'black';
        document.querySelector('.st-name').style.borderColor = 'lightgrey';
    }
}






function handleAdd(event) {
    event.preventDefault();
    let stName = document.querySelector('.st-name').value;
    let stGrade = document.querySelector('.grade-st').value;
    if (!stName || !stGrade) {
      document.querySelector('.error-message').textContent='Please enter the given Input fields';
       document.querySelector('.error-message').style.display="block";
    }
    stGrade = Number(stGrade);
    console.log(typeof stGrade)
    if (stGrade > 100) {
        document.querySelector('.error-message').textContent='Enter the Valid Grade';
        document.querySelector('.error-message').style.display="block";
    }
    let student = {
        name: stName,
        grade: stGrade,
    }
    if (arr.length < 1) {
        arr.push(student);
    }
    else {
        let b=true;
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].name === student.name) {
                b=false;
                document.querySelector('.error-message').textContent='User Already Exists';
                document.querySelector('.error-message').style.display="block";
            }
        }
        if(b)
        {
            arr.push(student);
        }

    }
      document.querySelector('.st-name').value ="";
      document.querySelector('.grade-st').value ="";
}
   function handleGradeBtn(event){
    let s = '';

    if (arr.length == 0) {
        document.querySelector('.error-message').textContent='Please enter the given Input fields'; 
        document.querySelector('.error-message').style.display="block"; 
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            s += `<p class="list-st">${i + 1}.${arr[i].name}-<span class='grade-container'>${arr[i].grade}<span></p>`;
        }
        document.querySelector('.student-list').innerHTML = s;
    }
};
 function handleCalculate(event) {
    if (arr.length == 0) {
        document.querySelector('.error-message').textContent='Please enter the given Input fields'; 
        document.querySelector('.error-message').style.display="block";  
    }
    else
    {
    let avg = 0;
    for (i = 0; i < arr.length; i++) {
        avg += Number(arr[i].grade);
    }
    console.log(avg / arr.length);
    document.querySelector('.avg-st').textContent = Math.round(avg / arr.length);
}
}