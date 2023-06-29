// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// using Day.js API to display the current day at the top of the page
let todayDate = dayjs();
$('#currentDay').text(todayDate.format('dddd, MMM D, YYYY'));

// define the set of all time blocks to be created, in 24hr format
let hours9to5 = ["09","10","11","12","13","14","15","16","17"]

// define global scope for the container that populate-time-blocks function and event listener will refer to
scheduleEl = $("#schedule");

// function for constructing each time block,
// generate elements and add attributes, classes to each (as given from example in intial HTML file)
let populateTimeBlocks = function() {
  // for loop to create time block for each hour in hours9to5 array
  for (let hour of hours9to5) {
    // define local references to elements
    let hourContainerEl = $("<div>");
    let hourTitleEl = $("<div>");
    let textAreaEl = $("<textarea>");
    let saveButtonEl = $("<button>");
    let iconEl = $("<i>");

    // set unique id using the value from the hours9to5 array
    hourContainerEl.attr("id", "hour-" + hour);

    // conditionals to apply appropraite past, present, future class
    if (hour < dayjs().format("HH")) {
    hourContainerEl.addClass("row time-block past");
    }
    if (hour === dayjs().format("HH")) {
    hourContainerEl.addClass("row time-block present");
    }
    if (hour > dayjs().format("HH")) {
    hourContainerEl.addClass("row time-block future");
    }

    hourTitleEl.addClass("col-2 col-md-1 hour text-center py-3");

    // parsing the value from the hours9to5 array and formatting it into 12hr clock, plus AM or PM
    hourTitleEl.text(dayjs().hour(hour).format("hA"));

    textAreaEl.addClass("col-8 col-md-10 description");
    textAreaEl.attr("rows", "3");
    saveButtonEl.addClass("btn saveBtn col-2 col-md-1");
    saveButtonEl.attr("aria-label", "save");
    iconEl.addClass("fas fa-save");
    iconEl.attr("aria-hidden", "true");

    // append populated elements to the time block
    hourContainerEl.append(hourTitleEl);
    hourContainerEl.append(textAreaEl);
    saveButtonEl.append(iconEl);
    hourContainerEl.append(saveButtonEl);

    // append finished time block onto the end of the schedule container
    scheduleEl.append(hourContainerEl);
  }
}

// execute funtion to populate page with content
populateTimeBlocks();