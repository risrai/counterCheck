
function computeCounter(events) {
  let c = 0;
  events.forEach(e => { if (e.type === "INCREMENT") c++; });
  return c;
}

function lastUpdated(events) {
  if (!events.length) return "—";
  return new Date(events[events.length - 1].timestamp).toLocaleString();
}

function countThisMonth(events) {
  const now = new Date();
  return events.filter(e => {
    const d = new Date(e.timestamp);
    return d.getMonth() === now.getMonth() &&
           d.getFullYear() === now.getFullYear() &&
           e.type === "INCREMENT";
  }).length;
}

function dailyForMonth(events, year, month) {
  const days = {};
  events.forEach(e => {
    const d = new Date(e.timestamp);
    if (d.getFullYear() === year && d.getMonth() === month && e.type === "INCREMENT") {
      const day = d.getDate();
      days[day] = (days[day] || 0) + 1;
    }
  });
  return days;
}
