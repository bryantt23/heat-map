const w = 500,
  h = 500,
  padding = 60;

let xScale = 1,
  yScale = 1,
  startYear,
  endYear,
  rangeOfYears,
  dataset;

async function getData() {
  const resp = await axios.get(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  );
  dataset = resp.data;
  console.log(dataset);
  startYear = d3.min(dataset.monthlyVariance, d => d.year);
  endYear = d3.max(dataset.monthlyVariance, d => d.year);
  rangeOfYears = endYear - startYear;

  loadPage();
}
function loadPage() {
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'title');

  //TODO passes test but doesn't show text
  svg.append('div').attr('id', 'description').text('hiiii');

  const xAxisScale = d3
    .scaleTime()
    .domain([new Date(startYear + ''), new Date(endYear + '')])
    .range([0, w]);

  const xAxis = d3.axisTop().scale(xAxisScale);
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h})`)
    .call(xAxis);
}

getData();
