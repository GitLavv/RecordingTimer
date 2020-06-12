var startTime = null;
var tableRowCount =  1;
var timingsTable = document.getElementById("timingsTable");
var times = ["Time"];
var events = ["Event"];

function startTimer() {
  startTime = new Date().getTime();
  document.getElementById("addEventButton").style.visibility = "visible";
  document.getElementById("generateCsvButton").style.visibility = "visible";
  startButtonElement = document.getElementById("startButton");
  startButtonElement.parentNode.removeChild(startButtonElement);
}

function addEvent() {
  timingsTable = document.getElementById("timingsTable");
  document.getElementById("timingsTable").style.visibility = "visible";
  var row = timingsTable.insertRow(tableRowCount);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var currentTime = new Date().getTime();
  var totalSeconds = (currentTime - startTime) / 1000;

  var displayTime= "";
  if (Math.floor(totalSeconds / 3600) > 0) {
    displayTime = Math.floor(totalSeconds / 3600) + "hrs "
  }
  displayTime = displayTime + Math.floor((totalSeconds % 3600) / 60) + " mins "
  displayTime = displayTime + Math.floor(((totalSeconds % 3600) % 60) % 60) + " secs"

  cell0.innerHTML = displayTime;
  cell1.innerHTML = "<input type=\"text\" onkeyup=\"eventTextChange(this.parentElement.parentElement.rowIndex, this.value)\">";

  times.push(displayTime);
  events.push("");

  tableRowCount = tableRowCount + 1;
}

function eventTextChange(rowIndex,text) {
  events[rowIndex] = text;
}

function generateCsv() {
  let csvContent = "data:text/csv;charset=utf-8,";
  for (i = 0; i < tableRowCount; i++) {
    csvContent = csvContent + times[i] + "," + events[i] + "\r\n"
  }

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Timings.csv");
  document.body.appendChild(link); // Required for FF

  link.click();

}
