
import React, { useState, useMemo } from 'react';
// FIX: Use relative paths for all module imports.
import { useApi } from '../hooks/useApi.ts';
import { fetchPrayers } from '../services/geminiService.ts';
import { Prayer } from '../types.ts';
import LoadingSpinner from './LoadingSpinner.tsx';
import ErrorMessage from './ErrorMessage.tsx';

const PrayerCard = ({ prayer }: { prayer: Prayer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex justify-between items-center"
        aria-expanded={isOpen}
        aria-controls={`prayer-text-${prayer.title.replace(/\s+/g, '-')}`}
      >
        <h3 className="font-serif text-lg font-semibold text-amber-900">{prayer.title}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div 
          id={`prayer-text-${prayer.title.replace(/\s+/g, '-')}`}
          className="p-4 pt-0"
        >
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-4 italic">{prayer.category}</p>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{prayer.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function PrayersView() {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const { data: prayers, status, error } = useApi<Prayer[]>(fetchPrayers, 'prayers', oneWeek);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    if (!prayers) return ['All'];
    const prayerCategories = new Set(prayers.map(p => p.category));
    return ['All', ...Array.from(prayerCategories).sort()];
  }, [prayers]);

  const filteredPrayers = useMemo(() => {
    if (!prayers) return [];
    return prayers.filter(prayer => {
      const matchesCategory = selectedCategory === 'All' || prayer.category === selectedCategory;
      const matchesSearch = prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) || prayer.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [prayers, searchTerm, selectedCategory]);

  return (
    <section aria-labelledby="prayers-heading">
      <div className="text-center mb-8">
        <h2 id="prayers-heading" className="text-3xl font-bold font-serif text-gray-800">Catholic Prayers</h2>
        <p className="text-lg text-gray-600 mt-1">A collection for reflection and devotion.</p>
      </div>

      {status === 'loading' && <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}
      {status === 'error' && error && <ErrorMessage message={error} />}
      
      {status === 'success' && prayers && (
        <>
          <div className="sticky top-[125px] z-5 bg-[#f8f7f5]/90 backdrop-blur-sm py-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="search"
                placeholder="Search prayers..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                aria-label="Search prayers"
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                aria-label="Filter by category"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredPrayers.length > 0 ? (
            <div className="space-y-4">
              {filteredPrayers.map(prayer => (
                <PrayerCard key={prayer.title} prayer={prayer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No prayers found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
