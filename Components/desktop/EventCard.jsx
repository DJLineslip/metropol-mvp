import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';

export default function EventCard({ event, onClick, compact = false }) {
  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'EEEE do MMMM');
    } catch {
      return dateStr;
    }
  };

  if (compact) {
    return (
      <div 
        onClick={() => onClick(event)}
        className="flex gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
      >
        <img 
          src={event.image} 
          alt={event.title}
          className="w-16 h-16 object-cover rounded flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-red-500 font-medium mb-1">
            {formatDate(event.date)}
          </p>
          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
            {event.title}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-1">
            {event.venue}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(event)}
      className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
    >
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-red-500 font-medium mb-2">
          {formatDate(event.date)}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
      </div>
    </div>
  );
}