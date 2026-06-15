import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, Film, DollarSign, Activity, ArrowUpRight, 
  Calendar, ShieldCheck, Download, RefreshCw, Info
} from 'lucide-react';

export default function AdminDashboard() {
  const { accent } = useTheme();

  // Active chart timeline filters
  const [activeChartTag, setActiveChartTag] = useState('6m');

  // Interactive Hover states for SVG charts
  const [hoveredLineIndex, setHoveredLineIndex] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [hoveredDonutIndex, setHoveredDonutIndex] = useState(null);

  const stats = [
    { label: 'Total Syncers', value: '1,242,850', growth: '+12.4%', icon: Users, color: 'text-brand-purple bg-brand-purple/10' },
    { label: 'Movie Catalog', value: '12,854 films', growth: '+4.2%', icon: Film, color: 'text-brand-cyan bg-brand-cyan/10' },
    { label: 'Monthly Revenue', value: '$242,500', growth: '+18.1%', icon: DollarSign, color: 'text-green-400 bg-green-400/10' },
    { label: 'Active Sessions', value: '84,950 syncs', growth: '+22.5%', icon: Activity, color: 'text-amber-400 bg-amber-400/10' },
  ];

  // User growth line chart coordinates
  const linePoints = [
    { x: 50, y: 160, month: 'JAN', value: '120K signups', tooltip: 'January: 120,400 new users joined' },
    { x: 130, y: 122, month: 'FEB', value: '380K signups', tooltip: 'February: 382,100 new users joined' },
    { x: 210, y: 138, month: 'MAR', value: '290K signups', tooltip: 'March: 294,500 new users joined' },
    { x: 290, y: 95, month: 'APR', value: '620K signups', tooltip: 'April: 624,900 new users joined' },
    { x: 370, y: 65, month: 'MAY', value: '890K signups', tooltip: 'May: 890,200 new users joined' },
    { x: 450, y: 40, month: 'JUN', value: '1.2M signups', tooltip: 'June: 1,242,850 new users joined' },
  ];

  // Region subscriber bar heights
  const barData = [
    { label: 'N.A', x: 45, y: 50, w: 22, h: 110, value: '55%', count: '683,500 subscribers', color: '#8b5cf6' },
    { label: 'E.U', x: 95, y: 80, w: 22, h: 80, value: '40%', count: '497,100 subscribers', color: '#06b6d4' },
    { label: 'APAC', x: 145, y: 30, w: 22, h: 130, value: '65%', count: '807,250 subscribers', color: '#10b981' }
  ];

  // Donut chart categories
  const donutData = [
    { label: 'Sci-Fi', percent: 50, color: 'bg-[#8b5cf6]', text: '#8b5cf6', dash: '50 50', offset: '0', detail: 'Sci-Fi: 621,425 sessions logged' },
    { label: 'Action', percent: 30, color: 'bg-[#06b6d4]', text: '#06b6d4', dash: '30 70', offset: '-50', detail: 'Action: 372,855 sessions logged' },
    { label: 'Drama', percent: 20, color: 'bg-[#e50914]', text: '#e50914', dash: '20 80', offset: '-80', detail: 'Drama: 248,570 sessions logged' }
  ];

  const accentColor = accent === 'purple' ? '#8b5cf6' : '#06b6d4';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccent = accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan text-black';

  return (
    <div className="space-y-8 animate-fade-in pb-16 relative">
      
      {/* Background spotlights */}
      <div className="absolute top-[300px] right-[-50px] w-96 h-96 rounded-full bg-brand-cyan/3 blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <span className="text-[9px] bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
            🛡️ CONTROL PANEL
          </span>
          <h1 className="text-3xl font-black text-white mt-2 flex items-center gap-2">
            CineVerse Telemetry Node
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time server telemetry, user metrics, database queries, and fiscal ledger tracking.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-gray-400 hover:text-white transition cursor-pointer">
            <RefreshCw className="h-4 w-4" /> Reset Logs
          </button>
          <button className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${bgAccent} hover:opacity-95`}>
            <Download className="h-4 w-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(card => {
          const CardIcon = card.icon;
          return (
            <div key={card.label} className="glass-card apple-border rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{card.label}</span>
                  <span className="text-2xl font-black text-white block mt-1.5">{card.value}</span>
                </div>
                <div className={`rounded-xl p-2.5 ${card.color}`}>
                  <CardIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-green-400">
                <span>{card.growth}</span>
                <span className="text-gray-500 font-medium text-[9px] lowercase">vs last cycle</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Line Chart */}
        <div className="lg:col-span-2 glass-card apple-border rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">User Acquisition Curve</h3>
              <span className="text-[10px] text-gray-500">Signups recorded over the last two quarters</span>
            </div>
            
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-0.5 text-[9px] text-gray-400 font-bold">
              {['3m', '6m', '1y'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveChartTag(tag)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeChartTag === tag 
                      ? accent === 'purple' ? 'bg-brand-purple text-white shadow' : 'bg-brand-cyan text-black shadow'
                      : 'hover:text-white'
                  }`}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Custom SVG Line Chart with Tooltip State */}
          <div className="relative pt-4 h-64 w-full">
            
            {/* Interactive Tooltip Overlay */}
            {hoveredLineIndex !== null && (
              <div className="absolute top-2 left-10 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white shadow-2xl flex items-center gap-1.5 z-20 animate-fade-in">
                <Info className="h-3.5 w-3.5 text-brand-purple" />
                <span>{linePoints[hoveredLineIndex].tooltip}</span>
              </div>
            )}

            <svg viewBox="0 0 500 200" className="w-full h-full select-none">
              {/* Grids */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3" />
              
              {/* Axes values */}
              <text x="15" y="24" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">1.2M</text>
              <text x="15" y="69" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">800K</text>
              <text x="15" y="114" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">400K</text>
              <text x="15" y="159" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">100K</text>

              {/* Chart Line Wave */}
              <path
                d="M 50 160 Q 120 120 180 140 T 320 80 T 450 40"
                fill="none"
                stroke={accentColor}
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Shading fill */}
              <path
                d="M 50 160 Q 120 120 180 140 T 320 80 T 450 40 L 450 170 L 50 170 Z"
                fill={`url(#line-gradient-${accent})`}
                opacity="0.12"
              />

              {/* Plot points circles with interactive triggers */}
              {linePoints.map((point, index) => (
                <g 
                  key={index}
                  onMouseEnter={() => setHoveredLineIndex(index)}
                  onMouseLeave={() => setHoveredLineIndex(null)}
                  className="cursor-pointer"
                >
                  {/* Invisible larger hover trigger circle */}
                  <circle cx={point.x} cy={point.y} r="12" fill="transparent" />
                  
                  {/* Visual plot point circle */}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={hoveredLineIndex === index ? '7' : '4'} 
                    fill="#fff" 
                    stroke={accentColor} 
                    strokeWidth="2.5" 
                    className="transition-all duration-200"
                  />
                </g>
              ))}

              {/* Month labels */}
              {linePoints.map((point, idx) => (
                <text 
                  key={idx} 
                  x={point.x - 8} 
                  y="185" 
                  fill={hoveredLineIndex === idx ? 'white' : 'rgba(255,255,255,0.4)'} 
                  fontSize="8" 
                  fontWeight="bold"
                  className="transition duration-200"
                >
                  {point.month}
                </text>
              ))}

              <defs>
                <linearGradient id="line-gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="line-gradient-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Region Revenue Bar Chart */}
        <div className="glass-card apple-border rounded-3xl p-6 space-y-4 shadow-xl relative">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Demographic Metrics</h3>
            <span className="text-[10px] text-gray-500">Subscribers share by territory</span>
          </div>

          {/* Interactive Tooltip for bars */}
          {hoveredBarIndex !== null && (
            <div className="absolute top-1 left-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white text-center shadow-2xl z-20 animate-fade-in">
              {barData[hoveredBarIndex].count}
            </div>
          )}

          {/* Interactive Custom SVG Bar Chart */}
          <div className="h-64 pt-2">
            <svg viewBox="0 0 200 200" className="w-full h-full select-none">
              <line x1="30" y1="160" x2="190" y2="160" stroke="rgba(255,255,255,0.05)" />
              <line x1="30" y1="110" x2="190" y2="110" stroke="rgba(255,255,255,0.03)" />
              <line x1="30" y1="60" x2="190" y2="60" stroke="rgba(255,255,255,0.03)" />
              
              {/* Bars with mouse interactions */}
              {barData.map((bar, index) => (
                <rect 
                  key={index}
                  x={bar.x} 
                  y={bar.y} 
                  width={bar.w} 
                  height={bar.h} 
                  rx="4" 
                  fill={bar.color} 
                  opacity={hoveredBarIndex === index ? '1' : '0.8'} 
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  style={{
                    filter: hoveredBarIndex === index ? `drop-shadow(0 0 8px ${bar.color})` : 'none'
                  }}
                />
              ))}

              {/* Labels */}
              {barData.map((bar, idx) => (
                <text 
                  key={idx} 
                  x={bar.x + 3} 
                  y="175" 
                  fill={hoveredBarIndex === idx ? 'white' : 'rgba(255,255,255,0.5)'} 
                  fontSize="8" 
                  fontWeight="bold"
                  className="transition duration-200"
                >
                  {bar.label}
                </text>
              ))}

              {/* Percent values */}
              {barData.map((bar, idx) => (
                <text 
                  key={idx} 
                  x={bar.x + 2} 
                  y={bar.y - 6} 
                  fill="white" 
                  fontSize="7" 
                  fontWeight="black"
                >
                  {bar.value}
                </text>
              ))}
            </svg>
          </div>
        </div>

      </div>

      {/* Donut Chart & Telemetry Status logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Donut Chart */}
        <div className="glass-card apple-border rounded-3xl p-6 space-y-4 shadow-xl relative">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Genre Market Share</h3>
            <span className="text-[10px] text-gray-500">Breakdown of most watched genres</span>
          </div>

          {/* Interactive Donut details */}
          {hoveredDonutIndex !== null && (
            <div className="absolute top-1 left-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-bold text-white text-center shadow-2xl z-20 animate-fade-in">
              {donutData[hoveredDonutIndex].detail}
            </div>
          )}

          <div className="flex items-center gap-4 h-48 justify-center">
            {/* Custom SVG Donut Chart */}
            <svg width="120" height="120" viewBox="0 0 42 42" className="transform -rotate-90 select-none">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4.5" />
              
              {donutData.map((seg, idx) => (
                <circle 
                  key={idx}
                  cx="21" 
                  cy="21" 
                  r="15.915" 
                  fill="transparent" 
                  stroke={seg.text} 
                  strokeWidth={hoveredDonutIndex === idx ? '5.5' : '4.5'} 
                  strokeDasharray={seg.dash} 
                  strokeDashoffset={seg.offset}
                  onMouseEnter={() => setHoveredDonutIndex(idx)}
                  onMouseLeave={() => setHoveredDonutIndex(null)}
                  className="cursor-pointer transition-all duration-200"
                />
              ))}
            </svg>

            {/* Legend */}
            <div className="space-y-2.5 text-xs">
              {donutData.map((seg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-1.5 cursor-pointer transition ${
                    hoveredDonutIndex === idx ? 'translate-x-1 text-white font-bold' : 'text-gray-400'
                  }`}
                  onMouseEnter={() => setHoveredDonutIndex(idx)}
                  onMouseLeave={() => setHoveredDonutIndex(null)}
                >
                  <span className={`h-2.5 w-2.5 rounded-full`} style={{ backgroundColor: seg.text }} />
                  <span>{seg.label} ({seg.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Server Telemetry System logs */}
        <div className="lg:col-span-2 glass-card apple-border rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <ShieldCheck className="h-4.5 w-4.5 text-green-400" /> Infrastructure Node Telemetry
            </h3>
            <span className="text-[10px] text-gray-500">Live query logs and system diagnostics</span>
          </div>

          <div className="space-y-3 font-mono text-[9px] text-gray-400 bg-black/40 border border-white/5 p-4 rounded-2xl h-44 overflow-y-auto">
            <div className="flex justify-between">
              <span className="text-green-400">[OK] microservices.sync-room-gateway:8080 initialized</span>
              <span className="text-gray-600">01:58:01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">[OK] database.cineverse-replica-01:5432 synced (0.24ms)</span>
              <span className="text-gray-600">01:58:08</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">[OK] cache.redis-sessions-node:6379 active. 142K keys logged.</span>
              <span className="text-gray-600">01:58:15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-purple font-bold">[AI] recommendation-engine: computed matching vectors for 12,502 syncers.</span>
              <span className="text-gray-600">01:58:24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-500">[WARN] load-balancer-west: traffic spike (78% threshold hit)</span>
              <span className="text-gray-600">01:58:40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">[OK] billing.stripe-webhook-gateway online</span>
              <span className="text-gray-600">01:58:44</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
