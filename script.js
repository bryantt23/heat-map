const w = 500,
  h = 500,
  padding = 60,
  rectHeight = h / 12;
const size = 20;

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
  console.log('loadpg');
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'title');

  //TODO passes test but doesn't show text
  svg.append('div').attr('id', 'description').text('hiiii');

  svg
    .selectAll('rect')
    .data(dataset.monthlyVariance)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('x', 100)
    .attr('y', (d, i) => {
      console.log(d, i);
      return 100 + i * (size + 5);
    })
    .attr('width', size)
    .attr('height', rectHeight)
    .style('fill', 'red');
  // .style('fill', d => color(d));

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
