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
        month: month,
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

    createHabits(date);

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

    let habitField = {
        value: '',
        id: '1',
    };

    for (let i = 1; i <= date.daysInMonth; i++) {
        let habitCheckBox = {
            attr: false,
            id: i,
        };

        habitCheckboxes.innerHTML += `<input type="checkbox" class="checkbox" id='${i}'${habitCheckBox.attr ? 'checked' : ''}/>`;
        document.querySelectorAll(".checkbox").forEach(el => {
            el.onchange = () => localStorage.setItem(el.id, el.checked);
            el.checked = localStorage.getItem(el.id) === "true";
        })
        habitData.push(habitCheckBox);
    }

    let habitInput = '<input type="text" class="habit__text" id="input1">';

    habitName.innerHTML += habitInput;

    let inputElement = document.getElementById('input1');
    inputElement.addEventListener('change', () => {
        habitField.value = inputElement.value;
        saveInputValue(habitField);
    });

    habitData.push(habitField);
    inputElement.value = JSON.parse(localStorage.getItem('habitName'));

}

function saveInputValue(habitField) {
    localStorage.setItem("habitName", JSON.stringify(habitField.value));
    console.log(window.localStorage.getItem('habitName'));
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