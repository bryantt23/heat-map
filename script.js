let dataset;
const padding = 60;
let w = 500,
  h = 500,
  xScale = 1,
  yScale = 1,
  startYear,
  endYear,
  rangeOfYears;

async function getData() {
  const resp = await axios.get(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  );
  dataset = resp.data;
  console.log(dataset);
  startYear = d3.min(dataset.monthlyVariance, d => d.year);
  endYear = d3.max(dataset.monthlyVariance, d => d.year);
  rangeOfYears = endYear - startYear;
}

getData();
