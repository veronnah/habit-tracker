let nav = 0;

const weekDayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

const weekdays = document.querySelector('.weekdays');
const habitCheckboxes = document.querySelector('.habit__checkboxes');
let habitName = document.querySelector('.habit__name');

let weekDaysRow = [];
let habitData = [];
let daysOfMonth = [];

function load() {
    const dt = new Date();
    weekDaysRow = [];
    daysOfMonth = [];
    habitData = [];

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    let date = {
        day: day,
        month: month + 1,
        year: year,
        firstDayOfMonth: new Date(year, month, 1),
        daysInMonth: new Date(year, month + 1, 0).getDate(),
    }

    const dateString = date.firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddingDays = weekDayNames.indexOf(dateString.split(', ')[0]);

    document.querySelector('.monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', {month: 'long'})} ${date.year}`;

    habitCheckboxes.innerHTML = '';
    weekdays.innerHTML = '';
    habitName.innerHTML = '';

    weekDaysRow.push(createWeekdays(paddingDays, date));
    pushDay();

    habitData = JSON.parse(localStorage.getItem('habitData'));
    if (habitData != null && habitData != undefined) {

        let currentMonth = habitData.find(data => data.month == date.month && data.year == date.year);
        if (currentMonth != null && currentMonth != undefined) {
            // console.log(habitData);

            currentMonth.habitRows.forEach(el => {
                // console.log(el);
                let habitInput = `<input type="text" class="habit__text" id='${el.id}'>`;
                habitName.innerHTML += habitInput;

                el.checkBoxesRow.forEach(checkbox => {
                    habitCheckboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${el.id}' class="checkbox"  id='${checkbox.id}' ${checkbox.isChecked ? 'checked' : ''}/>`;
                });
            });
        }
    } else {
        createHabits(date);
    }

    saveInputValue(date);
    setCheckboxValue(date);

}

function createWeekdays(paddingDays, date) {
    for (let i = 1; i <= paddingDays + date.daysInMonth; i++) {
        const dayString = `${date.month + 1}/${i - paddingDays}/${date.year}`;

        if (i > paddingDays) {

            let dayObj = {
                dayName: new Date(dayString).toLocaleString('en-us', {
                    weekday: 'short'
                }),
            };

            daysOfMonth.push(dayObj);
        }
    }
    return daysOfMonth;
}

function pushDay() {
    const container = document.getElementById('weekdays');
    weekDaysRow.forEach((element) => {
        element.forEach(obj => {
            container.innerHTML += `<div>${obj.dayName}</div>`;
        });
    });
}


function createHabits(date) {
    let monthHabits = {
        year: date.year,
        month: date.month,
        habitRows: [],
    };

    let habitRow = {
        id: 1,
        value: '',
        checkBoxesRow: [],
    };

    monthHabits.habitRows.push(habitRow);
    for (let i = 1; i <= date.daysInMonth; i++) {
        let habitCheckBox = {
            isChecked: false,
            id: i,
        };

        habitCheckboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${habitRow.id}' class="checkbox"  id='${i}'${habitCheckBox.isChecked ? 'checked' : ''}/>`;

        habitRow.checkBoxesRow.push(habitCheckBox);
    }
    let habitInput = `<input type="text" class="habit__text" id='1'>`;
    habitName.innerHTML += habitInput;

    habitData = [];
    habitData.push(monthHabits);
    localStorage.setItem('habitData', JSON.stringify(habitData));
}

function setCheckboxValue(date) {
    document.querySelectorAll(".checkbox").forEach(el => {
        el.onchange = () => {
            let parentRowId = el.dataset.parentRowId;
            let currentMonth = habitData.find(month => month.year == date.year && month.month == date.month);

            let currentRow = currentMonth.habitRows.find(habitRow => habitRow.id == parentRowId);
            let currentCheckbox = currentRow.checkBoxesRow.find(checkbox => checkbox.id == el.id);
            currentCheckbox.isChecked = el.checked;

            localStorage.setItem('habitData', JSON.stringify(habitData));
        };

    });
}

function saveInputValue(date) {
    let inputElement = document.querySelector('.habit__text');

    inputElement.addEventListener('input', () => {
        let currentMonth = habitData.find(month => month.year == date.year && month.month == date.month);
        let currentRow = currentMonth.habitRows.find(habitRow => habitRow.value == habitRow.value);
        console.log(currentRow);
        currentRow.value = inputElement.value;
        localStorage.setItem('habitData', JSON.stringify(habitData));
    });

}

function navButtons() {

    document.getElementById('prevBtn').addEventListener('click', () => {
        nav--;
        load();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        nav++;
        load();

    });

}


navButtons();
load();