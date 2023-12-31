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

    // conditional to check if local storage exists and, if any, adds content to the text area element
    if (localStorage.getItem("schedhour-" + hour) !== null) {
      textAreaEl.text(localStorage.getItem("schedhour-" + hour));
    }
    
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

// identifies the relative parent element to the button clicked, and adds the text area content, if any, to the local storage.
let addToStorage = function() {
  let parentDiv = $(this).parent();
  let parentDivId = $(this).parent().attr('id');
  let insertText = parentDiv.children().eq(1).val();
  localStorage.setItem("sched" + parentDivId, insertText);
}

// execute funtion to populate page with content
populateTimeBlocks();

// listen for a click on any button within the schedule container element and run the function to add to storage
scheduleEl.on("click", ".saveBtn", addToStorage);