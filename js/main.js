document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 'OK') {
                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                const options = {
                    timeZone: userTimeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                };

                const sunriseLocal = new Date(data.results.sunrise).toLocaleString('en-US', options);
                const sunsetLocal = new Date(data.results.sunset).toLocaleString('en-US', options);

                sunriseElement.innerText = `Sunrise in your time zone: ${sunriseLocal}`;
                sunsetElement.innerText = `Sunset in your time zone: ${sunsetLocal}`;
            } else {
                sunriseElement.innerText = 'Sunrise time not found.';
                sunsetElement.innerText = 'Sunset time not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            sunriseElement.innerText = 'Failed to fetch sunrise time.';
            sunsetElement.innerText = 'Failed to fetch sunset time.';
        });
}
