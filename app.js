
function increment() { addEvent("INCREMENT"); }
function undo() { deleteLastEvent(); }

function loadUI() {
  getAllEvents(events => {
    document.getElementById("counter").innerText = computeCounter(events);
    document.getElementById("lastUpdated").innerText = lastUpdated(events);
    document.getElementById("monthCount").innerText = countThisMonth(events);
  });
}
