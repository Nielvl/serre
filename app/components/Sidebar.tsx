import React, { useState } from 'react'
import { Home, MapPin, Leaf, Beaker } from 'lucide-react'

interface SidebarProps {
  onSelectTab: (tab: string) => void;
}

export default function Sidebar({ onSelectTab }: SidebarProps) {
  const [activeTab, setActiveTab] = useState('home')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    onSelectTab(tab)
  }

  const tabs = [
    { id: 'home', name: 'Home', Icon: Home },
    { id: 'locations', name: 'Locaties', Icon: MapPin },
    { id: 'varieties', name: 'Variëteiten', Icon: Leaf },
    { id: 'phytoproducts', name: 'Phytoproducten', Icon: Beaker },
  ]

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map(({ id, name, Icon }) => (
            <li key={id}>
              <button
                onClick={() => handleTabClick(id)}
                className={`w-full text-left p-2 rounded flex items-center ${
                  activeTab === id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-2" size={18} aria-hidden="true" />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}