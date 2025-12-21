
let chart;

document.getElementById("monthPicker").addEventListener("change", e => {
  const [year, month] = e.target.value.split("-").map(Number);
  getAllEvents(events => renderChart(dailyForMonth(events, year, month - 1)));
});

function renderChart(data) {
  const ctx = document.getElementById("monthlyChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(data),
      datasets: [{ label: "Daily Count", data: Object.values(data) }]
    }
  });
}
