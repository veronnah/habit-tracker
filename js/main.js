let nav = 0;

const weekDayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

let weekDays = document.querySelector('.weekdays');
const checkBoxes = document.querySelector('.checkboxes__grid');
let daysOfMonth = [];
let weekDaysRow = [];

function load() {
    const dt = new Date();
    weekDaysRow = [];
    daysOfMonth = [];

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
        daysInMonth: new Date(year, month + 1, 0).getDate()
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

    checkBoxes.innerHTML = '';
    weekDaysRow.push(createWeekdays(paddingDays, date));
    pushDay();

}

function createWeekdays(paddingDays, date) {
    for (let i = 1; i <= paddingDays + date.daysInMonth; i++) {
        const dayString = `${date.month + 1}/${i - paddingDays}/${date.year}`;

        if (i > paddingDays) {
            let ipadding = i - paddingDays;

            let dayObj = {
                dayName: new Date(dayString).toLocaleString('en-us', {
                    weekday: 'short'
                }),
            };

            daysOfMonth.push(dayObj);
        }
    }
    console.log(daysOfMonth);
    return daysOfMonth;

}

function pushDay() {
    const container = document.getElementById('checkboxes__grid');
    weekDaysRow.forEach((element) => {
        element.forEach(obj => {

            container.innerHTML += `<div>${obj.dayName}</div>`;
        });
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