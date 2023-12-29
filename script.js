var cityName = document.getElementById("cityname");
var API_Key = "d1d2794b80424dc8917142855232812";

var currentWeatherHeader = document.getElementById("current-day");
var currentWeatherDate = document.getElementById("endline");

var firstForecastHeader = document.getElementById("next-day");
var secondForecastHeader = document.getElementById("after-next-day");

var data = [];
var tableData;

get_Current_Weather_Data();
get_Weather_Forecast_Data();

async function get_Current_Weather_Data() {
  if (cityName.value.length >= 3) {
    //in case of user input
    var weather_data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${cityName.value}`
    );
    if (weather_data.status == 400) {
      cityName.classList.add("is-invalid");
      cityName.classList.remove("is-valid");
    } else {
      cityName.classList.remove("is-invalid");
      cityName.classList.add("is-valid");
    }
    data = await weather_data.json();
    Display_Current_Weather(data);
  } else {
    //in case he did not type anything
    var weather_data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q='Cairo'`
    );
    if (weather_data.status == 400) {
      cityName.classList.add("is-invalid");
      cityName.classList.remove("is-valid");
    } else {
      cityName.classList.remove("is-invalid");
      cityName.classList.add("is-valid");
    }
    data = await weather_data.json();
    Display_Current_Weather(data);
  }
}

function Display_Current_Weather(data) {
  currentWeatherHeader.innerHTML = data.current.temp_c;

  const lastUpdated = new Date(data.current.last_updated);

  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(lastUpdated);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    lastUpdated
  );
  const dayOfMonth = lastUpdated.getDate();

  // console.log(`${dayOfMonth} - ${dayOfWeek}, ${month}`);
  currentWeatherHeader.innerHTML = `${dayOfWeek}`;
  currentWeatherDate.innerHTML = `${dayOfMonth} - ${month}`;
}

async function get_Weather_Forecast_Data() {
  if (cityName.value.length >= 3) {
    //in case of user input
    var weather_data = await fetch(
      ` https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${cityName.value}&days=3`
    );
    if (weather_data.status == 400) {
      cityName.classList.add("is-invalid");
      cityName.classList.remove("is-valid");
    } else {
      cityName.classList.remove("is-invalid");
      cityName.classList.add("is-valid");
    }
    data = await weather_data.json();
    console.log(data);
    Display_Weather_Forecast(data);
  } else {
    //in case he did not type anything
    var weather_data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q='Cairo'&days=3`
    );
    if (weather_data.status == 400) {
      cityName.classList.add("is-invalid");
      cityName.classList.remove("is-valid");
    } else {
      cityName.classList.remove("is-invalid");
      cityName.classList.add("is-valid");
    }
    data = await weather_data.json();
    console.log(data);
    Display_Weather_Forecast(data);
  }
}

function Display_Weather_Forecast(data) {
  const nextDay = new Date(data.forecast.forecastday[1].date);
  const after_next_day = new Date(data.forecast.forecastday[2].date);

  const dayOfWeek_nextDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(nextDay);
  const month_nextDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(nextDay);
  const dayOfMonth_nextDay = nextDay.getDate();

  const dayOfWeek_after_next_day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(after_next_day);
  const month_after_next_day = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(after_next_day);
  const dayOfMonth_after_next_day = nextDay.getDate();

  // console.log(`${dayOfMonth} - ${dayOfWeek}, ${month}`);
  firstForecastHeader.innerHTML = `${dayOfWeek_nextDay}`;
  secondForecastHeader.innerHTML = `${dayOfWeek_after_next_day}`;
  // currentWeatherDate.innerHTML = `${dayOfMonth} - ${month}`;
}