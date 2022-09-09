//reverse string
function reverseString(str) {
    let reverseString = str.split("").reverse().join("");
    return reverseString;
}

//check if palendrome
function palindrome(str) {
    if (str === reverseString(str)) {
        return true;
    } else {
        return false;
    }
}

//convert date(object) from number to string
function dateToStr(date) {
    const dateStr = {
        day: "",
        month: "",
        year: "",
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

//convert date to array of dates with diff formats as a string
function dateInAllFormats(date) {
    date = dateToStr(date);

    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//check palindrome for all date formats
function palindromeForAllFormats(date) {
    const dates = dateInAllFormats(date);
    let res = false;
    for (let i = 0; i < dates.length; i++) {
        if (palindrome(dates[i])) {
            res = true;
            break;
        }
    }
    return res;
}

//leap year
function leapYear(date) {
    if (
        date.year % 400 === 0 ||
        (date.year % 4 === 0 && date.year % 100 !== 0)
    ) {
        return true;
    } else {
        return false;
    }
}

//next date
function nextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //for feb month increment
    if (month === 2) {
        if (leapYear(date)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        //for other months increment
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    //for year increment
    if(month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

//previous date
function previousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //for feb month decrement
    if (month === 3) {
        if (leapYear(date)) {
            if (day === 0) {
                day = 29;
                month--;
            }
        } else {
            if (day  === 0) {
                day = 28;
                month--;
            }
        }
    } else {
        //for other months decrement
        if (day === 0 && date.month != 1) {  
            day = daysInMonth[date.month-2];
            month--;
        } else if(day === 0 && date.month === 1) {
            day = daysInMonth[11];
            month--;
        }
    }
    //for year decrement
    if(month  === 0) {
        month = 12;
        year--;
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

//find out next palindrome and how many dates are in between
function nextPalindrome(date) {
    let counter = 0;
    while(true) {
        date = nextDate(date);
        counter++;
        if(palindromeForAllFormats(date)) {
            break;
        }

    }

    return [date,counter];
}

function previousPalindrome(date) {
    let counter = 0;
    while(true) {
        date = previousDate(date);
        counter++;
        if(palindromeForAllFormats(date)) {
            break;
        }

    }

    return [date,counter];
}

//nearest palendrome 
function nearestPalendrome(date){
    let [nextPalindromeDate, nextCounter] = nextPalindrome(date);
    console.log(nextPalindromeDate,nextCounter);
    let [previousPalindromeDate, previousCounter] = previousPalindrome(date);
    console.log(previousPalindromeDate,previousCounter);
    console.log("COMPARE");

    if(nextCounter < previousCounter) {
        console.log(nextPalindromeDate,nextCounter);
        return [nextPalindromeDate,nextCounter];
    } else {
        console.log(previousPalindromeDate,previousCounter);
        return [previousPalindromeDate,previousCounter];
    }

}


//date object as a test example
let date = {
    day: 24,
    month: 2,
    year: 2025,
};



const birthdate = document.querySelector("#birthdate");
const checkBtn = document.querySelector("#check");
const output = document.querySelector("#output");

checkBtn.addEventListener("click",isOrNearestPalindrome);
function isOrNearestPalindrome(){
    if(birthdate.value) {
        let bdate = birthdate.value.toString();
        let arraydate = bdate.split("-");
        let dateObj = {
            day: Number(arraydate[2]),
            month: Number(arraydate[1]),
            year: Number(arraydate[0])
        }
        if(palindromeForAllFormats(dateObj)) {
            output.innerHTML = "Yayyy! Your Birthday is a Palindrome.";
        } else {
            const[palenDate, count] = nearestPalendrome(dateObj);
            palenDateStr = palenDate.day + "-" + palenDate.month + "-" +  palenDate.year;
            let day;
            if(count === 1) {
                day = "day";
            } else {
                day = "days"
            }
            output.innerHTML = "Opps! You missed Palendrome date ie " + palenDateStr + " by " + count + " " + day;
        }
    } else {
        output.innerHTML = "Insert Date!"
    }
};

