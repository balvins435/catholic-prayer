
import React from 'react';
// FIX: Use relative paths for all module imports.
import { useApi } from '../hooks/useApi.ts';
import { fetchDailyReadings } from '../services/geminiService.ts';
import { DailyReadings } from '../types.ts';
import LoadingSpinner from './LoadingSpinner.tsx';
import ErrorMessage from './ErrorMessage.tsx';

const ReadingCard = ({ title, citation, text }: { title: string; citation: string; text: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 hover:shadow-lg">
    <h3 className="font-serif text-xl font-semibold text-amber-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-4 font-medium">{citation}</p>
    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
      {text}
    </div>
  </div>
);

export default function DailyReadingsView() {
  const today = new Date();
  const cacheKey = `dailyReadings-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const oneDay = 24 * 60 * 60 * 1000;

  const { data: readings, status, error } = useApi<DailyReadings>(fetchDailyReadings, cacheKey, oneDay);

  return (
    <section aria-labelledby="daily-readings-heading">
      <div className="text-center mb-8">
        <h2 id="daily-readings-heading" className="text-3xl font-bold font-serif text-gray-800">Daily Mass Readings</h2>
        {status === 'success' && readings && (
          <>
            <p className="text-lg text-amber-800 mt-1">{readings.date}</p>
            <p className="text-md text-gray-600 mt-1">{readings.feast}</p>
          </>
        )}
      </div>

      {status === 'loading' && <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}
      {status === 'error' && error && <ErrorMessage message={error} />}
      
      {status === 'success' && readings && (
        <div className="space-y-6">
          <ReadingCard 
            title="First Reading" 
            citation={readings.firstReading.citation} 
            text={readings.firstReading.text} 
          />
          <ReadingCard 
            title="Responsorial Psalm" 
            citation={readings.responsorialPsalm.citation} 
            text={readings.responsorialPsalm.text} 
          />
          {readings.secondReading && (
            <ReadingCard 
              title="Second Reading" 
              citation={readings.secondReading.citation} 
              text={readings.secondReading.text} 
            />
          )}
          <ReadingCard 
            title="Gospel" 
            citation={readings.gospel.citation} 
            text={readings.gospel.text} 
          />
        </div>
      )}
    </section>
  );
}
