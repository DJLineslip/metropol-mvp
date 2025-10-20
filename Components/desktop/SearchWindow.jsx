import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EventCard from './EventCard';

export default function SearchWindow({ events, onEventClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => {
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.venue.toLowerCase().includes(term) ||
      event.category?.toLowerCase().includes(term) ||
      event.event_type?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search events, venues, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'} found
        </div>
      )}

      <div className="space-y-3">
        {searchTerm ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={onEventClick}
                compact
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No events found</p>
          )
        ) : (
          <p className="text-gray-500 text-center py-8">Start typing to search</p>
        )}
      </div>
    </div>
  );
}