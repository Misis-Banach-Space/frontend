import { Line } from "react-chartjs-2";
import { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';


interface Props {
  data: {[month: string]: number[];}
}

const emptyData: ChartData<"line", number[], string> = {
  labels: [],
  datasets: []
};

const LineChart = (props: Props) => {
  const { data } = props;
  const [dataChart, setDataChart] = useState<ChartData<"line", number[], string>>(emptyData);

  useEffect(() => {
    const labels = Object.keys(data).filter(key => key !== 'Title');
    const visits = labels.map(key => data[key][0])
    
    // const labels = Object.keys(data);
    // const visits = labels.map(key => data[key][0]);
    
    console.log(visits)

    const dataChart = {
      labels: labels,
      datasets: [{
        label: 'Посещаемость',
        data: visits,
        fill: true,
        backgroundColor: '#B7DAE4',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 4,
        tension: 0.1, 
        responsive: true, 
      }]
    };

    setDataChart(dataChart);
}, []);

  return (
    <div style={{width: '500px'}}>
      <Line data={dataChart} />
    </div>
  );
};

export default LineChart;