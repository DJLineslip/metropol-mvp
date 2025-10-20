import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Window({ 
  title, 
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 500 },
  zIndex = 1,
  onFocus
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls') || e.target.closest('.window-content')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onFocus?.();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ff2a2a]"
      style={{
        left: position.x,
        top: position.y,
        width: initialSize.width,
        maxHeight: initialSize.height,
        zIndex,
        cursor: isDragging ? 'grabbing' : 'default'//,
        // border: '3px solid #FFB3BA'

      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div 
        className="window-header bg-[#FFB3BA] px-4 py-3 flex items-center gap-3 cursor-grab active:cursor-grabbing border-b border-[#ff2a2a]"
        onMouseDown={handleMouseDown}
      >
        <button 
          onClick={onClose}
          className="window-controls w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex-shrink-0"
        />
        <div className="text-sm font-bold text-gray-900">
          {title}
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content overflow-y-auto no-scrollbar bg-white" style={{ maxHeight: initialSize.height - 60 }}>
        {children}
      </div>
    </motion.div>
  );
}