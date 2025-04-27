
import React from 'react';
import { cn } from '@/lib/utils';

interface CylinderProps {
  isSpinning: boolean;
  selectedIndex: number | null;
  songCount: number;
}

const Cylinder: React.FC<CylinderProps> = ({ 
  isSpinning, 
  selectedIndex,
  songCount 
}) => {
  // Create slots based on song count (default to 6 if not available)
  const slotCount = songCount || 6;
  const slots = Array.from({ length: slotCount }, (_, i) => i);

  return (
    <div className="relative w-64 h-64 mx-auto my-8">
      <div 
        className={cn(
          "cylinder-container relative w-full h-full transition-all duration-500",
          isSpinning ? "spinning" : ""
        )}
      >
        {/* Cylinder base */}
        <div className="absolute inset-0 bg-roulette-dark rounded-full border-4 border-roulette-light shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-roulette-light rounded-full z-10 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
          
          {/* Bullet chambers */}
          {slots.map((index) => {
            const angle = (360 / slotCount) * index;
            const isSelected = selectedIndex === index;
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute w-12 h-12 rounded-full border-2",
                  isSelected && !isSpinning
                    ? "bg-neon-red border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                    : "bg-roulette-light border-gray-600",
                )}
                style={{
                  transform: `rotate(${angle}deg) translateX(90px)`,
                  transition: "all 0.5s ease-out",
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Selection indicator */}
      <div className="absolute top-0 right-0 w-4 h-16 bg-neon-red transform translate-x-2 -translate-y-2 z-20">
        <div className="w-0 h-0 border-l-8 border-l-transparent border-b-8 border-b-neon-red absolute -left-2 top-0"></div>
      </div>
    </div>
  );
};

export default Cylinder;
