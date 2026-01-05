
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-transparent text-center py-6 mt-8">
      <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Sanctuary App. Liturgical content powered by Google Gemini.
      </p>
    </footer>
  );
}
