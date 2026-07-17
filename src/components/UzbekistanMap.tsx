import { cities } from '../data/content'

/** Real Uzbekistan outline from GeoJSON (equirectangular) */
const UZ_PATH =
  'M613.6,624.0 L615.1,579.1 L540.6,547.6 L482.0,511.7 L445.4,477.1 L381.3,426.4 L353.7,350.6 L334.9,337.3 L274.3,340.7 L252.9,325.6 L246.9,267.0 L171.3,228.2 L124.1,270.9 L76.2,296.2 L85.4,333.2 L22.2,334.2 L20.0,63.4 L164.3,20.0 L174.8,26.4 L261.6,79.0 L307.5,106.7 L361.1,172.9 L426.8,162.2 L522.9,156.5 L590.0,210.2 L585.8,283.8 L613.1,284.3 L624.5,344.5 L695.8,346.9 L711.2,381.7 L732.1,381.2 L756.6,328.7 L830.5,277.5 L862.7,263.9 L879.3,271.1 L832.3,318.7 L873.6,346.3 L913.6,328.0 L980.0,366.7 L908.2,419.6 L865.6,412.4 L842.4,414.3 L834.4,393.9 L846.1,359.8 L771.1,376.9 L753.3,424.0 L726.7,464.6 L679.9,461.1 L665.4,493.5 L706.5,511.0 L718.6,565.7 L687.1,640.0 L644.8,624.5 L613.6,624.0 Z'

const BOUNDS = {
  minLon: 55.928917,
  maxLon: 73.055417,
  minLat: 37.144994,
  maxLat: 45.586804,
  width: 1000,
  height: 660,
  pad: 20,
}

function project(lon: number, lat: number) {
  const { minLon, maxLon, minLat, maxLat, width, height, pad } = BOUNDS
  const x = pad + ((lon - minLon) / (maxLon - minLon)) * (width - 2 * pad)
  const y = pad + ((maxLat - lat) / (maxLat - minLat)) * (height - 2 * pad)
  return { x, y }
}

const LABELED = new Set([
  'Tashkent',
  'Samarkand',
  'Bukhara',
  'Namangan',
  'Andijan',
  'Nukus',
  'Termez',
  'Khiva',
])

export function UzbekistanMap() {
  return (
    <div className="glass-light relative mx-auto aspect-[1000/660] max-w-5xl overflow-hidden rounded-[1.75rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,190,188,0.1),transparent_65%)]" />

      <svg
        viewBox={`0 0 ${BOUNDS.width} ${BOUNDS.height}`}
        className="h-full w-full"
        role="img"
        aria-label="Map of Uzbekistan showing ILM Hub participant cities"
      >
        <defs>
          <linearGradient id="uz-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 58, 138, 0.55)" />
            <stop offset="55%" stopColor="rgba(3, 61, 149, 0.45)" />
            <stop offset="100%" stopColor="rgba(24, 190, 188, 0.25)" />
          </linearGradient>
          <filter id="uz-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#18bebc"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        <g opacity="0.12" stroke="white" strokeWidth="0.6">
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 90}
              y1="0"
              x2={(i + 1) * 90}
              y2={BOUNDS.height}
            />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i + 1) * 90}
              x2={BOUNDS.width}
              y2={(i + 1) * 90}
            />
          ))}
        </g>

        <path
          d={UZ_PATH}
          fill="url(#uz-fill)"
          stroke="#18bebc"
          strokeWidth="2.5"
          filter="url(#uz-glow)"
        />
        <path
          d={UZ_PATH}
          fill="none"
          stroke="#f6c744"
          strokeWidth="0.8"
          strokeOpacity="0.35"
        />

        <text
          x="40"
          y="48"
          fill="rgba(24,190,188,0.9)"
          fontSize="22"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="600"
          letterSpacing="3"
        >
          UZBEKISTAN
        </text>

        {cities.map((city, i) => {
          const { x, y } = project(city.lon, city.lat)
          return (
            <g key={city.name}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="rgba(246,199,68,0.2)"
                className="origin-center animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#f6c744"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              <title>{city.name}</title>
              {LABELED.has(city.name) && (
                <text
                  x={x + 10}
                  y={y + 4}
                  fill="rgba(255,255,255,0.88)"
                  fontSize="13"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="500"
                >
                  {city.name}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
