import React from 'react';
import EventCard from './EventCard';
import { Building2 } from 'lucide-react';

export default function VenuesWindow({ events, onEventClick }) {
  const groupedByVenue = events.reduce((acc, event) => {
    if (!acc[event.venue]) {
      acc[event.venue] = [];
    }
    acc[event.venue].push(event);
    return acc;
  }, {});

  const sortedVenues = Object.entries(groupedByVenue).sort((a, b) => 
    a[0].localeCompare(b[0])
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Venues</h2>
      <div className="space-y-6">
        {sortedVenues.map(([venue, venueEvents]) => (
          <div key={venue} className="border-b border-black/30 pb-6 last:border-0">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">{venue}</h3>
              <span className="text-sm text-gray-500">({venueEvents.length})</span>
            </div>
            <div className="space-y-2">
              {venueEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onClick={onEventClick}
                    compact
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}