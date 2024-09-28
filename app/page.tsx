"use client"

import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Locations from './components/Locations'
import Varieties from './components/Varieties'
import Phytoproducts from './components/Phytoproducts'
import VarietyDetails from './components/VarietyDetails'

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

export default function TeeltBeheerApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedVarietyId, setSelectedVarietyId] = useState<string | null>(null)
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Vlezenbeek',
      plots: [
        {
          id: '1a',
          name: 'Perceel A',
          varieties: [
            { id: '1', name: 'Afrikaantje 1', status: 'groeien' },
            { id: '2', name: 'Grote violen', status: 'kiemen' },
          ]
        },
        {
          id: '1b',
          name: 'Perceel B',
          varieties: [
            { id: '3', name: 'Afrikaantje 2', status: 'kiemen' },
            { id: '4', name: 'Leeuwebekjes', status: 'bijna klaar om te oogsten' },
          ]
        },
      ]
    },
    {
      id: '2',
      name: 'Portugal',
      plots: [
        {
          id: '2a',
          name: 'Veld 1',
          varieties: [
            { id: '5', name: 'Citroenafrikaantjes', status: 'geoogst' },
            { id: '6', name: 'Alysum', status: 'groeien' },
          ]
        },
        {
          id: '2b',
          name: 'Veld 2',
          varieties: [
            { id: '7', name: 'Middel violen', status: 'behandeld' },
          ]
        },
      ]
    },
  ])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    setSelectedVarietyId(null)
  }, [])

  const handleVarietySelect = useCallback((id: string) => {
    setSelectedVarietyId(id)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelectTab={handleTabChange} />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Teeltbeheer Applicatie</h1>
        {activeTab === 'home' && <Home locations={locations} />}
        {activeTab === 'locations' && (
          selectedVarietyId ? (
            <VarietyDetails id={selectedVarietyId} />
          ) : (
            <Locations 
              locations={locations} 
              setLocations={setLocations}
              onVarietySelect={handleVarietySelect}
            />
          )
        )}
        {activeTab === 'varieties' && <Varieties />}
        {activeTab === 'phytoproducts' && <Phytoproducts />}
      </div>
    </div>
  )
}