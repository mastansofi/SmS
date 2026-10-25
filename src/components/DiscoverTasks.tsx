import React, { useState } from 'react';
import { ScreenId } from './BottomNav';

interface DiscoverTasksProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTask?: (taskId: string) => void;
}

export const DiscoverTasks: React.FC<DiscoverTasksProps> = ({ onNavigate, onSelectTask }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [radiusMiles, setRadiusMiles] = useState(5);
  const [selectedBudget, setSelectedBudget] = useState('$100+');
  const [sortBy, setSortBy] = useState('closest');
  const [activeFilterChips, setActiveFilterChips] = useState<string[]>(['within-5', 'escrow']);

  const toggleFilterChip = (chipId: string) => {
    setActiveFilterChips((prev) =>
      prev.includes(chipId) ? prev.filter((id) => id !== chipId) : [...prev, chipId]
    );
  };

  const tasks = [
    {
      id: 'task-electrical',
      pinId: 'pin-180',
      title: 'Emergency Electrical Breaker Tripping',
      description: 'Main panel switch tripped after microwave surge. Need a licensed electrician or certified technician to test voltage and reset safely.',
      category: 'Trades',
      badge: 'URGENT DISPATCH',
      badgeType: 'urgent',
      timeAgo: '12m ago',
      distance: '0.8 mi away',
      schedule: 'Immediate / Today',
      price: '$180',
      priceType: 'Fixed Fee',
      buttonLabel: 'Instant Bid',
      buttonStyle: 'bg-[#006c4a] text-white',
      posterName: 'Marcus V.',
      posterRating: '4.9',
      posterReviews: '28 reviews',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9pcbfzEYX2qQnB63l8DKaVmANhbhWVp017tj73RSEjeZ7VwOq3WnnV0Y_KkkXFDiL-mDe3_3P8sLQ2fi9npjckKh4l3gvwKxSuZTe23mN-cglxjo3hr8FfNZdREHQXAbggtalMynu9E8Q4Pj5umwhFYZRho1O4xy_HJGsiqxXi3LE9GSEHzscNwnEkckUqTYO31JILvWpe6LCzOqkDMSsWLY2tlU7ICfBoGL_K5KsjOhe-g1gV7F5',
    },
    {
      id: 'task-wardrobe',
      pinId: 'pin-240',
      title: 'Assemble Custom Walnut Wardrobe & Desk',
      description: 'Flat-pack 3-door modular wardrobe and floating hardwood desk setup. Hardware provided; bring your own power drill and level.',
      category: 'Carpentry & Assembly',
      badge: 'Direct Request',
      badgeType: 'verified',
      timeAgo: '45m ago',
      distance: '2.1 mi • Zilker',
      schedule: 'Flexible Today / Eve',
      price: '$240',
      priceType: 'Escrow Hold',
      buttonLabel: 'Quick Bid',
      buttonStyle: 'bg-black text-white',
      posterName: 'Elena R.',
      posterRating: '4.8',
      posterReviews: '14 reviews',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL_q3h67zMAzFXmRdhOHXu2OHu4YvNEAeBe65OVbCaLbN8kaH6OWOh-kBFn3OrZGjL_w3aT7jAYEGhOORI-wpv27Lpni7NW9GZb8EphzuLg4PyChap3ux852lE9UI961zJmYD08dFXbsep9UowMMImZdn94gnrAKoFK9n7Lc7D_940QAuqn_gPlKivNPDNaNTC9-dnh_qRqUMIiNtZItera5c3KWpKQJg-poDVokjDghhlV4AmBAZJ',
    },
    {
      id: 'task-espresso',
      pinId: 'pin-160',
      title: 'Cafe Espresso Machine Descaling & Gaskets',
      description: 'La Marzocco Linea 2-group requires full citric descaling cycle, grouphead gasket replacement, and portafilter pressure test before opening.',
      category: 'Commercial Maintenance',
      badge: 'Verified Business',
      badgeType: 'business',
      timeAgo: '2h ago',
      distance: '3.4 mi • East Austin',
      schedule: 'Tomorrow 6:30 AM',
      price: '$160',
      priceType: '+ Materials',
      buttonLabel: 'Quick Bid',
      buttonStyle: 'bg-black text-white',
      posterName: 'Birdie Coffee Roasters',
      posterRating: '5.0',
      posterReviews: '63 tasks paid',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUgz6CprG47D7r12Pt4pBbT4TrM8Oma1JAR7EfDG6_Sra3UU-RrXZ_7AH59zkDm3f0OOnuXvPQFTMeZx1M0xsZmUF2wWivwyEkg6Y_MC-s4yJaawJP0wIi5lTWVl2fGgFFjAw0j37GugSv8VdhGlrdmFY4DKQu4usYlpCS8EdisAm5rV1HFVA0zicoFPFae6pMmCIWeK7c98evNFH1no80KWWwzng8jP8mWCE1DcixAqPjxA1ePCRC',
    },
    {
      id: 'task-model',
      pinId: 'pin-55',
      title: 'Urgent Fragile Architectural Model Delivery',
      description: 'Need a car or SUV driver with level trunk to transport a 36x24 acrylic building scale model from campus studio to client office downtown.',
      category: 'Courier / Hand Carry',
      badge: 'DUE IN 90 MINS',
      badgeType: 'urgent',
      timeAgo: '5m ago',
      distance: '1.5 mi total route',
      schedule: 'Pickup by 2:15 PM',
      price: '$55',
      priceType: 'Fixed Trip',
      buttonLabel: 'Accept Run',
      buttonStyle: 'bg-[#006c4a] text-white',
      posterName: 'Devon C.',
      posterRating: '4.7',
      posterReviews: '9 reviews',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw9NpMELRi8U-9NWoHLWFuoTRIADW11ETnGefiOoGPA_fgw4eD1s61X4OpPQE2wbEdHquJjYPCHle3G1QvwtSUGA8POZdy9SswYtZxXCTwEcG7_N6VsO3JC2jHOOLnq3TOKBoYaJtEyTkMm0gleRIlZlj7_IFC3gvj-QlvlZgLAgmR3KIS0zNfoTu4d3KYJAjWiWa3qTYuTwI3Xr944BeOU8m6qo1yBtQ7LGpQUHdGGTmINXlP0Vqn',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto">
      {/* Top Search & Discovery Controls (Sticky) */}
      <section className="sticky top-16 z-30 bg-[#f8f9ff]/95 backdrop-blur-md px-4 pt-2 pb-3 space-y-2 border-b border-[#e5eeff]">
        {/* Search Bar with Voice Assist & Filter trigger */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center bg-white rounded-xl shadow-xs px-3 h-12 border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[#45464d] text-[22px]">search</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nearby tasks, tools, skills..."
              className="w-full bg-transparent px-2 text-[14px] text-[#0b1c30] placeholder:text-[#45464d]/70 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchQuery('Plumbing Emergency')}
              aria-label="Voice Search"
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#45464d] hover:text-[#006c4a] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open Filter Drawer"
            className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#dce9ff] text-[#0b1c30] active:scale-95 transition-transform shadow-xs hover:bg-[#cbdbf5]"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>

        {/* Segmented View Toggle: List vs Map */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center bg-[#dce9ff] p-0.5 rounded-full w-full max-w-[240px]">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#0b1c30] shadow-sm'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_agenda</span>
              List View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-[#0b1c30] shadow-sm'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              Map Radar
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#006c4a]/10 px-3 py-1.5 rounded-full border border-[#006c4a]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c4a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c4a]"></span>
            </span>
            <span className="text-xs text-[#006c4a] font-semibold whitespace-nowrap">48 Live Nearby</span>
          </div>
        </div>

        {/* Horizontal Scrolling Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          <button
            type="button"
            onClick={() => toggleFilterChip('within-5')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shadow-sm transition-all ${
              activeFilterChips.includes('within-5')
                ? 'bg-black text-white font-bold'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">near_me</span>
            Within {radiusMiles} mi
          </button>
          <button
            type="button"
            onClick={() => toggleFilterChip('escrow')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
              activeFilterChips.includes('escrow')
                ? 'bg-[#85f8c4] text-[#002114] font-bold border border-[#006c4a]'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-[#006c4a]">verified_user</span>
            Escrow Secured ($)
          </button>
          <button
            type="button"
            onClick={() => toggleFilterChip('urgent')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
              activeFilterChips.includes('urgent')
                ? 'bg-[#ffb95f] text-[#2a1700] font-bold'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-[#b87500]">bolt</span>
            Urgent (&lt; 2h)
          </button>
          <button
            type="button"
            onClick={() => toggleFilterChip('trades')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
              activeFilterChips.includes('trades')
                ? 'bg-[#dce9ff] text-[#0b1c30] font-bold'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">handyman</span>
            Trades / Skilled
          </button>
          <button
            type="button"
            onClick={() => toggleFilterChip('instant')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
              activeFilterChips.includes('instant')
                ? 'bg-[#85f8c4] text-[#002114] font-bold'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">payments</span>
            Instant Payout
          </button>
        </div>
      </section>

      {/* Dynamic Proximity Radar / Stylized Mini-Map View */}
      <section className="px-4 mt-3" id="mapRadarSection">
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-[#dce9ff] shadow-md border border-[#cbdbf5]">
          {/* Map Background */}
          <div
            className="w-full h-full bg-cover bg-center filter contrast-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYw7zGNCUnrVrG8OwETBasqHrdYsp6HLoD6Ojatf8gAUkwn94OhjYu9yIRL8P5gz6qEiVmL4kCGfsXm5jGk2tUo6svCqPlJjhEqA_Kq9PQYS4cURy5FlbnuyHoDxfhtm8eh6TPnJ5_1X6b7JpotM6v7tUNeZjFKp9iDhpFfj3dbgG0hreGKuACt0eYJT6ieXmkpq1q6vjwCCxyJyrESLgMYWQa-VxJdNwqL98dzbnwGDLNIO_Ybr3o')`,
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#213145]/80 via-transparent to-transparent pointer-events-none" />

          {/* Radar Pulse Centered on Worker Location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-[#006c4a]/40 animate-ping opacity-40"></div>
            <div className="absolute w-24 h-24 rounded-full border border-[#006c4a]/60 bg-[#006c4a]/10"></div>
            <div className="absolute w-5 h-5 rounded-full bg-[#006c4a] flex items-center justify-center shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>

          {/* Interactive Pin 1: $180 */}
          <button
            type="button"
            onClick={() => setSelectedPin(selectedPin === 'pin-180' ? null : 'pin-180')}
            className={`absolute top-8 left-1/4 -translate-x-1/2 flex flex-col items-center cursor-pointer transition-transform ${
              selectedPin === 'pin-180' ? 'scale-110 z-20' : 'hover:scale-105'
            }`}
          >
            <div className="px-2 py-1 rounded-full bg-[#131b2e] text-white shadow-lg text-[13px] font-bold flex items-center gap-1 border border-[#85f8c4]">
              <span className="text-[#85f8c4] text-[11px]">$</span>180
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            </div>
            <div className="w-2 h-2 bg-[#131b2e] rotate-45 -mt-1 border-r border-b border-[#85f8c4]"></div>
          </button>

          {/* Interactive Pin 2: $240 */}
          <button
            type="button"
            onClick={() => setSelectedPin(selectedPin === 'pin-240' ? null : 'pin-240')}
            className={`absolute top-12 right-1/4 translate-x-1/2 flex flex-col items-center cursor-pointer transition-transform ${
              selectedPin === 'pin-240' ? 'scale-110 z-20' : 'hover:scale-105'
            }`}
          >
            <div className="px-2.5 py-1 rounded-full bg-[#131b2e] text-white shadow-lg text-[13px] font-bold flex items-center gap-1 border border-[#85f8c4]">
              <span className="text-[#85f8c4] text-[11px]">$</span>240
            </div>
            <div className="w-2 h-2 bg-[#131b2e] rotate-45 -mt-1 border-r border-b border-[#85f8c4]"></div>
          </button>

          {/* Interactive Pin 3: $160 */}
          <button
            type="button"
            onClick={() => setSelectedPin(selectedPin === 'pin-160' ? null : 'pin-160')}
            className={`absolute bottom-14 left-1/5 flex flex-col items-center cursor-pointer transition-transform ${
              selectedPin === 'pin-160' ? 'scale-110 z-20' : 'hover:scale-105'
            }`}
          >
            <div className="px-2 py-1 rounded-full bg-[#131b2e] text-white shadow-lg text-[13px] font-bold flex items-center gap-1 border border-[#85f8c4]">
              <span className="text-[#85f8c4] text-[11px]">$</span>160
            </div>
            <div className="w-2 h-2 bg-[#131b2e] rotate-45 -mt-1 border-r border-b border-[#85f8c4]"></div>
          </button>

          {/* Interactive Pin 4: $55 */}
          <button
            type="button"
            onClick={() => setSelectedPin(selectedPin === 'pin-55' ? null : 'pin-55')}
            className={`absolute bottom-16 right-1/5 flex flex-col items-center cursor-pointer transition-transform ${
              selectedPin === 'pin-55' ? 'scale-110 z-20' : 'hover:scale-105'
            }`}
          >
            <div className="px-2 py-1 rounded-full bg-[#131b2e] text-white shadow-lg text-[13px] font-bold flex items-center gap-1 border border-[#85f8c4]">
              <span className="text-[#85f8c4] text-[11px]">$</span>55
            </div>
            <div className="w-2 h-2 bg-[#131b2e] rotate-45 -mt-1 border-r border-b border-[#85f8c4]"></div>
          </button>

          {/* Map Overlay HUD Controls */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[16px]">radar</span>
              <span className="text-xs text-[#0b1c30] font-semibold">
                Austin Metro • {radiusMiles} mi Radius
              </span>
            </div>
            <div className="flex bg-white/90 backdrop-blur-md p-0.5 rounded-full shadow-sm border border-[#e5eeff]">
              <button
                type="button"
                className="px-2.5 py-0.5 rounded-full bg-black text-white text-xs font-semibold"
              >
                Now
              </button>
              <button
                type="button"
                className="px-2.5 py-0.5 rounded-full text-[#45464d] text-xs hover:text-[#0b1c30]"
              >
                Scheduled
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Earn Micro-Banner */}
      <section className="px-4 mt-3">
        <div
          onClick={() => onNavigate('flight-deck')}
          className="bg-gradient-to-r from-[#006c4a]/15 via-[#006c4a]/5 to-[#dce9ff] rounded-2xl p-3 flex items-center justify-between gap-2 border border-[#82f5c1]/50 shadow-xs cursor-pointer hover:border-[#006c4a] transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#006c4a] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-[15px] text-[#0b1c30] font-bold leading-tight truncate">
                  Earn ~$38/hr
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#85f8c4] text-[#002114] text-[10px] font-bold">
                  Austin Peak
                </span>
              </div>
              <p className="text-[12px] text-[#45464d] truncate">
                Turn idle hours into instant bank liquidity today.
              </p>
            </div>
          </div>
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0b1c30] shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </div>
      </section>

      {/* Quick Sort & Results Metadata */}
      <section className="px-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-headline text-[16px] text-[#0b1c30] font-bold">Open Tasks</span>
          <span className="text-xs text-[#45464d] bg-[#dce9ff] px-2 py-0.5 rounded-full font-semibold">
            {tasks.length} Active
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#45464d] text-xs bg-[#eff4ff] px-2.5 py-1.5 rounded-lg border border-[#e5eeff]">
          <span className="material-symbols-outlined text-[16px]">sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#0b1c30] text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="closest">Closest Distance</option>
            <option value="payout">Highest Payout</option>
            <option value="newest">Newest First</option>
            <option value="urgency">Urgency Priority</option>
          </select>
        </div>
      </section>

      {/* Curated Task Listings Feed */}
      <section className="px-4 mt-3 space-y-3">
        {tasks.map((task) => {
          const isHighlighted = selectedPin === task.pinId;
          return (
            <article
              key={task.id}
              onClick={() => {
                onSelectTask?.(task.id);
                onNavigate('post-task-offer');
              }}
              className={`bg-white rounded-2xl p-4 shadow-sm transition-all border cursor-pointer ${
                isHighlighted
                  ? 'border-[#006c4a] ring-2 ring-[#006c4a]/20 shadow-md'
                  : 'border-[#e5eeff] hover:border-[#cbdbf5] hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-1.5">
                  {task.badgeType === 'urgent' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                      {task.badge}
                    </span>
                  )}
                  {task.badgeType === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      {task.badge}
                    </span>
                  )}
                  {task.badgeType === 'business' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#131b2e] text-white text-[10px] font-semibold">
                      <span className="material-symbols-outlined text-[12px] text-[#85f8c4]">domain</span>
                      {task.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[10px] text-[#45464d] font-semibold">
                    {task.category}
                  </span>
                </div>
                <span className="text-[11px] text-[#45464d]">{task.timeAgo}</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-headline text-[16px] text-[#0b1c30] font-bold leading-snug">
                  {task.title}
                </h3>
                <p className="text-[13px] text-[#45464d] line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2.5 text-xs text-[#45464d]">
                <div className="flex items-center gap-1 text-[#006c4a] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{task.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#45464d]">schedule</span>
                  <span>{task.schedule}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#eff4ff] px-2 py-0.5 rounded text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[13px] text-[#006c4a]">lock</span>
                  <span className="text-[11px] font-semibold">Funds In Escrow</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#eff4ff] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={task.posterAvatar}
                    alt={task.posterName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#e5eeff]"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[#0b1c30] font-semibold truncate">
                      {task.posterName}
                    </span>
                    <div className="flex items-center gap-1 text-[#45464d] text-[11px]">
                      <span className="material-symbols-outlined text-[13px] text-amber-500 fill-1">star</span>
                      <span className="font-bold text-[#0b1c30]">{task.posterRating}</span>
                      <span>({task.posterReviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="font-headline text-[18px] text-[#006c4a] font-black leading-none block">
                      {task.price}
                    </span>
                    <span className="text-[10px] text-[#45464d]">{task.priceType}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTask?.(task.id);
                      onNavigate('post-task-offer');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all ${task.buttonStyle}`}
                  >
                    {task.buttonLabel}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Slide-Up Quick Filter Drawer Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 rounded-full bg-[#cbdbf5] mx-auto cursor-pointer" onClick={() => setIsFilterOpen(false)} />

            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c4a]">tune</span>
                <h4 className="font-headline text-[16px] text-[#0b1c30] font-bold">Discover Filters</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="text-[#45464d] hover:text-[#0b1c30] p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Radius Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0b1c30]">Maximum Proximity</span>
                <span className="font-bold text-[#006c4a]">{radiusMiles} miles</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={radiusMiles}
                onChange={(e) => setRadiusMiles(Number(e.target.value))}
                className="w-full accent-[#006c4a] h-2 bg-[#eff4ff] rounded-lg cursor-pointer"
              />
            </div>

            {/* Minimum Budget Range */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#0b1c30]">Minimum Task Budget</span>
              <div className="grid grid-cols-4 gap-2">
                {['Any', '$50+', '$100+', '$250+'].map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setSelectedBudget(budget)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedBudget === budget
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Security & Guarantee Checkboxes */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#0b1c30]">Security & Guarantee</span>
              <div className="space-y-2 text-xs text-[#0b1c30]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#006c4a] accent-[#006c4a]" />
                  <span>Escrow Locked Only (100% Payout Guaranteed)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#006c4a] accent-[#006c4a]" />
                  <span>Verified ID Posters Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#006c4a] accent-[#006c4a]" />
                  <span>Immediate Auto-Dispatch (No Proposal Waiting)</span>
                </label>
              </div>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="pt-2 border-t border-[#eff4ff] flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRadiusMiles(5);
                  setSelectedBudget('$100+');
                }}
                className="flex-1 py-3 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#cbdbf5] transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#006c4a] text-white text-xs font-bold shadow-md hover:bg-[#00714e] transition-colors"
              >
                Apply (48 Tasks)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
