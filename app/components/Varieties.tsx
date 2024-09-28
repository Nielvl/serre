import React, { useState } from 'react'

interface Variety {
  name: string;
  colors: string[];
  locations: string[];
}

export default function Varieties() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVariety, setSelectedVariety] = useState<Variety | null>(null)

  const varieties: Variety[] = [
    { name: 'Kleine violen', colors: ['Tricolor', 'Geel', 'Paars', 'Rood'], locations: ['Vlezenbeek Perceel A', 'Portugal Veld 1'] },
    { name: 'Grote violen', colors: ['Tricolor', 'Geel', 'Paars', 'Rood'], locations: ['Vlezenbeek Perceel B', 'Portugal Veld 2'] },
    { name: 'Middel violen', colors: ['Tricolor', 'Geel', 'Paars', 'Rood'], locations: ['Vlezenbeek Perceel C', 'Portugal Veld 3'] },
    { name: 'Citroenafrikaantjes', colors: ['Geel'], locations: ['Vlezenbeek Perceel A'] },
    { name: 'Afrikaantjes', colors: ['Geel', 'Rood'], locations: ['Portugal Veld 1'] },
    { name: 'Leeuwebekjes', colors: ['Gemengd'], locations: ['Vlezenbeek Perceel B'] },
    { name: 'Alysum', colors: ['Wit', 'Paars'], locations: ['Portugal Veld 2'] },
  ]

  const filteredVarieties = varieties.filter(variety =>
    variety.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Variëteiten</h2>
      <input
        type="text"
        placeholder="Zoek variëteit..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVarieties.map((variety) => (
          <div key={variety.name} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium mb-2">{variety.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Kleuren: {variety.colors.join(', ')}</p>
            <button
              onClick={() => setSelectedVariety(variety)}
              className="text-blue-600 hover:underline"
            >
              Toon details
            </button>
          </div>
        ))}
      </div>
      {selectedVariety && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{selectedVariety.name}</h3>
          <p className="mb-2">Kleuren: {selectedVariety.colors.join(', ')}</p>
          <h4 className="font-medium mb-1">Gekoppelde percelen:</h4>
          <ul className="list-disc list-inside">
            {selectedVariety.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}