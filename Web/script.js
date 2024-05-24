const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

async function fetchData() {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    return data;
}

async function updateChart() {
    const data = await fetchData();

    const labels = data.map(item => item.label); // ajusta esto según tu esquema
    const values = data.map(item => item.value); // ajusta esto según tu esquema

    if (!myChart) {
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My Data',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = values;
        myChart.update();
    }
}

// Actualizar cada 5 segundos
setInterval(updateChart, 5000);
updateChart();
