"use client"

import React, { useState } from 'react'

interface Location {
  LocationID: number;
  PerceelNummer: string;
  RijNummer: string;
  TypeBevloeiing: string;
  VastOfMobiel: 'Vast' | 'Mobiel';
}

interface Lot {
  LOTnummer: number;
  LOTVARcode: number;
  LocationID: number;
  Type: 'Variëteit' | 'Fytoproduct';
  Kleur: number;
  AantalPlantenInStadium: number;
  HuidigStadium: string;
}

interface LocationDetailsProps {
  location: Location;
  lots: Lot[];
  onAddLot: (newLot: Omit<Lot, 'LOTnummer'>) => void;
  onSelectLot: (lot: Lot) => void;
}

export default function LocationDetails({ location, lots, onAddLot, onSelectLot }: LocationDetailsProps) {
  const [newLot, setNewLot] = useState<Omit<Lot, 'LOTnummer'>>({
    LOTVARcode: 0,
    LocationID: location.LocationID,
    Type: 'Variëteit',
    Kleur: 0,
    AantalPlantenInStadium: 0,
    HuidigStadium: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddLot(newLot)
    setNewLot({
      LOTVARcode: 0,
      LocationID: location.LocationID,
      Type: 'Variëteit',
      Kleur: 0,
      AantalPlantenInStadium: 0,
      HuidigStadium: '',
    })
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Perceel {location.PerceelNummer}, Rij {location.RijNummer}
      </h2>
      <p>Type bevloeiing: {location.TypeBevloeiing}</p>
      <p>Type: {location.VastOfMobiel}</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Loten</h3>
      <ul className="space-y-2 mb-4">
        {lots.map(lot => (
          <li 
            key={lot.LOTnummer}
            className="p-2 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectLot(lot)}
          >
            Lot {lot.LOTnummer} - Type: {lot.Type}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          placeholder="Variëteit Code"
          value={newLot.LOTVARcode || ''}
          onChange={e => setNewLot({...newLot, LOTVARcode: Number(e.target.value)})}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={newLot.Type}
          onChange={e => setNewLot({...newLot, Type: e.target.value as 'Variëteit' | 'Fytoproduct'})}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Variëteit">Variëteit</option>
          <option value="Fytoproduct">Fytoproduct</option>
        </select>
        <input
          type="number"
          placeholder="Kleur ID"
          value={newLot.Kleur || ''}
          onChange={e => setNewLot({...newLot, Kleur: Number(e.target.value)})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Aantal planten in stadium"
          value={newLot.AantalPlantenInStadium || ''}
          onChange={e => setNewLot({...newLot, AantalPlantenInStadium: Number(e.target.value)})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Huidig stadium"
          value={newLot.HuidigStadium}
          onChange={e => setNewLot({...newLot, HuidigStadium: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Voeg Lot Toe
        </button>
      </form>
    </div>
  )
}