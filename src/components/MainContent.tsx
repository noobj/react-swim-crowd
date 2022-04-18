import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Entry {
  amount: number;
  time: string;
}

interface DailyEntry {
  date: string;
  entries: Entry[];
}

type Props = {
  data: DailyEntry[];
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

function turnCategoriesToChartData(dailyEntries: DailyEntry[]) {
  return {
    labels: generateLabels(),
    datasets: dailyEntries.map((entry) => ({
      label: entry.date,
      borderColor: randomColors(),
      data: entry.entries.map((e) => e.amount)
    }))
  };
}

function generateLabels() {
  const hours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];

  return hours.reduce((pre: string[], curr: string) => {
    return [...pre, curr + ':00', curr + ':30'];
  }, [])
}

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}