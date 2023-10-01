import { useEffect } from 'react';
// import dataExample from './data';
// import { colors } from '@mui/material';

interface Props {
  data: {[country: string]: number[];}
}

declare var google: any;

function MapChart(props: Props) {
  const { data } = props;
  useEffect(() => {
    const rawData = data;
    google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const dataTable: (string | number)[][] = [];
        dataTable.push(['Страна', 'Посещаемость']); 
        for (const country in rawData) {
          if (rawData.hasOwnProperty(country) && country !== 'Title') {
            const value: number = rawData[country][0];
            dataTable.push([country, value]);
          }
        } 
      const data = google.visualization.arrayToDataTable(dataTable);
      const options = {
        region: 'world',
        resolution: 'countries',
        colorAxis: {colors: ['#477C8B', '#9347B2']},
        backgroundColor: '#B7DAE4'
      };
      const chart = new google.visualization.GeoChart(document.getElementById('chart-container'));
      chart.draw(data, options);
    }
  }, []);

  return <div id="chart-container" style={{ width: '70%', height: '400px',borderRadius:'20px', overflow:'hidden', margin: '0 auto' }}></div>;
}

export default MapChart;
