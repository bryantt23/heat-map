let dataset;
const padding = 60;
let w = 500,
  h = 500,
  xScale = 1,
  yScale = 1,
  startDate = 10000,
  endDate = 0,
  startTime = new Date(),
  endTime = new Date(null),
  rangeOfYears,
  rangeOfTime;

const timeFormat = d3.timeFormat('%M:%S');
const keys = ['No doping allegations', 'Riders with doping allegations'];
const size = 20;

async function getData() {
  const resp = await axios.get(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  );
  dataset = resp.data;
  console.log(dataset);
}

getData();
