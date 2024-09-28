import React, { useState } from 'react'
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

const getStatusColor = (status: Variety['status']) => {
  switch (status) {
    case 'kiemen':
      return 'text-gray-600';
    case 'groeien':
      return 'text-blue-600';
    case 'behandeld':
      return 'text-red-600';
    case 'bijna klaar om te oogsten':
      return 'text-green-400';
    case 'geoogst':
      return 'text-green-600';
    default:
      return 'text-black';
  }
}

export default function Locations({ 
  locations, 
  setLocations, 
  onVarietySelect 
}: { 
  locations: Location[], 
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>,
  onVarietySelect: (id: string) => void
}) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)
  const [newVariety, setNewVariety] = useState({ name: '', status: 'kiemen' as Variety['status'] })

  const addVariety = () => {
    if (selectedPlot && newVariety.name) {
      setLocations(prevLocations => 
        prevLocations.map(location => 
          location.plots.some(plot => plot.id === selectedPlot.id)
            ? {
                ...location,
                plots: location.plots.map(plot => 
                  plot.id === selectedPlot.id
                    ? {
                        ...plot,
                        varieties: [...plot.varieties, { ...newVariety, id: Date.now().toString() }]
                      }
                    : plot
                )
              }
            : location
        )
      )
      setNewVariety({ name: '', status: 'kiemen' })
    }
  }

  const removeVariety = (varietyId: string) => {
    setLocations(prevLocations => 
      prevLocations.map(location => ({
        ...location,
        plots: location.plots.map(plot => ({
          ...plot,
          varieties: plot.varieties.filter(v => v.id !== varietyId)
        }))
      }))
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Locaties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white p-4 rounded shadow">
            <button
              onClick={() => {
                setSelectedLocation(location.id)
                setSelectedPlot(null)
              }}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {location.name}
            </button>
            {selectedLocation === location.id && (
              <ul className="mt-2 space-y-2">
                {location.plots.map((plot) => (
                  <li key={plot.id}>
                    <button
                      onClick={() => setSelectedPlot(plot)}
                      className="ml-4 text-gray-800 hover:text-blue-600"
                    >
                      {plot.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {selectedPlot && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">{selectedPlot.name}</h3>
          <h4 className="text-lg font-medium mb-2">Gezaaide variëteiten:</h4>
          <ul className="space-y-2">
            {selectedPlot.varieties.map((variety) => (
              <li key={variety.id} className={`${getStatusColor(variety.status)} flex justify-between items-center`}>
                <button 
                  onClick={() => onVarietySelect(variety.id)}
                  className="hover:underline"
                >
                  {variety.name} - {variety.status}
                </button>
                <button 
                  onClick={() => removeVariety(variety.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Verwijder
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              value={newVariety.name}
              onChange={(e) => setNewVariety({ ...newVariety, name: e.target.value })}
              placeholder="Nieuwe variëteit naam"
              className="border p-2 mr-2"
            />
            <select
              value={newVariety.status}
              onChange={(e) => setNewVariety({ ...newVariety, status: e.target.value as Variety['status'] })}
              className="border p-2 mr-2"
            >
              <option value="kiemen">Kiemen</option>
              <option value="groeien">Groeien</option>
              <option value="behandeld">Behandeld</option>
              <option value="bijna klaar om te oogsten">Bijna klaar om te oogsten</option>
              <option value="geoogst">Geoogst</option>
            </select>
            <button 
              onClick={addVariety}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Voeg toe
            </button>
          </div>
        </div>
      )}
    </div>
  )
}