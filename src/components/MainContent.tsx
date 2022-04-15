import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

interface Entry {
  amount: number;
  time: string;
}

type Props = {
  data: Entry[];
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
};

export function MainContent(props: Props) {

  return (
    <div className="m-2">
      <div className="flex sm:flex-row">
        <div className="flex-auto max-w-screen-sm">
          <Line options={options} data={turnCategoriesToChartData(props.data)} />
        </div>
      </div>
    </div>
  );
}

function turnCategoriesToChartData(entries: Entry[]) {

  return {
    labels: entries.map((entry) => entry.time),
    datasets: [
      {
        borderColor: 'rgb(255, 99, 132)',
        data: entries.map((entry) => entry.amount)
      }
    ]
  };
}
