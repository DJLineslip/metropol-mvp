import React from 'react';
import EventCard from './EventCard';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export default function ThisWeekWindow({ events, onEventClick }) {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return isWithinInterval(eventDate, { start: weekStart, end: weekEnd });
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">This Week</h2>
      {thisWeekEvents.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events this week</p>
      ) : (
        <div className="space-y-3">
          {thisWeekEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={onEventClick}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}