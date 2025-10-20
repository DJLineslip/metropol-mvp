import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, Tag } from 'lucide-react';

export default function EventDetailWindow({ event }) {
  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'EEEE do MMMM');
    } catch {
      return dateStr;
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(event.date);
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.venue}\n${event.url || ''}`);
    const location = encodeURIComponent(event.venue);
    
    const startDateStr = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${startDateStr}&details=${details}&location=${location}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="bg-white">
      <img
      src={event.image || '/placeholder-event.png'}
      alt={event.title}
      className="w-full h-64 object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/placeholder-event.png';
      }}
      />
      <div className="p-6 space-y-4">
        <div>
          <p className="text-red-500 font-bold mb-2">
            {formatDate(event.date)}
          </p>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {event.title}
          </h2>
          <p className="text-gray-700">{event.venue}</p>
        </div>

        {event.event_type && (
          <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
            {event.event_type}
          </p>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => event.url && window.open(event.url, '_blank')}
            className="flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity"
          >
            <span className="text-red-500 text-lg">▶</span>
            <span>share</span>
          </button>
          <button
            onClick={addToCalendar}
            className="flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity"
          >
            <span className="text-red-500 text-lg">■</span>
            <span>add to plans</span>
          </button>
        </div>
      </div>
    </div>
  );
}