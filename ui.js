window.addEventListener("load", getDataLatest30);

// Generate HTML based on an array of JS objects

function dataToHtmlRepresentationLatest30(dataObjects) {
    let html = '<table>';
    html += `<th>Row Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Measurement Type</th>
              <th>Measured Value</th>`
		// Adding a table row for each object:
    // row number, measurement time, measurement type, measured value
    for (let i = 0; i < 30; i++) {
        const dataObject = dataObjects[i];
        // getting object data key and value
        const dataType = Object.keys(dataObject.data);
        const dataValue = Object.values(dataObject.data);
        const date = new Date(dataObject.date_time);
        html += `
                  <tr>
                    <td>${i+1}</td>
                    <td>${date.toLocaleDateString()}</td>
                    <td>${date.toLocaleTimeString()}</td>
                    <td>${dataType}</td>
                    <td>${dataValue}</td>
                  </tr>
                `
    }
    html += '</table>';
    return html;
}

function dataToHtmlRepresentationAllNow(dataObjects, type) {
  let html = '<table>';
  html += `<th>Row Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Measured Value</th>`

  for (let i in dataObjects) {
      const dataObject = dataObjects[i];
      const date = new Date(dataObject.date_time);

      let dataType = Object.keys(dataObject.data)[0];
      let dataValue = Object.values(dataObject.data)[0]
      let weatherType = type;

      if (weatherType === dataType)
      {
        dataValue = Object.values(dataObject.data)[0];

        html += `
        <tr>
          <td>${i}</td>
          <td>${date.toLocaleDateString()}</td>
          <td>${date.toLocaleTimeString()}</td>
          <td>${dataValue}</td>
        </tr>
      `
      }
    }

  html += '</table>';
  return html;
}


function dataToHtmlRepresentationTemperature(dataObjects) {
  let html = '<table>';
  html += `<th>Row Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Measured Value</th>`

  for (let i in dataObjects) {
      const rowNumber = parseInt(i);
      const dataObject = dataObjects[i];
      const date = new Date(dataObject.date_time);
      html += `
                <tr>
                  <td>${rowNumber+1}</td>
                  <td>${date.toLocaleDateString()}</td>
                  <td>${date.toLocaleTimeString()}</td>
                  <td>${dataObject.temperature}</td>
                </tr>
              `
  }
  html += '</table>';
  return html;
}

function dataToHtmlRepresentationWindDirection(dataObjects) {
  let html = '<table>';
  html += `<th>Row Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Measured Value</th>`

  for (let i in dataObjects) {
      const rowNumber = parseInt(i);
      const dataObject = dataObjects[i];
      const date = new Date(dataObject.date_time);
      html += `
                <tr>
                  <td>${rowNumber+1}</td>
                  <td>${date.toLocaleDateString()}</td>
                  <td>${date.toLocaleTimeString()}</td>
                  <td>${dataObject.wind_direction}</td>
                </tr>
              `
  }
  html += '</table>';
  return html;
}

function dataToHtmlRepresentationSelection(dataObjects, type) {
  let html = '<table>';
  html += `<th>Row Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Measured Value</th>`

  for (let i in dataObjects) {
      const rowNumber = parseInt(i);
      const dataObject = dataObjects[i];
      const date = new Date(dataObject.date_time);
      const weatherType = type;
      let dataType = null;
      if (weatherType === 'light') {
        dataType = dataObject.light;
      }
      if (weatherType === 'Air_pres_1') {
        dataType = dataObject.Air_pres_1;
      }
      if (weatherType === 'BMP_temp_1') {
        dataType = dataObject.BMP_temp_1;
      }
      if (weatherType === 'DHT11__temp_1') {
        dataType = dataObject.DHT11__temp_1;
      }
      if (weatherType === 'DS1820_temp_1') {
        dataType = dataObject.DS1820_temp_1;
      }
      if (weatherType === 'humidity_in') {
        dataType = dataObject.humidity_in;
      }
      if (weatherType === 'humidity_out') {
        dataType = dataObject.humidity_out;
      }
      if (weatherType === 'rain') {
        dataType = dataObject.rain;
      }
      if (weatherType === 'temperature') {
        dataType = dataObject.temperature;
      }
      if (weatherType === 'wind_direction') {
        dataType = dataObject.wind_direction;
      }
      if (weatherType === 'wind_speed') {
        dataType = dataObject.wind_speed;
      }

      html += `
                <tr>
                  <td>${rowNumber+1}</td>
                  <td>${date.toLocaleDateString()}</td>
                  <td>${date.toLocaleTimeString()}</td>
                  <td>${dataType}</td>
                </tr>
              `
  }
  html += '</table>';
  return html;
}

// sources
const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/'
const DATA_SOURCE_TEMPERATURE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/'
const DATA_SOURCE_WINDDIRECTION = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/'
const DATA_SOURCE_TEMPERATURE_24_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23'
const DATA_SOURCE_TEMPERATURE_48_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47'
const DATA_SOURCE_TEMPERATURE_72_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71'
const DATA_SOURCE_TEMPERATURE_1_WEEK = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167'
const DATA_SOURCE_WINDDIRECTION_24_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/23'
const DATA_SOURCE_WINDDIRECTION_48_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/47'
const DATA_SOURCE_WINDDIRECTION_72_HOURS = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/71'
const DATA_SOURCE_WINDDIRECTION_1_WEEK = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/167'


// Making a get request using the Fetch API
// fetch data and put into arrays for chart

function getDataLatest30() {
  fetch(DATA_SOURCE).then(response => {return response.json()})
                    .then(data => {
                      const e = document.getElementById("datalatest30");
                      e.innerHTML = dataToHtmlRepresentationLatest30(data);
                    })
                    .catch(error => console.error('Error on GET ' + error));
}

function getDataTemperature(timeInterval) {
  let DATA_SOURCE_TIME = DATA_SOURCE_TEMPERATURE;
  if (timeInterval === 24) {
    DATA_SOURCE_TIME = DATA_SOURCE_TEMPERATURE_24_HOURS;
  }
  if (timeInterval === 48) {
    DATA_SOURCE_TIME = DATA_SOURCE_TEMPERATURE_48_HOURS;
  }
  if (timeInterval === 72) {
    DATA_SOURCE_TIME = DATA_SOURCE_TEMPERATURE_72_HOURS;
  }
  if (timeInterval === 1) {
    DATA_SOURCE_TIME = DATA_SOURCE_TEMPERATURE_1_WEEK;
  }
  fetch(DATA_SOURCE_TIME).then(response => {return response.json()})
                    .then(data => {
                      const e = document.getElementById("data-temperature");
                      e.innerHTML = dataToHtmlRepresentationTemperature(data);

                      const measurement = [];
                      const time = [];
                      const chartNumber = 1;

                      for (let i in data) {
                        const date = new Date(data[i].date_time).toLocaleString();
                        measurement.push(data[i].temperature);
                        time.push(date);
                      }

                      const chartType = 'bar'

                      updateChart(measurement, time, chartNumber, chartType);
                    })
                    .catch(error => console.error('Error on GET ' + error));
}

function getDataWindDirection(timeInterval) {
  let DATA_SOURCE_TIME = DATA_SOURCE_WINDDIRECTION;
  if (timeInterval === 24) {
    DATA_SOURCE_TIME = DATA_SOURCE_WINDDIRECTION_24_HOURS;
  }
  if (timeInterval === 48) {
    DATA_SOURCE_TIME = DATA_SOURCE_WINDDIRECTION_48_HOURS;
  }
  if (timeInterval === 72) {
    DATA_SOURCE_TIME = DATA_SOURCE_WINDDIRECTION_72_HOURS;
  }
  if (timeInterval === 1) {
    DATA_SOURCE_TIME = DATA_SOURCE_WINDDIRECTION_1_WEEK;
  }
  fetch(DATA_SOURCE_TIME).then(response => {return response.json()})
                    .then(data => {
                      const e = document.getElementById("data-winddirection");
                      e.innerHTML = dataToHtmlRepresentationWindDirection(data);

                      const measurement = [];
                      const time = [];
                      const chartNumber = 2;

                      for (let i in data) {
                        const date = new Date(data[i].date_time).toLocaleString();
                        measurement.push(data[i].wind_direction);
                        time.push(date);
                      }

                      const chartType = 'bar'

                      updateChart(measurement, time, chartNumber, chartType);
                    })
                    .catch(error => console.error('Error on GET ' + error));
}

function getDataSelection() {
  let type = document.getElementById("type-menu").value;
  let timeInterval = document.getElementById("time-menu-all").value;
  let DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
  if (type === "light") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light/167';
    }
  }
  else if (type === "Air_pres_1") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/Air_pres_1/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/Air_pres_1/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/Air_pres_1/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/Air_pres_1/167';
    }
  }
  else if (type === "BMP_temp_1") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/BMP_temp_1/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/BMP_temp_1/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/BMP_temp_1/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/BMP_temp_1/167';
    }
  }
  else if (type === "DHT11__temp_1") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DHT11__temp_1/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DHT11__temp_1/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DHT11__temp_1/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DHT11__temp_1/167';
    }
  }
  else if (type === "DS1820_temp_1") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DS1820_temp_1/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DS1820_temp_1/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DS1820_temp_1/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/DS1820_temp_1/167';
    }
  }
  else if (type === "humidity_in") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in/167';
    }
  }
  else if (type === "humidity_out") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out/167';
    }
  }
  else if (type === "rain") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/167';
    }
  }
  else if (type === "temperature") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167';
    }
  }
  else if (type === "wind_direction") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/167';
    }
  }
  else if (type === "wind_speed") {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    if (timeInterval === 'now') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
    }
    if (timeInterval === '24 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23';
    }
    if (timeInterval === '48 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47';
    }
    if (timeInterval === '72 hours') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71';
    }
    if (timeInterval === '1 week') {
      DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167';
    }
  }

  else {
    DATA_SOURCE_TIME = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
  }

  //console.log(DATA_SOURCE_TIME);

  fetch(DATA_SOURCE_TIME).then(response => {return response.json()})
                    .then(data => {
                      const e = document.getElementById("data-selection");

                      const measurement = [];
                      const time = [];
                      const chartNumber = 3;

                      if (DATA_SOURCE_TIME === 'http://webapi19sa-1.course.tamk.cloud/v1/weather/') {
                        // if time interval is 'now', pick from 500
                        e.innerHTML = dataToHtmlRepresentationAllNow(data, type);

                        for (let i in data) {
                          dataType = Object.keys(data[i].data)[0];
                          dataValue = Object.values(data[i].data)[0];
                          const date = new Date(data[i].date_time).toLocaleString();

                          if (dataType === type) {
                            measurement.push(dataValue);
                            time.push(date);
                          }
                        }
                      }
                      else {
                      // this is for other time intervals
                      e.innerHTML = dataToHtmlRepresentationSelection(data, type);

                      for (let i in data) {
                        const date = new Date(data[i].date_time).toLocaleString();

                        if (type === 'light') {
                          measurement.push(data[i].light);
                        }
                        if (type === 'Air_pres_1') {
                          measurement.push(data[i].Air_pres_1);
                        }
                        if (type === 'BMP_temp_1') {
                          measurement.push(data[i].BMP_temp_1);
                        }
                        if (type === 'DHT11__temp_1') {
                          measurement.push(data[i].DHT11__temp_1);
                        }
                        if (type === 'DS1820_temp_1') {
                          measurement.push(data[i].DS1820_temp_1);
                        }
                        if (type === 'humidity_in') {
                          measurement.push(data[i].humidity_in);
                        }
                        if (type === 'humidity_out') {
                          measurement.push(data[i].humidity_out);
                        }
                        if (type === 'rain') {
                          measurement.push(data[i].rain);
                        }
                        if (type === 'temperature') {
                          measurement.push(data[i].temperature);
                        }
                        if (type === 'wind_direction') {
                          measurement.push(data[i].wind_direction);
                        }
                        if (type === 'wind_speed') {
                          measurement.push(data[i].wind_speed);
                        }
                        time.push(date);
                        }
                      }

                      const chartType = 'line'

                      updateChart(measurement, time, chartNumber, chartType);
                    })
                    .catch(error => console.error('Error on GET ' + error));
}

// change select to first one when div opened
function openSelect(id, selected) {
  let select = document.getElementById(id);
  let option = select.options.namedItem(selected);
  option.selected = "selected";
  return true;
}

// open one view, hide others
function openView(view) {
  let views = document.getElementsByClassName("viewcontent");
  for (let i = 0; i < views.length; i++) {
    views[i].style.display = "none";
  }
  document.getElementById(view).style.display = "block";
}

// chart
let weatherChart = null;

function updateChart(dataValues, dataLabels, chart, type) {
	const ctx = document.getElementById(`chart${chart}`).getContext('2d');

	if(weatherChart) {
		weatherChart.destroy();
	}

	weatherChart = new Chart(ctx, {
		type: type,
		data: {
			labels: dataLabels,
			datasets: [{
				label: 'Latest measurements',
				data: dataValues,
				backgroundColor: 'rgba(5, 93, 22, 0.75)',
				borderColor: 'rgba(5, 93, 22, 0.75)',
			}]
		},
	});
}
