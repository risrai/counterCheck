
let db;
const req = indexedDB.open("CounterDB", 1);

req.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
};

req.onsuccess = e => {
  db = e.target.result;

  if (window.onDbReady) {
    window.onDbReady();
  }
};


function addEvent(type) {
  const tx = db.transaction("events", "readwrite");
  tx.objectStore("events").add({ type, timestamp: Date.now() });
  tx.oncomplete = () => window.loadUI && loadUI();
}

function addEventGivenTime(type,time) {
  const tx = db.transaction("events", "readwrite");
  tx.objectStore("events").add({ type, timestamp: time });
  tx.oncomplete = () => window.loadUI && loadUI();
}

function deleteLastEvent() {
  const tx = db.transaction("events", "readwrite");
  const store = tx.objectStore("events");
  store.openCursor(null, "prev").onsuccess = e => {
    const c = e.target.result;
    if (c) store.delete(c.key);
  };
  tx.oncomplete = () => window.loadUI && loadUI();
}

function getAllEvents(cb) {
  const tx = db.transaction("events", "readonly");
  const req = tx.objectStore("events").getAll();
  req.onsuccess = () => cb(req.result);
}
