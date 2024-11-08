// Getting input elements for day, month, and year from the form
const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

// Getting output elements for displaying calculated days, months, and years
const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

// Selecting the form element
const form = document.querySelector("form");

// Getting the current date and splitting it into day, month, and year
const date = new Date();
let day = date.getDate();        // Current day
let month = 1 + date.getMonth(); // Current month (getMonth() is zero-based)
let year = date.getFullYear();    // Current year

// Array holding the number of days in each month for validation
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Validation function to check if input values are correct
function validate() {
  // Selects all input elements in the form
  const inputs = document.querySelectorAll("input");
  let validator = true; // Boolean flag to check if all inputs are valid
  
  // Loops through each input field to check for errors
  inputs.forEach((i) => {
    const parent = i.parentElement; // Gets the parent element to show error messages
    
    if (!i.value) { // Checks if the input is empty
      i.style.borderColor = "red"; // Highlights input in red if empty
      parent.querySelector("small").innerText = "This field is required."; // Error message
      validator = false;
    } else if (monthInp.value > 12) { // Checks if month input is valid
        monthInp.style.borderColor = "red";
        monthInp.parentElement.querySelector("small").innerText = "Must be a valid month.";
        validator = false;
    } else if (dayInp.value > 31) { // Checks if day input is valid
        dayInp.style.borderColor = "red";
        dayInp.parentElement.querySelector("small").innerText = "Must be a valid day.";
        validator = false;
    } else {
      // If input is valid, reset border color and error message
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
      validator = true;
    }
  });
  return validator; // Returns true if all inputs are valid, false otherwise
}

// Function to calculate the age based on user input and display the result
function handleSubmit(e) {
  e.preventDefault(); // Prevents form from submitting and refreshing the page
  
  // If validation passes, proceed with age calculation
  if (validate()) {
    // Adjusts days and months if needed to calculate age accurately
    if (dayInp.value > day) {
      day = day + months[month - 1]; // Borrow days from previous month
      month = month - 1; // Adjust month down by 1
    }
    if (monthInp.value > month) {
      month = month + 12; // Borrow months from previous year
      year = year - 1;    // Adjust year down by 1
    }

    // Calculates the difference between current date and input date
    const d = day - dayInp.value;
    const m = month - monthInp.value;
    const y = year - yearInp.value;

    // Displays calculated age in the output fields
    dayOtp.innerHTML = d;
    monthOtp.innerHTML = m;
    yearOtp.innerHTML = y;
  }
}

// Event listener to call handleSubmit when form is submitted
form.addEventListener("submit", handleSubmit);
