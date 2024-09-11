export default function nextWeek(data) {
  const lastTimestamp = data.list[data.list.length - 1].dt * 1000;
  const lastAvailableDay = new Date(lastTimestamp);
  lastAvailableDay.setHours(14, 0, 0, 0);

  const nextWeekData = data.list.reduce((closest, item) => {
    const itemDate = new Date(item.dt * 1000);
    const closestDate = new Date(closest.dt * 1000);

    if (
      itemDate <= lastAvailableDay &&
      (itemDate > closestDate ||
        itemDate.getDate() === lastAvailableDay.getDate())
    ) {
      return item;
    }
    return closest;
  });

  return `<div class="weather-data">
  <header>
  <h3>Next Week</h3>
  </header>
<img src="http://openweathermap.org/img/wn/${
    nextWeekData.weather[0].icon
  }@2x.png" alt="${nextWeekData.weather[0].description}" />
  <div class="temp-range">
    <p class="temp">${parseInt(nextWeekData.main.temp)}°C</p>
    <div>
     <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 11l-6 -6" /><path  d="M6 11l6 -6" /></svg>
      <p class="temp-max">${parseInt(nextWeekData.main.temp_max)} °C</p>
    </div>
    <div>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 13l-6 6" /><path d="M6 13l6 6" /></svg>
      <p class="temp-min">${parseInt(nextWeekData.main.temp_min)} °C</p>
    </div>
    <div>
    <svg fill="#faf9f6" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="20" viewBox="0 0 64 64"><g id="_24-Humidity" data-name="24-Humidity"><rect fill="#faf9f6" x="15.029" y="38" width="33.941" height="2" transform="translate(-18.205 34.05) rotate(-45)"/><path fill="#faf9f6" d="M39,52a5,5,0,1,1,5-5A5.006,5.006,0,0,1,39,52Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,39,44Z"/><path d="M25,36a5,5,0,1,1,5-5A5.006,5.006,0,0,1,25,36Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,25,28Z"/><path fill="#faf9f6" d="M43.816,17.505q-.587-1-1.182-1.985l1.709-1.04q.6.995,1.2,2.015Z"/><path fill="#faf9f6" d="M32,64A22.985,22.985,0,0,1,9.379,45.181l1.967-.362A21,21,0,0,0,53,41c0-4.532-2.934-12.373-8.05-21.512l1.746-.976C49.8,24.052,55,34.341,55,41A23.025,23.025,0,0,1,32,64Z"/><path fill="#faf9f6" d="M9.094,43.09C9.031,42.4,9,41.7,9,41,9,30.373,22.763,7.659,29.519,1A3.653,3.653,0,0,1,34.48,1a70.879,70.879,0,0,1,8.612,11.461l-1.69,1.07a69.9,69.9,0,0,0-8.325-11.1,1.6,1.6,0,0,0-2.155,0C24.532,8.724,11,31.017,11,41c0,.638.029,1.28.086,1.91Z"/></g></svg>
    <p class="humidity">${nextWeekData.main.humidity}%</p>
    </div>
  </div>
</div>`;
}
