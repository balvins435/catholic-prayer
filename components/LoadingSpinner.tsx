
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4" aria-label="Loading content">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  );
}
