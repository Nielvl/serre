import React from 'react'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Treatment {
  date: string
  description: string
}

interface WeatherData {
  date: string
  temperature: number
  sunHours: number
  rainfall: number
}

interface VarietyData {
  id: string
  name: string
  sowingDate: string
  expectedHarvestDate: string
  treatments: Treatment[]
  weatherData: WeatherData[]
}

const mockWeatherData = (startDate: Date, days: number): WeatherData[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    return {
      date: date.toISOString().split('T')[0],
      temperature: Math.round((Math.random() * 10 + 15) * 10) / 10, // 15-25°C
      sunHours: Math.round(Math.random() * 12 * 10) / 10, // 0-12 hours
      rainfall: Math.round(Math.random() * 10 * 10) / 10, // 0-10mm
    }
  })
}

const currentDate = new Date()
const oneMonthAgo = new Date(currentDate)
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
const oneWeekAgo = new Date(currentDate)
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

const varietyData: VarietyData[] = [
  {
    id: '1',
    name: 'Afrikaantje 1',
    sowingDate: oneMonthAgo.toISOString().split('T')[0],
    expectedHarvestDate: new Date(oneMonthAgo.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    treatments: [
      { date: new Date(oneMonthAgo.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Eerste watergift' },
      { date: new Date(oneMonthAgo.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Bemesting' },
      { date: new Date(oneMonthAgo.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Onkruid wieden' },
    ],
    weatherData: mockWeatherData(oneMonthAgo, 30),
  },
  {
    id: '2',
    name: 'Afrikaantje 2',
    sowingDate: oneWeekAgo.toISOString().split('T')[0],
    expectedHarvestDate: new Date(oneWeekAgo.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    treatments: [
      { date: new Date(oneWeekAgo.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Eerste watergift' },
      { date: new Date(oneWeekAgo.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Bemesting' },
    ],
    weatherData: mockWeatherData(oneWeekAgo, 7),
  },
]

export default function VarietyDetails({ id }: { id: string }) {
  const variety = varietyData.find(v => v.id === id)

  if (!variety) {
    return <div>Variëteit niet gevonden</div>
  }

  const today = new Date()
  const sowingDate = new Date(variety.sowingDate)
  const daysSinceSowing = Math.floor((today.getTime() - sowingDate.getTime()) / (1000 * 3600 * 24))

  const chartData = {
    labels: variety.weatherData.map(d => d.date),
    datasets: [
      {
        label: 'Temperatuur (°C)',
        data: variety.weatherData.map(d => d.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
        type: 'line' as const,
      },
      {
        label: 'Zonuren',
        data: variety.weatherData.map(d => d.sunHours),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        yAxisID: 'y',
        type: 'line' as const,
      },
      {
        label: 'Regenval (mm)',
        data: variety.weatherData.map(d => d.rainfall),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        yAxisID: 'y1',
        type: 'bar' as const,
      },
    ],
  }

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperatuur (°C) / Zonuren',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Regenval (mm)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{variety.name}</h2>
      <div>
        <p>Gezaaid op: {variety.sowingDate}</p>
        <p>Verwachte oogstdatum: {variety.expectedHarvestDate}</p>
        <p>Dagen sinds zaaien: {daysSinceSowing}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Behandelingshistoriek</h3>
        <ul className="list-disc pl-5">
          {variety.treatments.map((treatment, index) => (
            <li key={index}>{treatment.date}: {treatment.description}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Weergegevens en Groei</h3>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}