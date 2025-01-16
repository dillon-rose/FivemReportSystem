import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

const areaChartoptions: ChartOptions<'polarArea'> = {
  responsive: true,
  scales: {
    r: {
      display: true,
      backgroundColor: 'rgb(255, 255, 255, 0.05)',
      grid: {
        color: 'rgb(255, 255, 255, 0.06)'
      },
      ticks: {
        display: false,
      },
      animate: true,
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
      fullSize: false,
      labels: {
          color: 'rgb(148 163 184)',
      }
    },
  },
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const AreaChart = ({ data }: { data: ChartData<'polarArea'> }) => {
  return (
    <PolarArea options={areaChartoptions} data={data} />
  )
}

export default AreaChart