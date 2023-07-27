export const Time=(timeString)=>
{
const timeComponents = timeString.split(/:| /);
let hour = parseInt(timeComponents[0], 10);
const minute = parseInt(timeComponents[1], 10);
const second = parseInt(timeComponents[2], 10);
const period = timeComponents[3].toLowerCase();

// Convert hour to 24-hour format if the period is "pm"
if (period === "pm" && hour !== 12) {
  hour += 12;
} else if (period === "am" && hour === 12) {
  hour = 0;
}

// Create a new date object with the current date and the parsed time components
const currentDate = new Date();
const dateObject = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  hour,
  minute,
  second
);
return dateObject;
}


export const myDate=(dateString)=>
{
    const dateComponents = dateString.split('/');
    const day = parseInt(dateComponents[0], 10);
    const month = parseInt(dateComponents[1], 10);
    const year = parseInt(dateComponents[2], 10);

    return dateObject = new Date(year, month - 1, day);
}