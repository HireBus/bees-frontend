import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function BlindspotDiagram() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSectionHover = (section: string) => {
    setActiveSection(section);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  // Set dimensions based on screen size
  const diagramSize = isMobile ? 300 : 500;

  return (
    <div
      className="relative mx-auto"
      style={{
        width: `${diagramSize}px`,
        height: `${diagramSize}px`,
      }}
    >
      {/* Tooltip */}
      {activeSection && (
        <div className="absolute left-0 top-0 z-10 w-64 rounded-md border bg-white p-4 shadow-md">
          <h4 className="mb-2 font-semibold">Tooltip title</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      )}

      {/* Outer Circle */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-200">
        {/* Section Labels - Hide on mobile */}
        {!isMobile && (
          <>
            <div className="absolute left-[100%] top-[50%] -translate-y-1/2 translate-x-4 transform text-sm font-medium">
              Trait
            </div>
            <div className="absolute left-[50%] top-[0%] -translate-x-1/2 -translate-y-8 transform text-sm font-medium">
              Emotion
            </div>
            <div className="absolute left-[0%] top-[50%] -translate-x-16 -translate-y-1/2 transform text-sm font-medium">
              Behavior
            </div>
            <div className="absolute left-[25%] top-[75%] -translate-x-1/2 translate-y-4 transform text-sm font-medium">
              Motive
            </div>
          </>
        )}
      </div>

      {/* Middle Circle */}
      <div className="absolute inset-[15%] rounded-full border-2 border-dashed border-gray-200"></div>

      {/* Inner Circle */}
      <div className="absolute inset-[30%] rounded-full border-2 border-gray-200"></div>

      {/* Center Circle */}
      <div className="absolute inset-[45%] rounded-full border-2 border-gray-200"></div>

      {/* Sections */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Trait Section */}
        <path
          d="M50,50 L100,50 A50,50 0 0,0 50,0 z"
          className={cn(
            'cursor-pointer fill-teal-100 stroke-teal-500 stroke-[0.5] transition-opacity',
            activeSection === 'trait' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          )}
          onMouseEnter={() => handleSectionHover('trait')}
          onMouseLeave={handleSectionLeave}
        />

        {/* Emotion Section */}
        <path
          d="M50,50 L50,0 A50,50 0 0,0 0,50 z"
          className={cn(
            'cursor-pointer fill-blue-100 stroke-blue-500 stroke-[0.5] transition-opacity',
            activeSection === 'emotion' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          )}
          onMouseEnter={() => handleSectionHover('emotion')}
          onMouseLeave={handleSectionLeave}
        />

        {/* Behavior Section */}
        <path
          d="M50,50 L0,50 A50,50 0 0,0 50,100 z"
          className={cn(
            'cursor-pointer fill-gray-100 stroke-gray-500 stroke-[0.5] transition-opacity',
            activeSection === 'behavior' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          )}
          onMouseEnter={() => handleSectionHover('behavior')}
          onMouseLeave={handleSectionLeave}
        />

        {/* Motive Section */}
        <path
          d="M50,50 L50,100 A50,50 0 0,0 100,50 z"
          className={cn(
            'cursor-pointer fill-green-100 stroke-green-500 stroke-[0.5] transition-opacity',
            activeSection === 'motive' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          )}
          onMouseEnter={() => handleSectionHover('motive')}
          onMouseLeave={handleSectionLeave}
        />
      </svg>

      {/* Center Label */}
      <div
        className="absolute inset-[45%] flex items-center justify-center text-lg font-semibold"
        style={{ transform: 'rotate(0deg)' }}
      >
        <div className="text-center">
          <div className={activeSection === 'motive' ? 'text-green-600' : 'text-muted-foreground'}>
            {isMobile ? 'M' : 'Motive'}
          </div>
        </div>
      </div>
    </div>
  );
}
