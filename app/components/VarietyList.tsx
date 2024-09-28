"use client"

import React from 'react'

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

interface VarietyListProps {
  varieties: Variety[];
  colors: Color[];
}

export default function VarietyList({ varieties, colors }: VarietyListProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Variëteiten</h2>
      <ul className="space-y-2">
        {varieties.map(variety => (
          <li key={variety.VARcode} className="p-2 border rounded">
            <h3 className="font-medium">{variety.VARnaam}</h3>
            <p className="text-sm text-gray-600">
              Kleur: {colors.find(c => c.ColorID === variety.Kleur)?.ColorName}
            </p>
            <p className="text-sm text-gray-600">Formaat: {variety.Formaat}</p>
            <p className="text-sm text-gray-600">
              Cycli per jaar: {variety.AantalCyclussenPerJaar}
            </p>
            <p className="text-sm text-gray-600">
              Inspectie-interval: {variety.InspectieInterval} dagen
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}