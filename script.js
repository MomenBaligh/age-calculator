const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const calculatorBtn = document.getElementById("btn-calculator");

const dayNumbers = document.getElementById("day-numbers");
const monthNumbers = document.getElementById("month-numbers");
const yearNumbers = document.getElementById("year-numbers");

const invalidDayMsg = document.getElementById("invalid-day-msg");
const invalidMonthMsg = document.getElementById("invalid-month-msg");
const invalidYearMsg = document.getElementById("invalid-year-msg");




function fullDateBuilder({day, month, year}) {
    const fullDate = `${month}/${day}/${year}`;
    return new Date(fullDate);
}

function validateDate() {
    const inputDayValue = parseInt(inputDay.value);
    const inputMonthValue = parseInt(inputMonth.value);
    const inputYearValue = parseInt(inputYear.value);
    const actuallyDate = new Date();

    const validDay = !isNaN(inputDayValue) && inputDayValue >= 1 && inputDayValue <= 31;
    const validMonth = !isNaN(inputMonthValue) && inputMonthValue >= 1 && inputMonthValue <= 12;
    const validYear = !isNaN(inputYearValue) && inputYearValue >= 1900 && inputYearValue <= actuallyDate.getFullYear();

    inputDay.classList.toggle("invalid", !validDay);
    inputMonth.classList.toggle("invalid", !validMonth);
    inputYear.classList.toggle("invalid", !validYear);

    invalidDayMsg.innerText = validDay ? "" : "must be a valid day";
    invalidMonthMsg.innerText = validMonth ? "" : "must be a valid month";
    invalidYearMsg.innerText = validYear ? "" : "must be a valid year";

    return validDay && validMonth && validYear;
}

function ageCalculator() {
    if (!validateDate()) return;

    const birthDate = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);
    const actuallyDate = new Date();

    let resultYears = actuallyDate.getFullYear() - birthDate.getFullYear();
    let resultMonths = actuallyDate.getMonth() - birthDate.getMonth();
    let resultDays = actuallyDate.getDate() - birthDate.getDate();

    if (resultDays < 0) {
        resultMonths--;
        const tempActuallyDate = new Date(actuallyDate);
        tempActuallyDate.setMonth(actuallyDate.getMonth() - 1);
        resultDays += (actuallyDate - tempActuallyDate) / (1000 * 60 * 60 * 24);
    }

    if (resultMonths < 0) {
        resultYears--;
        resultMonths += 12;
    }

    dayNumbers.innerText = resultDays;
    monthNumbers.innerText = resultMonths;
    yearNumbers.innerText = resultYears;
}

function nextFocus(e, id) {
    if(e.key === "Enter" || e.keyCode === "13") {
        const input = document.getElementById(id);
    
        if(input.focus) {
            input.focus();
            return false;
        }
        if(input.click) {
            input.click();
            return false;
        }
    }
    return true;
}

window.addEventListener("load", () => {
    calculatorBtn.addEventListener("click", () => {
        ageCalculator();
    })
   
})