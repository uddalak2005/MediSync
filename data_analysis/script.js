fetch('Appointment.csv')
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.split('\n').slice(1);
        const appointmentsPerDay = {};

        rows.forEach(row => {
            const columns = row.split(',');
            const date = new Date(columns[1]);
            const dateString = date.toISOString().split('T')[0];

            if (appointmentsPerDay[dateString]) {
                appointmentsPerDay[dateString]++;
            } else {
                appointmentsPerDay[dateString] = 1;
            }
        });

        const labels = Object.keys(appointmentsPerDay);
        const data = Object.values(appointmentsPerDay);

        const sortedLabels = labels.sort((a, b) => new Date(a) - new Date(b));
        const sortedData = sortedLabels.map(label => appointmentsPerDay[label]);

        const timestamps = sortedLabels.map(label => new Date(label).getTime());

        const x = timestamps; // Timestamps
        const y = sortedData; // Number of appointments

        const regression = ss.linearRegression([x, y]);
        const nextDayTimestamp = timestamps[timestamps.length - 1] + 86400000; 
        const prediction = ss.linearRegressionLine(regression)(nextDayTimestamp);
        const scaledPrediction = prediction / (timestamps[timestamps.length - 1] / sortedData[sortedData.length - 1]);
        document.getElementById('prediction').innerText = `Predicted number of appointments for the next day: ${Math.round(scaledPrediction)}`;
        const ctx = document.getElementById('appointmentsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Use 'line' for a line chart, 'pie' , 'radar'
            data: {
                labels: sortedLabels.slice(-100),
                datasets: [{
                    label: 'Number of Appointments',
                    data: sortedData.slice(-100),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,  
                    
                    hoverBorderWidth: 4,  
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                layout: {
                    padding: {
                        left: 30,
                        right: 30,
                        top: 30,
                        bottom: 30
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error loading the CSV file:', error));