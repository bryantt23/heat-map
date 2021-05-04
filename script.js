const w = 1000,
  h = 500,
  padding = 60,
  rectHeight = h / 12;
const size = 20;
const colors = d3
  .scaleQuantize()
  .domain([0, 10])
  .range([
    '#5E4FA2',
    '#3288BD',
    '#66C2A5',
    '#ABDDA4',
    '#E6F598',
    '#FFFFBF',
    '#FEE08B',
    '#FDAE61',
    '#F46D43',
    '#D53E4F',
    '#9E0142'
  ]);

let xScale = 1,
  yScale = 1,
  startYear,
  endYear,
  rangeOfYears,
  dataset,
  rectWidth,
  baseTemperature;

async function getData() {
  const resp = await axios.get(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  );
  dataset = resp.data;
  // console.log(dataset);
  // dataset.monthlyVariance = [
  //   ...dataset.monthlyVariance.slice(0, 20),
  //   ...dataset.monthlyVariance.slice(3100)
  // ];
  // console.log(dataset);
  baseTemperature = dataset.baseTemperature;
  // console.log(dataset);
  startYear = d3.min(dataset.monthlyVariance, d => d.year);
  endYear = d3.max(dataset.monthlyVariance, d => d.year);
  rangeOfYears = endYear - startYear;

  rectWidth = w / rangeOfYears;
  xScale = w / rangeOfYears;
  yScale = h / 12;

  loadPage();
}
function loadPage() {
  console.log('load pg');

  d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position:absolute; visibility:visible')
    .attr('width', w)
    .attr('height', h)
    .on('mousemove', () => {
      d3.select('#tooltip');
    });

  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'title');

  //TODO passes test but doesn't show text
  svg.append('div').attr('id', 'description').text('hiiii');

  const yAxisScale = d3
    .scaleTime()
    .domain([new Date('2014-01-01'), new Date('2014-12-31')])
    .range([0, h]);

  const yAxis = d3.axisRight(yAxisScale).tickFormat(d3.timeFormat('%B'));
  //   const yAxis = d3.axisRight(yAxisScale).ticks(11);
  //   const yAxis = d3.axisRight(yAxisScale);
  //   .ticks(12)
  //   .tickFormat(d3.timeFormat('%B'));

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

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(0, 0)`)
    .call(yAxis);

  svg
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; visibility: hidden')
    .attr('width', w);

  svg
    .selectAll('rect')
    .data(dataset.monthlyVariance)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('x', d => {
      //   console.log('hi');
      //   console.log(d.year - startYear);
      const num = (d.year - startYear) * xScale;
      // console.log(num);
      return num;
    })
    // .attr('x', 100)
    .attr('y', (d, i) => {
      // console.log(h - (d.month - 1) * yScale);
      // console.log(h - (d.Month - 1) * yScale);
      // console.log(h - (d.Month - 1) * yScale);
      // console.log(h - (d.Month - 1) * yScale);
      //TODO
      //put this in right spot based on d.Month-1 in regards to height
      return (d.month - 1) * yScale;
    })
    .attr('data-month', (d, i) => {
      return d.month - 1;
    })
    .attr('data-year', (d, i) => {
      return d.year;
    })
    .attr('data-temp', (d, i) => {
      //   console.log(d.temp);
      return d.variance + baseTemperature;
    })
    .style('fill', (d, i) => {
      // console.log(d, i);
      // console.log(colors(i % 11));
      return colors(i % 11);
    });
}

getData();
