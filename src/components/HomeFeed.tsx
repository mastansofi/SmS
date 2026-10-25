import React, { useState } from 'react';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ScreenId } from './BottomNav';

interface HomeFeedProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTask?: (taskId: string) => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({ onNavigate, onSelectTask }) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'worker'>('poster');
  const [urgentFilterActive, setUrgentFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: 'household', label: 'Household', count: '340 tasks', icon: 'home_repair_service', color: 'text-[#006c4a]' },
    { id: 'trades', label: 'Trades', count: '192 tasks', icon: 'plumbing', color: 'text-[#b87500]' },
    { id: 'delivery', label: 'Delivery', count: '215 tasks', icon: 'local_shipping', color: 'text-[#006c4a]' },
    { id: 'tech', label: 'Tech & IT', count: '184 tasks', icon: 'terminal', color: 'text-[#3f465c]' },
    { id: 'office', label: 'Office Admin', count: '128 tasks', icon: 'description', color: 'text-[#0b1c30]' },
    { id: 'student', label: 'Student Gig', count: '96 tasks', icon: 'school', color: 'text-[#45464d]' },
    { id: 'retail', label: 'Retail Assist', count: '74 tasks', icon: 'storefront', color: 'text-[#006c4a]' },
    { id: 'remote', label: 'Remote', count: '310 tasks', icon: 'language', color: 'text-[#3f465c]' },
    { id: 'custom', label: 'Custom Work', count: 'Post Anything', icon: 'auto_awesome', color: 'text-white', isSpecial: true },
  ];

  const urgentTasks = [
    {
      id: 'task-1',
      title: 'Fix Leaking Kitchen Pipe & Under-sink Trap',
      description: 'P-trap is leaking beneath dual sink basin. Need licensed or experienced plumber to replace fitting before dinner service. Parts on site.',
      category: 'Skilled Trades',
      due: 'Due Today 6 PM',
      distance: '1.2 mi away',
      location: 'South Congress, Austin • Immediate Dispatch',
      budget: '$120',
      posterName: 'Sarah M.',
      posterRating: '4.9 (32 tasks posted)',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG2qrvxwNDJEYCUbfic093XcpW3_iea_s9lFqcOyzC1ff35qDOL_Fs6_J50fRcLA7a3NK0spAlmX854dMVjotPkfDtWpZwuE0NGNl9sOJjs7UPKy9vvNuX1mjiockQDGApR65Yn3aj_gx4FS6TlqA5_CnO2boNvKUB1vmHqAtoKRLXECYx3pX2gfYeNTeI19MAId6csUMX_obdDbcYjY7kGI9IhFaBOhSpsQAIM4o',
      targetScreen: 'post-task-offer' as ScreenId,
    },
    {
      id: 'task-2',
      title: 'Express Legal Document Courier to County Court',
      description: 'Pick up notarized filing packet from Downtown law firm and hand-deliver to Clerk Window 4 before the 3:30 PM court deadline.',
      category: 'Delivery',
      due: 'Urgent (Within 2 hrs)',
      dueColor: 'bg-[#ffdad6] text-[#93000a]',
      distance: '2.8 mi away',
      location: 'Downtown to Travis County Courthouse',
      budget: '$45',
      posterName: 'David K.',
      posterRating: '5.0 (89 tasks)',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoAY_9N_tvCVAk4sky9m_iBlabJjph2wBsVjobhP8-BMey-sYxueFZcoYi8lsnU4xO21KSRImXt_fT6KSUGuw0xllq1O7a63jFW6pN3rAEcCIyY_3xvNljBOdOdWgpCET-uovzQpLGD7qAJ5vUdOk5zaQIFrGNNEZEvAMV_rGCbG5j9ybb_mh2Azro10qwkqnuTZe8LFecGU4qH2cUptVSP_Efmg10Mje9WqZXmFI',
      targetScreen: 'discover' as ScreenId,
    },
    {
      id: 'task-3',
      title: 'Assemble IKEA 6-Drawer Dresser & Study Desk',
      description: 'Unopened flat-packs ready in apartment master bedroom. Allen keys provided, power drill helpful. Clean space, elevator available.',
      category: 'Household',
      due: 'Tomorrow 10 AM',
      distance: '0.9 mi away',
      location: 'East Riverside, Austin',
      budget: '$85',
      posterName: 'Elena R.',
      posterRating: '4.8 (14 tasks)',
      posterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnM8dG_brN815TbIayzDGCZKESX6yGQf60O7AU_U_v8FgWTWZEARRyjnz7YlibOdPoIa9_X6oDjmV0yAOn70CBMzyLIQMT_JQyobX65i1gcQUnDiDNgkX1m9r-zrStJ5w4EOoPshUdAilFN2rYR8FihDuF4uxkMJjMWDjInfv0W1v6Ih2kVw6AGTAeqMrYCvyMyqUenDJVWtz4_IELMwRYKrdAvla4TrzAYYU_j3o',
      targetScreen: 'post-task-offer' as ScreenId,
    },
  ];

  const faqs = [
    {
      q: 'How does the escrow payment guarantee work?',
      a: 'When you accept a worker’s bid, your funds are pre-authorized and held safely in an encrypted escrow vault. Funds are only transferred to the worker after you inspect the completed work and press "Confirm & Release".',
    },
    {
      q: 'Are workers on SmS verified?',
      a: 'Yes! Every tasker undergoes government photo ID validation and contact verification. Many carry additional background check clearance badges viewable on their profile.',
    },
    {
      q: 'What fees does SmS charge?',
      a: 'Posting tasks is 100% free. Posters pay a nominal payment processing protection fee upon completion. Workers pay a transparent low service tier which includes full insurance coverage.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Dynamic Hero & Value Proposition */}
      <section className="relative px-4 pt-3 pb-6 overflow-hidden bg-gradient-to-b from-[#dce9ff]/60 via-[#eff4ff]/40 to-[#f8f9ff]">
        {/* Ambient decorative blobs */}
        <div className="absolute -top-12 -right-8 w-44 h-44 rounded-full bg-[#85f8c4]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 -left-12 w-48 h-48 rounded-full bg-[#cbdbf5]/50 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2 max-w-lg mx-auto">
          {/* Live platform activity indicator */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white shadow-sm border border-[#e5eeff]">
            <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
            <span className="text-xs text-[#0b1c30] font-semibold tracking-wide">
              1,420 Active Tasks Nearby
            </span>
            <span className="text-[#c6c6cd] text-xs">•</span>
            <span className="text-xs text-[#006c4a] font-bold">98.4% Completed</span>
          </div>

          {/* 3D Cinematic Interactive Scene Container */}
          <div className="relative w-full rounded-2xl overflow-hidden my-1 bg-gradient-to-b from-white/70 via-[#eff4ff]/40 to-transparent border border-[#c6c6cd]/30 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#85f8c4]/20 via-sky-500/10 to-transparent pointer-events-none"></div>
            <ThreeHeroScene className="w-full h-56" />
          </div>

          {/* Main Headline & Subtitle */}
          <div className="mt-1">
            <h1 className="font-headline text-[26px] font-extrabold tracking-tight text-[#0b1c30] leading-tight">
              Every Task Has a Doer.
              <br />
              <span className="text-[#006c4a]">Find Yours on SmS.</span>
            </h1>
            <p className="text-[14px] text-[#45464d] mt-1.5 leading-relaxed">
              Post any task, discover local opportunities, and connect with verified people ready to get it done.
            </p>
          </div>

          {/* Dual Action Triggers */}
          <div className="flex items-center gap-2.5 mt-2">
            <button
              type="button"
              onClick={() => onNavigate('post-task-offer')}
              className="flex-1 h-12 px-4 rounded-xl bg-black text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px] text-[#85f8c4]">add_circle</span>
              <span>Post a Task</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="flex-1 h-12 px-4 rounded-xl bg-white text-[#0b1c30] text-[14px] font-bold flex items-center justify-center gap-2 border border-[#e5eeff] shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px] text-[#006c4a]">explore</span>
              <span>Find Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* Smart Multi-Facet Search Module */}
      <section className="px-4 -mt-2 relative z-20 max-w-lg mx-auto w-full">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#e5eeff] flex flex-col gap-2.5">
          {/* Search Input Field */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[22px] text-[#45464d]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you need done? (e.g. fix pipe, React dev)"
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#45464d]/70 text-[14px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c4a] transition-all"
            />
            <button
              type="button"
              aria-label="Voice search"
              onClick={() => setSearchQuery('Fix leaking sink faucet')}
              className="absolute right-3 text-[#45464d] hover:text-[#006c4a] p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>

          {/* Quick Location & Filter Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs hover:bg-[#e5eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006c4a]">near_me</span>
              <span className="font-semibold">Austin, TX (10 mi)</span>
              <span className="material-symbols-outlined text-[14px] text-[#45464d]">keyboard_arrow_down</span>
            </button>

            <button
              type="button"
              onClick={() => setUrgentFilterActive(!urgentFilterActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                urgentFilterActive
                  ? 'bg-[#b87500] text-white ring-2 ring-[#b87500]'
                  : 'bg-[#ffddb8] text-[#2a1700] hover:bg-[#ffb95f]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87500] animate-ping"></span>
              <span className="material-symbols-outlined text-[16px] text-[#b87500]">bolt</span>
              <span>Instant Hire</span>
            </button>
          </div>

          {/* Trending Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-xs text-[#45464d] shrink-0 font-medium">Trending:</span>
            {['🚰 Leak Repair', '📦 IKEA Assembly', '🚚 Movers Today', '💻 Remote QA'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag.replace(/^[^\s]+\s/, ''));
                  onNavigate('discover');
                }}
                className="px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#0b1c30] text-xs shrink-0 font-medium hover:bg-[#cbdbf5] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Task Categories Grid */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-headline text-[18px] font-bold text-[#0b1c30] tracking-tight">Explore Categories</h2>
            <p className="text-[12px] text-[#45464d]">Tap a field to find immediate specialists</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('discover')}
            className="text-xs font-bold text-[#006c4a] flex items-center hover:underline"
          >
            <span>All (11)</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('discover')}
              className={`p-3 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer border ${
                cat.isSpecial
                  ? 'bg-[#82f5c1]/30 border-[#006c4a]/30'
                  : 'bg-white border-[#e5eeff]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                  cat.isSpecial ? 'bg-[#006c4a] text-white' : 'bg-[#eff4ff] ' + cat.color
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
              </div>
              <span className={`text-xs font-bold line-clamp-1 ${cat.isSpecial ? 'text-[#00714e]' : 'text-[#0b1c30]'}`}>
                {cat.label}
              </span>
              <span className={`text-[11px] mt-0.5 ${cat.isSpecial ? 'text-[#006c4a] font-semibold' : 'text-[#45464d]'}`}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Urgent Nearby Tasks */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-[18px] font-bold text-[#0b1c30] tracking-tight">Urgent Nearby Tasks</h2>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] ring-4 ring-[#ffddb8]/50 animate-pulse"></span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('discover')}
            className="text-xs font-bold text-[#006c4a] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {urgentTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                onSelectTask?.(task.id);
                onNavigate(task.targetScreen);
              }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2 transition-transform active:scale-[0.99] cursor-pointer hover:border-[#cbdbf5]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                      task.dueColor || 'bg-[#ffddb8] text-[#2a1700]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {task.due}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#45464d] text-xs font-medium">
                    {task.category}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#006c4a] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">distance</span>
                  {task.distance}
                </span>
              </div>

              <div className="mt-0.5">
                <h3 className="font-headline text-[16px] font-bold text-[#0b1c30] leading-snug">
                  {task.title}
                </h3>
                <p className="text-[13px] text-[#45464d] mt-1 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[#45464d] text-xs">
                <span className="material-symbols-outlined text-[15px] text-[#006c4a]">location_on</span>
                <span>{task.location}</span>
              </div>

              <div className="mt-2 pt-2.5 flex items-center justify-between bg-[#eff4ff]/70 -mx-4 -mb-4 p-3 px-4 rounded-b-2xl border-t border-[#e5eeff]">
                <div className="flex items-center gap-2">
                  <img
                    src={task.posterAvatar}
                    alt={task.posterName}
                    className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                      {task.posterName}
                      <span className="material-symbols-outlined text-[13px] text-[#006c4a] fill-1">verified</span>
                    </span>
                    <span className="text-[11px] text-[#45464d]">★ {task.posterRating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="font-headline text-[18px] font-extrabold text-[#0b1c30] leading-none">
                      {task.budget}
                    </span>
                    <span className="text-[10px] text-[#006c4a] font-bold uppercase tracking-wider">
                      Escrow Funded
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTask?.(task.id);
                      onNavigate(task.targetScreen);
                    }}
                    className="h-9 px-3 rounded-lg bg-black text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Area Dispatch Map */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#85f8c4]/40 flex items-center justify-center text-[#006c4a]">
                <span className="material-symbols-outlined text-[20px]">radar</span>
              </div>
              <div>
                <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Live Area Dispatch</h3>
                <p className="text-[12px] text-[#45464d]">Austin Metro • 14 tasks within 3 miles</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
            >
              Expand Map
            </button>
          </div>

          <div
            onClick={() => onNavigate('discover')}
            className="w-full h-36 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-3 shadow-inner cursor-pointer"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfw0FnGsPbEMizqN238wW2G6_kru80xZJZq0jNJRliprs6QlzkyPADMHIG-jR7MlvCo7_qtdmlKojSAVOS7yogvJTID99YZaqCKq8hgrXvepq2ZiV_lAPeBgbSX-ld3d_JI1dmQqRpu06eHMlDfw5nhGP8m_VAnxajIP0EyD7_TPIfN0QGcwQHZPw4NnDQo81hqvkado-jBNcda-LIjZqisFxpgxnmwLazYqPlWLA')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between w-full text-white">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-ping"></span>
                <span>Real-time Task Hotspot active</span>
              </div>
              <span className="text-[11px] bg-white/90 text-[#0b1c30] px-2 py-0.5 rounded-full font-bold">
                12 Active Doers Nearby
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How SmS Works (4-Step Workflow) */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="text-center mb-3">
          <span className="text-xs text-[#006c4a] font-bold uppercase tracking-wider">Effortless Delivery</span>
          <h2 className="font-headline text-[18px] font-bold text-[#0b1c30] tracking-tight mt-0.5">
            How SmS Works in 4 Steps
          </h2>
          <p className="text-[12px] text-[#45464d] mt-0.5">From posting to verified payment, full security at every stage</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col relative overflow-hidden">
            <span className="font-headline text-[24px] font-black text-[#dce9ff] absolute top-2 right-3 select-none">
              01
            </span>
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
            <h4 className="font-headline text-[14px] font-bold text-[#0b1c30]">Post a Task</h4>
            <p className="text-[12px] text-[#45464d] mt-1 leading-snug">Describe what you need, set your price, and pick a deadline.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col relative overflow-hidden">
            <span className="font-headline text-[24px] font-black text-[#dce9ff] absolute top-2 right-3 select-none">
              02
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#006c4a] text-white flex items-center justify-center mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person_search</span>
            </div>
            <h4 className="font-headline text-[14px] font-bold text-[#0b1c30]">Match & Assign</h4>
            <p className="text-[12px] text-[#45464d] mt-1 leading-snug">Receive offers from verified locals. Review ratings and assign.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col relative overflow-hidden">
            <span className="font-headline text-[24px] font-black text-[#dce9ff] absolute top-2 right-3 select-none">
              03
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">track_changes</span>
            </div>
            <h4 className="font-headline text-[14px] font-bold text-[#0b1c30]">Track & Check</h4>
            <p className="text-[12px] text-[#45464d] mt-1 leading-snug">Get real-time updates and photo proof right in task chat.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col relative overflow-hidden">
            <span className="font-headline text-[24px] font-black text-[#dce9ff] absolute top-2 right-3 select-none">
              04
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <h4 className="font-headline text-[14px] font-bold text-[#0b1c30]">Release Funds</h4>
            <p className="text-[12px] text-[#45464d] mt-1 leading-snug">Escrow payment releases only when you approve 100% completion.</p>
          </div>
        </div>
      </section>

      {/* Trust, Safety & Guarantee Section */}
      <section className="mt-6 px-4 max-w-lg mx-auto w-full">
        <div className="rounded-2xl bg-[#d3e4fe]/50 border border-[#cbdbf5] p-4 flex flex-col gap-2.5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#006c4a] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline text-[15px] font-bold text-[#0b1c30] leading-tight">
                SmS Payment Protection Guarantee
              </h3>
              <p className="text-[12px] text-[#45464d] mt-0.5 leading-relaxed">
                Your funds are safely held in escrow prior to dispatch. If a task isn’t delivered to your satisfaction, dispute assistance and 100% refund guarantee applies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-white/90 rounded-xl p-2 flex flex-col items-center text-center border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">badge</span>
              <span className="text-[11px] font-bold text-[#0b1c30] mt-0.5">ID Verified</span>
              <span className="text-[10px] text-[#45464d]">All Doers</span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 flex flex-col items-center text-center border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">lock</span>
              <span className="text-[11px] font-bold text-[#0b1c30] mt-0.5">Escrow Vault</span>
              <span className="text-[10px] text-[#45464d]">Protected Pay</span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 flex flex-col items-center text-center border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">support_agent</span>
              <span className="text-[11px] font-bold text-[#0b1c30] mt-0.5">24/7 Support</span>
              <span className="text-[10px] text-[#45464d]">Live Mediation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Poster vs Worker Dual Value Split Banner */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex p-1 bg-[#eff4ff] rounded-xl border border-[#e5eeff]">
            <button
              type="button"
              onClick={() => setActiveTab('poster')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'poster'
                  ? 'bg-white text-[#0b1c30] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              I Need Work Done
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('worker')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'worker'
                  ? 'bg-white text-[#0b1c30] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              I Want to Earn
            </button>
          </div>

          {activeTab === 'poster' ? (
            <div className="flex items-center gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[10px] text-[#006c4a] font-bold uppercase tracking-wider">Zero Hassle</span>
                <h4 className="font-headline text-[15px] font-bold text-[#0b1c30] leading-tight">
                  Delegate your to-do list in minutes.
                </h4>
                <p className="text-[12px] text-[#45464d] leading-relaxed">
                  Free up your weekends. Hand off plumbing, moving, design, or admin work to trusted specialists nearby.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('post-task-offer')}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#006c4a] hover:underline"
                >
                  <span>Post a Task for free</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
              <div className="w-22 h-22 rounded-2xl overflow-hidden shrink-0 bg-[#eff4ff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGuz8DWeB2ftDOkK8OzM79REbOVwkmQsZoQY6DtyKEl5_FPmaaDuYC1T-yCNh1NfL5zdKs4Eb6DfWO8lwFt1r1O2sQ1fVDI9NuJ1LXHya1Adw7JtZqwMPmVFY6r9nWVc9rHT4LxDshzqIFoUMp668JgO_7PTEXgeZWnTBPIPdC3lxkgVqN9W-MxcNiPUM2y9M1750wsUicCn1NZKv1HrG_o2hACkAUhZN-ciAif84"
                  alt="Relaxed homeowner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[10px] text-[#006c4a] font-bold uppercase tracking-wider">Instant Liquidity</span>
                <h4 className="font-headline text-[15px] font-bold text-[#0b1c30] leading-tight">
                  Earn money on your own terms.
                </h4>
                <p className="text-[12px] text-[#45464d] leading-relaxed">
                  Browse hundreds of local and remote tasks. Set your rates, get instant payouts upon approval, and grow your reputation.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('discover')}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#006c4a] hover:underline"
                >
                  <span>Explore tasks near you</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
              <div className="w-22 h-22 rounded-2xl overflow-hidden shrink-0 bg-[#eff4ff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_5mCW1B_SuBXKsIMT9IWrJX_iDl1Z4_qitCdaZO6fok0WtidAiASHOPu-RsGWgsLkZyzNpWzywI8NhWfULsC_N-iX9zDg3JyImdUcbVihgsf3qD_V_xHxtJ4C9VZq_nr01AaZYVgoaDXo1cWzI2ej_zrYaWhnZbCKfAeWRNd70ngqnz4VJMtK0wXvw5Jmldq4k8_DCOGYalfykWsF2ODe0cTHSBRkAzIz05bG8ls"
                  alt="Skilled tradesperson"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Community Proof & Testimonials */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline text-[18px] font-bold text-[#0b1c30] tracking-tight">Real Community Stories</h2>
          <span className="text-xs text-[#45464d] font-semibold">4.9/5 from 18k reviews</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvJqwmShTlBfo055dMMJrkHTHyw8AGp8dZTcxojRycj24LRNPRjVEiOUcvqHq-dvn6adDhW5IPO7kSa6-pfh85oZ70eV8n9Irww4JkOew_VF5sYqrbOAhklMcWfhGVS8RRfkdEiMPD5j8q8BxPJKBc58eYIWK6C9jNRX9ZlHzdVTE8nTugFjUZRm1N2KyVyse-dZuA1AXBoFDTYiagHtxmKAyTDuydVoAGHi2oxVw"
                  alt="Marcus V."
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Marcus V.</span>
                  <span className="text-[11px] text-[#45464d]">Task Poster • South Lamar</span>
                </div>
              </div>
              <div className="flex text-[#b87500]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] fill-1">star</span>
                ))}
              </div>
            </div>
            <p className="text-[13px] text-[#0b1c30] mt-1 italic leading-relaxed">
              "Posted an urgent emergency drywall patch on SmS at 9 AM, had a verified pro on-site by 11:30 AM, and paid via escrow once checked. Smoothest service app I’ve ever touched."
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1ibDdqcbeICPwreGLr7gLMcxTxAJff2XbVU9hQCWXr6SHjJWydyIPoYvtHivKAFCmEtm1vpDrEiob5ya0XM5NjwQfYuIrA8FOrjsYX5coUe7saY1SBhAikORIzYOIWa8Js_AN0U7nlYuJhIM6CEHO2PgbWoafXW6d-lIyIrbztj3vWLFCpwm9NpS7g2TtE3JRPyJU0exaAsLALv8HG-MdiYNhxKEwwn-4ldIejkU"
                  alt="Teresa C."
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Teresa C.</span>
                  <span className="text-[11px] text-[#006c4a] font-semibold">Top Rated Pro • 140+ Gigs</span>
                </div>
              </div>
              <div className="flex text-[#b87500]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] fill-1">star</span>
                ))}
              </div>
            </div>
            <p className="text-[13px] text-[#0b1c30] mt-1 italic leading-relaxed">
              "As an independent electrician, SmS lets me fill empty weekday schedule slots within minutes. The guaranteed escrow payout means zero chasing unpaid invoices."
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mt-6 px-4 flex flex-col max-w-lg mx-auto w-full">
        <h2 className="font-headline text-[18px] font-bold text-[#0b1c30] tracking-tight mb-2.5">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="bg-white rounded-xl p-3 shadow-xs border border-[#e5eeff] cursor-pointer hover:border-[#cbdbf5] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#45464d] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
                {isOpen && (
                  <p className="text-[12px] text-[#45464d] mt-2 pt-2 border-t border-[#eff4ff] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Call to Action */}
        <div className="mt-6 p-6 rounded-3xl bg-black text-white text-center flex flex-col items-center gap-2 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#006c4a]/30 rounded-full blur-2xl"></div>
          <h3 className="font-headline text-[20px] font-black tracking-tight leading-tight">
            Ready to get things done?
          </h3>
          <p className="text-xs text-[#7c839b] max-w-xs">
            Join over 250,000 neighbors and pros connecting daily on SmS.
          </p>
          <div className="flex items-center gap-2 mt-2 w-full max-w-xs">
            <button
              type="button"
              onClick={() => onNavigate('post-task-offer')}
              className="flex-1 h-11 rounded-xl bg-[#006c4a] text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              Post First Task
            </button>
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="flex-1 h-11 rounded-xl bg-[#d3e4fe] text-[#0b1c30] text-xs font-bold active:scale-95 transition-transform"
            >
              Find Tasks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
