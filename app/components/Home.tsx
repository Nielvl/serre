"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Variety {
  id: string;
  name: string;
  status: 'kiemen' | 'groeien' | 'behandeld' | 'bijna klaar om te oogsten' | 'geoogst';
}

interface Plot {
  id: string;
  name: string;
  varieties: Variety[];
}

interface Location {
  id: string;
  name: string;
  plots: Plot[];
}

interface WeatherData {
  day: number;
  temp: number;
  condition: string;
}

interface WeatherState {
  vlezenbeek: WeatherData[];
  portugal: WeatherData[];
}

export default function Home({ locations }: { locations: Location[] }) {
  const [weatherData, setWeatherData] = useState<WeatherState>({
    vlezenbeek: [],
    portugal: []
  });

  useEffect(() => {
    // Simulate fetching weather data
    const getWeatherForecast = (): WeatherData[] => {
      return Array(7).fill(null).map((_, i) => ({
        day: i + 1,
        temp: Math.round(Math.random() * 15 + 10),
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      }))
    }

    setWeatherData({
      vlezenbeek: getWeatherForecast(),
      portugal: getWeatherForecast()
    });
  }, []);

  const urgentTasks = [
    { type: 'Inspectie', daysLeft: 1, location: 'Perceel A' },
    { type: 'Oogsten', daysLeft: 2, location: 'Perceel B' },
  ]

  const almostReadyToHarvest = locations.flatMap(location =>
    location.plots.flatMap(plot =>
      plot.varieties
        .filter(variety => variety.status === 'bijna klaar om te oogsten')
        .map(variety => ({
          id: variety.id,
          name: variety.name,
          location: location.name,
          plot: plot.name
        }))
    )
  )

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Dringende Zaken</h2>
        <ul className="space-y-2">
          {urgentTasks.map((task, index) => (
            <li key={index} className="bg-yellow-100 p-3 rounded">
              <span className="font-semibold">{task.type}</span> nodig in {task.daysLeft} dagen op {task.location}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bijna Klaar voor Oogst</h2>
        <ul className="space-y-2">
          {almostReadyToHarvest.map((variety) => (
            <li key={variety.id} className="bg-green-100 p-3 rounded">
              <Link href={`/locations/${variety.location}/${variety.plot}`} className="text-blue-600 hover:underline">
                {variety.name} in {variety.location} - {variety.plot}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weersvoorspelling Vlezenbeek (1 week)</h2>
        <div className="flex space-x-4">
          {weatherData.vlezenbeek.map((day, index) => (
            <div key={index} className="bg-white p-3 rounded shadow text-center">
              <div>Dag {day.day}</div>
              <div>{day.temp}°C</div>
              <div>{day.condition}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weersvoorspelling Portugal (1 week)</h2>
        <div className="flex space-x-4">
          {weatherData.portugal.map((day, index) => (
            <div key={index} className="bg-white p-3 rounded shadow text-center">
              <div>Dag {day.day}</div>
              <div>{day.temp}°C</div>
              <div>{day.condition}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Belangrijke Berichten</h2>
        <p>Hier komen belangrijke berichten (nog uit te bouwen)</p>
      </section>
    </div>
  )
}