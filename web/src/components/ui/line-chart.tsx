import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// this is for sorting the days of the week so the current day is last in the array
export function getWeekLabels(): Array<string> {
    let curDay = new Date().getDay()
    let sortedLabels: number[] = []

    for (let i = curDay+1; i < 7; i++)
        sortedLabels.push(i)

    for (let i = 0; i <= curDay; i++)
        sortedLabels.push(i)

    return sortedLabels.map(day => {
        switch (day) {
            case 0:
                return 'Sunday'
            case 1:
                return 'Monday'
            case 2:
                return 'Tuesday'
            case 3:
                return 'Wednesday'
            case 4:
                return 'Thursday'
            case 5:
                return 'Friday'
            default:
                return 'Saturday'
        }
    })
}

export function getMonthLabels(): string[] {
    const weeks: string[] = [];
    const currentDate = new Date();
    
    const currentDayOfWeek = currentDate.getDay();
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
    
    for (let i = 3; i >= 0; i--) {
        const startOfThisWeek = new Date(startOfWeek);
        startOfThisWeek.setDate(startOfWeek.getDate() - (i * 7));
        
        const endOfThisWeek = new Date(startOfThisWeek);
        endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
        
        const weekString = `${formatDate(startOfThisWeek)} - ${formatDate(endOfThisWeek)}`;
        weeks.push(weekString);
    }

    return weeks;
}

// helper function to format date to MM/DD
const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
}

const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'top' as const,
        fullSize: false,
        labels: {
            color: 'rgb(148 163 184)',
        }
      },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            ticks: {
                color: 'rgb(148 163 184)',
            },
        },
        x: {
            type: 'category' as const,
            display: true,
            ticks: {
                color: 'rgb(148 163 184)',
            },
        }
    },
  };

const LineChart = ({ data }: { data: ChartData<'line'> }) => {
    return (
        <Line options={options} data={data} />
    )
}
  
export default LineChart