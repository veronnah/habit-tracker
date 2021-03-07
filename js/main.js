let nav = 0; 


const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

const checkBoxes = document.querySelector('.checkboxes');



function load(){
    const dt = new Date(); 

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate(); 
    const month = dt.getMonth(); 
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday: 'long',
        year: 'numeric', 
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', '), [0]); 

    document.querySelector('.monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`; 

    checkBoxes.innerHTML = ''; 

    console.log(paddingDays);
    console.log(daysInMonth);
    for(let i = 0; i <= paddingDays + daysInMonth; i++){
        const checkBox = document.createElement('div');
        checkBox.classList.add('checkbox-container'); 

       let cb = checkBoxes.innerHTML += 
        `<label class="check-container">
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
        </label>`; 


        

        const dayString = `${month + 1}/${i - paddingDays}/${year}`; 
        
        // if(i > paddingDays){
        //     checkBox.innerText = i - paddingDays;
        // }

        
        checkBoxes.appendChild(checkBox);
        console.log(checkBox);

    }
}

function navButtons(){
    document.getElementById('prevBtn').addEventListener('click', ()=> {
        nav--; 
        load();
    });
    document.getElementById('nextBtn').addEventListener('click', ()=> {
        nav++; 
        load();
    });
}


navButtons(); 
load(); 
