let nav = 0;

const weekDayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

const weekdays = document.querySelector('.weekdays');
const habitCheckboxes = document.querySelector('.habit__checkboxes');
let habitName = document.querySelector('.habit__name');
let habits = document.querySelector('.habits');
let habit = document.querySelectorAll('.habit');
let addNew = document.querySelector('.add-new__block');

let weekDaysRow = [];
let habitData = [];
let daysOfMonth = [];

function load() {
    let currentDate = initDate(true);
    let dateLocale = initDateString(currentDate);

    const paddingDays = weekDayNames.indexOf(dateLocale.split(', ')[0]);

    document.querySelector('.monthDisplay').innerText =
        `${currentDate.dt.toLocaleDateString('en-us', {month: 'long'})} ${currentDate.date.year}`;

    habitCheckboxes.innerHTML = '';
    weekdays.innerHTML = '';
    habitName.innerHTML = '';
    habits.innerHTML = '';
    habit.innerHTML = '';
    weekdays.dataset.year = currentDate.year;
    weekdays.dataset.month = ++currentDate.month;

    weekDaysRow.push(createWeekdays(paddingDays, currentDate.date));
    pushDay();

    habitData = JSON.parse(localStorage.getItem('habitData'));

    if (habitData != null && habitData.find(data => data.month === currentDate.date.month && data.year === currentDate.date.year)) {
        let currentMonth = habitData.find(data => data.month === currentDate.date.month && data.year === currentDate.date.year);
        if (currentMonth) {
            if (currentMonth.habitRows.length > 0) {
                weekdays.classList.remove('hidden');
                addNew.classList.remove('visible');
            } else {
                weekdays.classList.add('hidden');
                addNew.classList.add('visible');
            }

            currentMonth.habitRows.forEach(el => {
                let habitsLayout = createHabitsLayout();

                let habitInput = `<input type="text" class="habit__text" id='${el?.id}' data-year='${currentDate.date.year}' data-month='${currentDate.date.month}' value='${el.value}'>`;
                habitsLayout.name.innerHTML += habitInput;

                el.checkBoxesRow.forEach(checkbox => {
                    habitsLayout.checkboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${el.id}' class="checkbox"  id='${checkbox.id}' ${checkbox.isChecked ? 'checked' : ''}/>`;
                });
            });
        }
    } else {
        createDefaultHabits(currentDate.date);
    }

    saveInputValue(currentDate.date);
    setCheckboxValue(currentDate.date);
    addEventDelete();
}

function initDate(isNav = false) {
    const dt = new Date();
    weekDaysRow = [];
    daysOfMonth = [];

    if (isNav && nav !== 0) {
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

    return {
        dt: dt,
        date: date,
        day: day,
        month: month,
        year: year,
    }
}

function initDateString(currentDate) {
    const dateString = currentDate.date.firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    return dateString;
}

function createHabitsLayout() {
    let habits = document.querySelector('.habits');
    let habit = document.createElement('div');
    habit.className = 'habit';
    let habitName = document.createElement('div');
    habitName.className = 'habit__name';
    let habitCheckboxes = document.createElement('div');
    habitCheckboxes.className = 'habit__checkboxes';
    let habitDeleteBtn = document.createElement('div');
    habitDeleteBtn.className = 'habit__delete';
    habitDeleteBtn.innerHTML = `<img src="./img/minus.svg" alt="Options">`;
    let addNewBtn = document.createElement('div');
    addNewBtn.innerHTML =
        `<button onclick="addNewHabit()"><img src="./img/plus.svg" alt="Add new habit"></button>`;
    addNewBtn.className = 'add__new-btn';

    habit.appendChild(addNewBtn);
    habit.appendChild(habitDeleteBtn);
    habit.appendChild(habitName);
    habit.appendChild(habitCheckboxes);
    habits.appendChild(habit);
    return {
        name: habitName,
        checkboxes: habitCheckboxes
    };
}

function createWeekdays(paddingDays, date) {
    for (let i = 1; i <= paddingDays + date.daysInMonth; i++) {
        const dayString = `${date.month}/${i - paddingDays}/${date.year}`;

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
            container.innerHTML += `<div class="weekday">${obj.dayName}</div>`;
        });
    });
}

function createDefaultHabits(date) {
    let monthHabits = {
        year: date.year,
        month: date.month,
        habitRows: [],
    };

    for (let i = 1; i < 4; i++) {
        let habitRow = {
            id: i,
            value: '',
            checkBoxesRow: [],
        };
        monthHabits.habitRows.push(habitRow);
        habitData = JSON.parse(localStorage.getItem('habitData'));

        if (habitData != null && habitData.find(data => data.month === date.month && data.year === date.year)) {
            let currentMonth = habitData.find(data => data.month === date.month && data.year === date.year);
            if (currentMonth != null) {
                currentMonth.habitRows.forEach(el => {
                    let habitsLayout = createHabitsLayout();

                    let habitInput = `<input type="text" class="habit__text" id='${el.id}' value='${el.value}'>`;
                    habitsLayout.name.innerHTML += habitInput;

                    el.checkBoxesRow.forEach(checkbox => {
                        habitsLayout.checkboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${el.id}' class="checkbox"  id='${checkbox.id}' ${checkbox.isChecked ? 'checked' : ''}/>`;
                    });
                });
            }

        } else {
            let habitsLayout = createHabitsLayout();
            let habitInput = `<input type="text" class="habit__text"  id='${i}' data-year='${date.year}' data-month='${date.month}'>`;
            habitsLayout.name.innerHTML += habitInput;

            for (let i = 1; i <= date.daysInMonth; i++) {
                let habitCheckBox = {
                    isChecked: false,
                    id: i,
                };

                habitsLayout.checkboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${habitRow.id}' class="checkbox"  id='${i}'${habitCheckBox.isChecked ? 'checked' : ''}/>`;
                habitRow.checkBoxesRow.push(habitCheckBox);
                setCheckboxValue(date);
            }
        }
        saveInputValue(date);
    }

    if (localStorage.getItem('habitData') === null) {
        habitData = [];
        habitData.push(monthHabits);
        localStorage.setItem('habitData', JSON.stringify(habitData));
    } else {
        habitData.push(monthHabits);
        localStorage.setItem('habitData', JSON.stringify(habitData));
    }
}

function setCheckboxValue(date) {
    document.querySelectorAll(".checkbox").forEach(el => {
        el.onchange = () => {
            let parentRowId = el.dataset.parentRowId;
            let currentMonth = habitData.find(month => month.year === date.year && month.month === date.month);
            let currentRow = currentMonth.habitRows.find(habitRow => habitRow.id === +parentRowId);
            let currentCheckbox = currentRow.checkBoxesRow.find(checkbox => checkbox.id === +el.id);
            currentCheckbox.isChecked = el.checked;
            localStorage.setItem('habitData', JSON.stringify(habitData));
        };
    });
}

function saveInputValue(date) {
    document.querySelectorAll('.habit__text').forEach(el => {
        el.addEventListener('input', () => {
            let currentMonth = habitData.find(month => month.year === date.year && month.month === date.month);
            let currentRow = currentMonth.habitRows.find(habitRow => habitRow.id === +el.id);

            currentRow.value = el.value;
            localStorage.setItem('habitData', JSON.stringify(habitData));
        });
    });

}

function addNewHabit() {
    let dateObj = initDate(true);
    habitData = JSON.parse(localStorage.getItem('habitData'));

    if (habitData != null && habitData.find(data => data.month === dateObj.date.month && data.year === dateObj.date.year)) {
        let currentMonth = habitData.find(data => data.month === dateObj.date.month && data.year === dateObj.date.year);

        let habitRowsFiltered = currentMonth.habitRows.filter(el => {
            return el !== null && el !== '';
        });

        if(++habitRowsFiltered.length > 0){
            addNew.classList.remove('visible');
            weekdays.classList.remove('hidden');
        }

        let newId = ++habitRowsFiltered.length;

        let habitRow = {
            id: newId,
            value: '',
            checkBoxesRow: [],
        };

        currentMonth.habitRows.push(habitRow);

        let habitsLayout = createHabitsLayout();

        let habitInput = `<input type="text" class="habit__text" id='${newId}' data-year='${dateObj.date.year}' data-month='${dateObj.date.month}'>`;
        habitsLayout.name.innerHTML += habitInput;

        for (let i = 1; i <= dateObj.date.daysInMonth; i++) {
            let habitCheckBox = {
                isChecked: false,
                id: i,
            };

            habitsLayout.checkboxes.innerHTML += `<input type="checkbox" data-parent-row-id='${newId}' class="checkbox" id='${i}'${habitCheckBox.isChecked ? 'checked' : ''}/>`;

            habitRow.checkBoxesRow.push(habitCheckBox);
            setCheckboxValue(dateObj.date);
        }

    }
    saveInputValue(dateObj.date);

    localStorage.setItem('habitData', JSON.stringify(habitData));
    addEventDelete();
}

function deleteHabitRow(event) {
    let clickedElement = event.target.parentNode.parentNode;
    let currentRowInput = event.target.parentNode.nextElementSibling?.firstChild;
    let currentYear = +currentRowInput?.dataset.year;
    let currentMonth = +currentRowInput?.dataset.month;
    let currentId = +currentRowInput?.id;
    let filteredHabitData;

    if (currentRowInput) {
        filteredHabitData = habitData.find(e => e.year === currentYear && e.month === currentMonth).habitRows.filter(e => e.id !== currentId);
    }

    if (filteredHabitData) {
        habitData.map(rows => {
            if (rows.year === currentYear && rows.month === currentMonth) {
                rows.habitRows = filteredHabitData;
            }
        });

        if (filteredHabitData.length === 0) {
            weekdays.classList.add('hidden');
            addNew.classList.add('visible');
        }

        clickedElement.remove();
        localStorage.removeItem('habitData');
        localStorage.setItem('habitData', JSON.stringify(habitData));
    }
}

function addEventDelete() {
    let deleteRowBtns = document.querySelectorAll('.habit__delete');
    for (let btn of deleteRowBtns) {
        btn.addEventListener('click', event => {
            deleteHabitRow(event);
        });
    }
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