import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from '../Components/desktop/Window';
import ThisWeekWindow from '../Components/desktop/ThisWeekWindow';
import VenuesWindow from '../Components/desktop/VenuesWindow';
import SearchWindow from '../Components/desktop/SearchWindow';
import EventDetailWindow from '../Components/desktop/EventDetailWindow';
import { events } from '../Components/data/events';

export default function Home() {
  const [openWindows, setOpenWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const booted = useRef(false); // prevents opening twice in StrictMode

  const openWindow = (type, data = null) => {
    const windowId = `${type}-${Date.now()}`;
    const positions = [
      { x: 120, y: 120 },
      { x: 200, y: 150 },
      { x: 280, y: 180 },
      { x: 360, y: 210 },
    ];
    const position = positions[openWindows.length % positions.length];

    const newWindow = {
      id: windowId,
      type,
      data,
      position,
      zIndex: nextZIndex,
    };

    setOpenWindows([...openWindows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    openWindow('thisWeek');
  }, []);

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
  };

  const focusWindow = (windowId) => {
    setOpenWindows(windows => 
      windows.map(w => 
        w.id === windowId 
          ? { ...w, zIndex: nextZIndex }
          : w
      )
    );
    setNextZIndex(nextZIndex + 1);
  };

  const handleEventClick = (event) => {
    openWindow('eventDetail', event);
  };

  const getWindowContent = (window) => {
    switch (window.type) {
      case 'thisWeek':
        return (
          <Window
            key={window.id}
            title="this week"
            onClose={() => closeWindow(window.id)}
            initialPosition={window.position}
            initialSize={{ width: 400, height: 600 }}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
          >
            <ThisWeekWindow events={events} onEventClick={handleEventClick} />
          </Window>
        );
      case 'venues':
        return (
          <Window
            key={window.id}
            title="venues"
            onClose={() => closeWindow(window.id)}
            initialPosition={window.position}
            initialSize={{ width: 450, height: 600 }}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
          >
            <VenuesWindow events={events} onEventClick={handleEventClick} />
          </Window>
        );
      case 'search':
        return (
          <Window
            key={window.id}
            title="search"
            onClose={() => closeWindow(window.id)}
            initialPosition={window.position}
            initialSize={{ width: 400, height: 600 }}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
          >
            <SearchWindow events={events} onEventClick={handleEventClick} />
          </Window>
        );
      case 'eventDetail':
        return (
          <Window
            key={window.id}
            title={window.data.title}
            onClose={() => closeWindow(window.id)}
            initialPosition={window.position}
            initialSize={{ width: 500, height: 650 }}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
          >
            <EventDetailWindow event={window.data} />
          </Window>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-200/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between px-6 py-3">
        <img
          src="/logo.png"
          alt="Metropol"
          className="h-6 w-auto select-none"
          draggable="false"
        />
          <nav className="flex items-center gap-8">
            <button
              onClick={() => openWindow('thisWeek')}
              className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity"
            >
              this week
            </button>
            <button
              onClick={() => openWindow('venues')}
              className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity"
            >
              venues
            </button>
            <button
              onClick={() => openWindow('search')}
              className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity"
            >
              search
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop Area */}
      <div className="pt-16 h-screen">
        <AnimatePresence>
          {openWindows.map(window => getWindowContent(window))}
        </AnimatePresence>
      </div>
    </div>
  );
}