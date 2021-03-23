let nav = 0; 

const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

const checkBoxes = document.querySelector('.checkboxes__grid');
let daysOfMonth = [];
let rows = [];

function load(){
    const dt = new Date(); 
    rows =[];
    daysOfMonth = [];
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
    console.log(dateString);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); 
    

    document.querySelector('.monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`; 

    checkBoxes.innerHTML = ''; 

  
    function createRows(rowId) {
        for(let i = 1; i <= paddingDays + daysInMonth; i++){
           
            const checkboxRow = document.createElement('div');
            checkboxRow.classList.add('checkboxes-row'); 
    
           let checkBox = checkboxRow.innerHTML += 
            `<label class="check-container">
                <input type="checkbox" checked="checked">
                <span class="checkmark"></span>
            </label>`; 
    
            const dayString = `${month + 1}/${i - paddingDays}/${year}`; 
            console.log();
           
            if(i > paddingDays){
                let ipadding = i - paddingDays;
                checkboxRow.innerText = i - paddingDays;
                let dayObj = {
                    rowId: rowId,
                    dayNumber: ipadding,
                    dayName: new Date(dayString).toLocaleString('en-us', {weekday:'short'}),
                };
                daysOfMonth.push(dayObj);              
            }
            else{
                checkboxRow.innerText = '*';
            }
           
            checkBoxes.appendChild(checkboxRow);
        }
        return daysOfMonth;
    }
    console.log(daysOfMonth);
    for(let i = 0; i < 5; i++){
         rows.push(createRows(i));
         daysOfMonth = [];
    }
    console.log(rows);
   
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