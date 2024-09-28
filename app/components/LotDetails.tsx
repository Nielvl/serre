"use client"

import React, { useState, useEffect } from 'react'

interface Color {
  ColorID: number;
  ColorName: string;
}

interface Variety {
  VARcode: number;
  VARnaam: string;
  Kleur: number;
  Formaat: string;
  AantalCyclussenPerJaar: number;
  InspectieInterval: number;
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

interface LotDetailsProps {
  lot: Lot;
  variety?: Variety;
  color?: Color;
  onUpdateLot: (updatedLot: Lot) => void;
}

export default function LotDetails({ lot, variety, color, onUpdateLot }: LotDetailsProps) {
  const [editedLot, setEditedLot] = useState(lot)

  useEffect(() => {
    setEditedLot(lot)
  }, [lot])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateLot(editedLot)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Lot Details</h2>
      <p>Lot Nummer: {lot.LOTnummer}</p>
      {variety && <p>Variëteit: {variety.VARnaam}</p>}
      {color && <p>Kleur: {color.ColorName}</p>}
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={editedLot.Type}
            onChange={e => setEditedLot({...editedLot, Type: e.target.value as 'Variëteit' | 'Fytoproduct'})}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="Variëteit">Variëteit</option>
            <option value="Fytoproduct">Fytoproduct</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Aantal Planten in Stadium</label>
          <input
            type="number"
            value={editedLot.AantalPlantenInStadium}
            onChange={e => setEditedLot({...editedLot, AantalPlantenInStadium: Number(e.target.value)})}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Huidig Stadium</label>
          <input
            type="text"
            value={editedLot.HuidigStadium}
            onChange={e => setEditedLot({...editedLot, HuidigStadium: e.target.value})}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Lot
        </button>
      </form>
    </div>
  )
}