import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface BlindspotData {
  id: string;
  label: string;
  weight: number; // Weight determines the intensity of the color
  description?: string;
}

export interface SectionData {
  id: string;
  label: string;
  color: string;
  description?: string;
}

export interface BlindspotChartProps {
  blindspots?: BlindspotData[];
  size?: number;
  centerColor?: string;
  className?: string;
}

const defaultSections: SectionData[] = [
  // Level 2
  {
    id: 'motive',
    label: 'Motive',
    color: '#00CCBE',
    description: 'What drives your actions and decisions',
  },
  // Level 3
  {
    id: 'intellect',
    label: 'Intellect',
    color: '#00CCBE',
    description: 'How you think and process information',
  },
  {
    id: 'emotion',
    label: 'Emotion',
    color: '#00CCBE',
    description: 'How you experience and express emotions',
  },
  {
    id: 'trait',
    label: 'Trait',
    color: '#00CCBE',
    description: 'Your inherent characteristics and qualities',
  },
  // Level 4
  {
    id: 'behavior',
    label: 'Behavior',
    color: '#00CCBE',
    description: 'How you typically act in different situations',
  },
  {
    id: 'identity',
    label: 'Identity',
    color: '#00CCBE',
    description: 'Your sense of self and how you define yourself',
  },
];

// Function to get color based on weight (0-100)
const getColorByWeight = (weight: number, baseColor = '#00CCBE'): string => {
  if (weight <= 0) return 'white';

  // For weights > 0, calculate opacity based on weight
  // Higher weight = more intense color
  const opacity = Math.min(0.3 + (weight / 100) * 0.7, 1);

  // Extract RGB components from the base color
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  // Calculate the color with white background blending
  const blendedR = Math.round(r * opacity + 255 * (1 - opacity));
  const blendedG = Math.round(g * opacity + 255 * (1 - opacity));
  const blendedB = Math.round(b * opacity + 255 * (1 - opacity));

  return `rgb(${blendedR}, ${blendedG}, ${blendedB})`;
};

export function BlindspotChart({
  blindspots = [],
  size: propSize,
  centerColor = '#00CCBE',
  className,
}: BlindspotChartProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px) and (min-width: 769px)');

  // Determine the size based on screen and prop
  const size = propSize || (isMobile ? 320 : isTablet ? 450 : 555);

  // Tooltip position by section - adjust based on screen size
  const tooltipPositions = {
    motive: isMobile
      ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    intellect: isMobile
      ? { top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }
      : { top: '25%', left: '25%', transform: 'translate(-50%, -50%)' },
    emotion: isMobile
      ? { top: '25%', right: '25%', transform: 'translate(50%, -50%)' }
      : { top: '25%', right: '25%', transform: 'translate(50%, -50%)' },
    trait: isMobile
      ? { bottom: '25%', left: '50%', transform: 'translate(-50%, 50%)' }
      : { bottom: '25%', left: '50%', transform: 'translate(-50%, 50%)' },
    behavior: isMobile
      ? { bottom: '10%', left: '50%', transform: 'translate(-50%, 0)' }
      : { bottom: '10%', left: '50%', transform: 'translate(-50%, 0)' },
    identity: isMobile
      ? { top: '10%', left: '50%', transform: 'translate(-50%, 0)' }
      : { top: '10%', left: '50%', transform: 'translate(-50%, 0)' },
  };

  // Close tooltip on mobile scroll
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        setActiveSection(null);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobile]);

  const handleSectionHover = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  // Get blindspot data for a section, or null if not present
  const getBlindspot = (sectionId: string): BlindspotData | null => {
    return blindspots.find(b => b.id === sectionId) || null;
  };

  // Get fill color based on blindspot weight
  const getSectionFillColor = (sectionId: string): string => {
    const blindspot = getBlindspot(sectionId);
    if (!blindspot) return 'white';
    return getColorByWeight(blindspot.weight);
  };

  // Get stroke color based on blindspot weight
  const getSectionStrokeColor = (sectionId: string): string => {
    const blindspot = getBlindspot(sectionId);
    if (!blindspot) return '#B8B8B8'; // Gray stroke if not present
    return getColorByWeight(blindspot.weight, '#009990'); // Slightly darker green for stroke
  };

  // Get section label (from blindspot if available, otherwise from default)
  const getSectionLabel = (sectionId: string): string => {
    const blindspot = getBlindspot(sectionId);
    if (blindspot) return blindspot.label;

    const defaultSection = defaultSections.find(s => s.id === sectionId);
    return defaultSection?.label || sectionId;
  };

  // Get section description
  const getSectionDescription = (sectionId: string): string | undefined => {
    const blindspot = getBlindspot(sectionId);
    if (blindspot?.description) return blindspot.description;

    const defaultSection = defaultSections.find(s => s.id === sectionId);
    return defaultSection?.description;
  };

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 555 555"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Level 4 - Identity (Top) */}
        <path
          d="M544.78 277.498C549.87 277.498 554.012 273.369 553.843 268.281C551.511 198.295 522.689 131.661 473.012 81.9844C421.158 30.131 350.83 1.00001 277.498 1C204.166 0.999994 133.838 30.1309 81.9844 81.9844C32.3074 131.661 3.48547 198.295 1.15349 268.281C0.983977 273.368 5.12639 277.498 10.2165 277.498H84.1338C89.224 277.498 93.3263 273.369 93.5807 268.285C95.8574 222.801 114.929 179.643 147.286 147.286C181.82 112.752 228.659 93.3503 277.498 93.3503C326.337 93.3503 373.176 112.752 407.71 147.286C440.067 179.643 459.139 222.801 461.415 268.285C461.67 273.369 465.772 277.498 470.862 277.498H544.78Z"
          fill={getSectionFillColor('identity')}
          stroke={getSectionStrokeColor('identity')}
          strokeWidth="1.84331"
          opacity={activeSection === 'identity' ? 1 : 0.9}
          className="cursor-pointer transition-all duration-300 hover:opacity-100"
          onMouseEnter={() => handleSectionHover('identity')}
          onMouseLeave={handleSectionLeave}
        />
        <text x="277" y="56" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('identity')}
        </text>

        {/* Level 4 - Behavior (Bottom) */}
        <path
          d="M544.78 277.498C549.87 277.498 554.012 281.628 553.843 286.715C551.511 356.701 522.689 423.335 473.012 473.012C421.158 524.865 350.83 553.996 277.498 553.996C204.166 553.996 133.838 524.865 81.9844 473.012C32.3074 423.335 3.48547 356.701 1.15349 286.715C0.983977 281.628 5.12639 277.498 10.2165 277.498H84.1338C89.224 277.498 93.3263 281.627 93.5807 286.711C95.8574 332.196 114.929 375.354 147.286 407.71C181.82 442.245 228.659 461.646 277.498 461.646C326.337 461.646 373.176 442.245 407.71 407.71C440.067 375.354 459.139 332.195 461.415 286.711C461.67 281.627 465.772 277.498 470.862 277.498H544.78Z"
          fill={getSectionFillColor('behavior')}
          stroke={getSectionStrokeColor('behavior')}
          strokeWidth="1.84331"
          opacity={activeSection === 'behavior' ? 1 : 0.9}
          className="cursor-pointer transition-all duration-300 hover:opacity-100"
          onMouseEnter={() => handleSectionHover('behavior')}
          onMouseLeave={handleSectionLeave}
        />
        <text x="277" y="518" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('behavior')}
        </text>

        {/* Level 3 - Trait (Bottom) */}
        <g clipPath="url(#clip0_6_6645)">
          <path
            d="M125.678 364.887C121.269 367.432 119.74 373.083 122.502 377.359C138.343 401.879 159.809 422.325 185.166 436.965C213.188 453.144 244.975 461.661 277.332 461.661C309.689 461.661 341.476 453.144 369.498 436.965C394.855 422.325 416.321 401.879 432.162 377.359C434.925 373.083 433.395 367.432 428.987 364.887L365.132 328.02C360.724 325.475 355.123 327.018 352.151 331.15C344.543 341.726 334.758 350.599 323.415 357.147C309.404 365.236 293.511 369.495 277.332 369.495C261.154 369.495 245.26 365.236 231.249 357.147C219.906 350.599 210.121 341.726 202.513 331.15C199.541 327.018 193.94 325.475 189.532 328.02L125.678 364.887Z"
            fill={getSectionFillColor('trait')}
            stroke={getSectionStrokeColor('trait')}
            strokeWidth="1.84331"
            opacity={activeSection === 'trait' ? 1 : 0.9}
            className="cursor-pointer transition-all duration-300 hover:opacity-100"
            onMouseEnter={() => handleSectionHover('trait')}
            onMouseLeave={handleSectionLeave}
          />
        </g>
        <text x="277" y="422" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('trait')}
        </text>

        {/* Level 3 - Emotion (Top Right) */}
        <path
          d="M429.152 365.055C433.561 367.601 439.22 366.1 441.541 361.57C454.856 335.591 461.83 306.778 461.83 277.498C461.83 245.141 453.313 213.354 437.134 185.332C420.956 157.31 397.686 134.04 369.664 117.862C344.307 103.222 315.867 94.8549 286.711 93.396C281.627 93.1417 277.498 97.2921 277.498 102.382L277.498 176.115C277.498 181.205 281.635 185.284 286.699 185.792C299.662 187.093 312.238 191.131 323.581 197.68C337.592 205.769 349.227 217.404 357.316 231.415C365.405 245.426 369.664 261.319 369.664 277.498C369.664 290.595 366.873 303.506 361.518 315.382C359.426 320.022 360.89 325.644 365.298 328.189L429.152 365.055Z"
          fill={getSectionFillColor('emotion')}
          stroke={getSectionStrokeColor('emotion')}
          strokeWidth="1.84331"
          opacity={activeSection === 'emotion' ? 1 : 0.9}
          className="cursor-pointer transition-all duration-300 hover:opacity-100"
          onMouseEnter={() => handleSectionHover('emotion')}
          onMouseLeave={handleSectionLeave}
        />
        <text x="415" y="242" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('emotion')}
        </text>

        {/* Level 3 - Intellect (Top Left) */}
        <path
          d="M277.498 102.382C277.498 97.2921 273.369 93.1417 268.285 93.396C239.129 94.8549 210.689 103.222 185.332 117.862C157.31 134.04 134.04 157.31 117.862 185.332C101.683 213.354 93.166 245.141 93.166 277.498C93.166 306.778 100.14 335.591 113.455 361.57C115.776 366.1 121.435 367.601 125.844 365.055L189.698 328.189C194.106 325.644 195.57 320.022 193.478 315.382C188.123 303.506 185.332 290.595 185.332 277.498C185.332 261.319 189.591 245.426 197.68 231.415C205.769 217.404 217.404 205.769 231.415 197.68C242.758 191.131 255.334 187.093 268.297 185.792C273.361 185.284 277.498 181.205 277.498 176.115V102.382Z"
          fill={getSectionFillColor('intellect')}
          stroke={getSectionStrokeColor('intellect')}
          strokeWidth="1.84331"
          opacity={activeSection === 'intellect' ? 1 : 0.9}
          className="cursor-pointer transition-all duration-300 hover:opacity-100"
          onMouseEnter={() => handleSectionHover('intellect')}
          onMouseLeave={handleSectionLeave}
        />
        <text x="140" y="243" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('intellect')}
        </text>

        {/* Level 2 - Motive (Circle around center) */}
        <circle
          cx="277.497"
          cy="277.497"
          r="91.2444"
          fill={getSectionFillColor('motive')}
          stroke={getSectionStrokeColor('motive')}
          strokeWidth="1.84331"
          opacity={activeSection === 'motive' ? 1 : 0.9}
          className="cursor-pointer transition-all duration-300 hover:opacity-100"
          onMouseEnter={() => handleSectionHover('motive')}
          onMouseLeave={handleSectionLeave}
        />

        {/* Level 1 - Center Circle (Always Green) */}
        <circle
          cx="278"
          cy="278"
          r="49"
          fill={centerColor}
          stroke="#009990"
          strokeWidth="1.84331"
        />

        <text x="277" y="350" fill="#6A6C72" textAnchor="middle" fontSize={isMobile ? '12' : '14'}>
          {getSectionLabel('motive')}
        </text>

        {/* Clip path for trait section */}
        <defs>
          <clipPath id="clip0_6_6645">
            <rect
              width="368.664"
              height="136.406"
              fill="white"
              transform="translate(93.165 325.422)"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Tooltip positioned based on hovered section */}
      {activeSection && (
        <div
          className="absolute z-10 w-64 rounded-md border bg-white p-4 shadow-md transition-all duration-300"
          style={tooltipPositions[activeSection as keyof typeof tooltipPositions]}
        >
          <h4 className="mb-2 font-semibold">{getSectionLabel(activeSection)}</h4>
          <p className="text-sm text-muted-foreground">
            {getSectionDescription(activeSection) ||
              'This section represents an important aspect of your blindspots.'}
          </p>
          {getBlindspot(activeSection) && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Weight: </span>
              {getBlindspot(activeSection)?.weight}%
            </div>
          )}
        </div>
      )}
    </div>
  );
}
