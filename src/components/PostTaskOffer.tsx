import React, { useState } from 'react';
import { ScreenId } from './BottomNav';
import confetti from 'canvas-confetti';

import { submitTaskOffer } from '../lib/taskService';

interface PostTaskOfferProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat?: () => void;
}

export const PostTaskOffer: React.FC<PostTaskOfferProps> = ({ onNavigate, onOpenChat }) => {
  const [offerType, setOfferType] = useState<'budget' | 'custom'>('budget');
  const [customBidAmount, setCustomBidAmount] = useState('165');
  const [startTime, setStartTime] = useState<'30min' | '330pm' | 'flexible'>('30min');
  const [message, setMessage] = useState(
    "Hi Sarah! I'm 1.2 miles away on S. 1st St with a fully stocked plumbing van, basin wrench, and pipe replacement parts. Can arrive by 2:15 PM and wrap this up cleanly within 45 mins."
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const budget = offerType === 'budget' ? 150 : Number(customBidAmount) || 150;
  const platformFee = Math.round(budget * 0.08 * 100) / 100;
  const netTakeHome = Math.round((budget - platformFee) * 100) / 100;

  const handleSubmitOffer = () => {
    setIsSubmitted(true);
    // Persist offer to Firestore
    submitTaskOffer('SMS-8942', {
      workerName: 'Alex Rivera',
      proposedPayout: budget,
      netTakeHome,
      message,
      arrivalTime: startTime === '30min' ? 'In ~30 Minutes' : startTime === '330pm' ? 'Today by 3:30 PM' : 'Flexible',
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#006c4a', '#85f8c4', '#10b981'],
    });
    setTimeout(() => {
      onNavigate('active-task');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto">
      {/* Top Flash / Operational Trust Header */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2">
        {/* Category & Freshness row */}
        <div className="flex items-center justify-between text-[#45464d] text-xs">
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px] text-[#006c4a]">plumbing</span>
              Skilled Trades / Plumbing
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#45464d]">
            <span>28m ago</span>
            <span className="w-1 h-1 rounded-full bg-[#76777d]"></span>
            <span className="text-[#006c4a] font-semibold">4 Offers</span>
          </div>
        </div>

        {/* Urgency & Status Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <div className="inline-flex items-center gap-1.5 bg-[#ffddb8] text-[#2a1700] px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 rounded-full bg-[#b87500] animate-ping"></span>
            Urgent • Immediate Dispatch
          </div>
          <div className="inline-flex items-center gap-1 bg-[#85f8c4] text-[#002114] px-2.5 py-1 rounded-full text-[10px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            Escrow Funded
          </div>
          <div className="inline-flex items-center gap-1 bg-[#e5eeff] text-[#45464d] px-2.5 py-1 rounded-full text-[10px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">near_me</span>
            1.2 mi away
          </div>
        </div>

        {/* Task Headline */}
        <h2 className="font-headline text-[22px] text-[#0b1c30] font-extrabold tracking-tight mt-1 leading-tight">
          Fix Leaking Kitchen Pipe & Install Bathroom Faucet
        </h2>

        {/* Budget Bento Block */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2 mt-1">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#45464d] block uppercase tracking-wider font-semibold">
                Fixed Offer Budget
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-[32px] text-[#0b1c30] font-black tracking-tight">$150</span>
                <span className="text-sm text-[#45464d] font-medium">USD</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#006c4a] text-xs font-bold border border-[#82f5c1]/60">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                Fair Market Rate
              </span>
              <span className="block text-[11px] text-[#45464d] mt-1">Austin benchmark: $110 – $160</span>
            </div>
          </div>

          {/* Escrow Vault Guarantee */}
          <div className="bg-[#eff4ff] rounded-xl p-3 flex items-start gap-2.5 border border-[#dce9ff]">
            <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center shrink-0 text-[#0b1c30]">
              <span className="material-symbols-outlined text-[20px] text-[#006c4a]">lock</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#0b1c30] font-bold">SmS Escrow Vault: $150.00 Secured</p>
              <p className="text-[12px] text-[#45464d] leading-snug mt-0.5">
                Funds locked safely. Guaranteed instantaneous transfer to your wallet once completion photos are signed off.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Poster Profile Card */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdzCgXJcLzvouZT5yApemhAYH5Cn5lw7fytLijsLKyUqPlr57_zfARmg4crAUd9XVbuz0yL09dwTPgQOPJnZbUOC1jgJb6GcGXLEgzq_uRvZs92UIYSsqezqBVkJ-Ba69kGdWQEmetY5_illj5qEnOwrJqqDxmtVxUHibtjPWftAMFKZ9xognguEQjdX8ZQ5XivjAQ6ZsQdVKZp4KXS5wMkDH6WDut8L3SYrH7ec"
                  alt="Sarah M."
                  className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#006c4a] text-white rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[13px]">check</span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[16px] font-bold text-[#0b1c30]">Sarah M.</span>
                  <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Top Poster
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#45464d] text-xs mt-0.5">
                  <span className="flex items-center text-amber-700 font-bold">
                    <span className="material-symbols-outlined text-[14px] fill-1 text-amber-500">star</span> 4.9
                  </span>
                  <span>•</span>
                  <span>32 completed tasks</span>
                  <span>•</span>
                  <span className="text-[#006c4a] font-semibold">100% pay rate</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenChat || (() => onNavigate('messages'))}
              aria-label="Message poster"
              className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] hover:bg-[#cbdbf5] active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px] text-[#006c4a]">chat_bubble_outline</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#eff4ff]">
            <div className="bg-[#eff4ff] rounded-xl p-2.5">
              <span className="text-[10px] text-[#45464d] block uppercase font-semibold">Responsiveness</span>
              <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#006c4a]">bolt</span> &lt; 5 mins
              </span>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-2.5">
              <span className="text-[10px] text-[#45464d] block uppercase font-semibold">SmS Tenure</span>
              <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#45464d]">schedule</span> Since 2022
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule & Location Card with Map */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <h3 className="font-headline text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4a] text-[20px]">event_available</span>
            Timing & Arrival Window
          </h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#ffddb8] text-[#2a1700] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px] text-[#b87500]">alarm_on</span>
              </div>
              <div>
                <span className="text-xs text-[#0b1c30] font-bold block">Today, Oct 24 • 2:00 PM – 5:00 PM</span>
                <span className="text-[11px] text-[#b87500] font-semibold">
                  Immediate / Priority arrival requested within 45 mins
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px] text-[#006c4a]">location_on</span>
              </div>
              <div className="flex-1">
                <span className="text-xs text-[#0b1c30] font-bold block">South Congress Ave, Austin, TX</span>
                <span className="text-[11px] text-[#45464d]">1.2 miles away from your current location</span>
              </div>
            </div>
          </div>

          {/* Static Map Preview */}
          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#dce9ff]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYw7zGNCUnrVrG8OwETBasqHrdYsp6HLoD6Ojatf8gAUkwn94OhjYu9yIRL8P5gz6qEiVmL4kCGfsXm5jGk2tUo6svCqPlJjhEqA_Kq9PQYS4cURy5FlbnuyHoDxfhtm8eh6TPnJ5_1X6b7JpotM6v7tUNeZjFKp9iDhpFfj3dbgG0hreGKuACt0eYJT6ieXmkpq1q6vjwCCxyJyrESLgMYWQa-VxJdNwqL98dzbnwGDLNIO_Ybr3o')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
              <div className="flex items-center justify-between w-full text-white">
                <span className="text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">shield</span>
                  Exact address unlocked upon offer acceptance
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                  ~4 min drive
                </span>
              </div>
            </div>
          </div>

          {/* Access Instructions Callout */}
          <div className="bg-[#eff4ff] rounded-xl p-3 flex items-start gap-2.5 border border-[#dce9ff]">
            <span className="material-symbols-outlined text-[#45464d] text-[20px] shrink-0 mt-0.5">key</span>
            <div>
              <span className="text-xs text-[#0b1c30] font-bold block">Access & Parking Instructions</span>
              <p className="text-[12px] text-[#45464d] mt-0.5 leading-snug">
                Buzz unit 4B on gate intercom. Reserved visitor spot #12 in rear driveway available for work van/truck.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Scope, Photos & Requirements */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4a] text-[20px]">assignment</span>
              Work Scope & Deliverables
            </h3>
            <p className="text-[13px] text-[#45464d] mt-1.5 leading-relaxed">
              Need a licensed or experienced tradesperson to replace a corroded P-trap under the kitchen sink that is actively leaking into a plastic tub. Additionally, install a brand new Moen Adler single-handle faucet (box is on the kitchen island with standard water supply connectors ready).
            </p>
          </div>

          {/* Tool requirements pill list */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#45464d] font-bold block mb-1.5">
              Equipment & Supplies
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px] text-[#006c4a]">check</span> Bring Basin Wrench
              </span>
              <span className="bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px] text-[#006c4a]">check</span> Pipe Cutter / Wrench
              </span>
              <span className="bg-[#eff4ff] text-[#45464d] px-2.5 py-1 rounded-lg text-xs font-medium">
                Teflon tape & putty on-site
              </span>
              <span className="bg-[#eff4ff] text-[#45464d] px-2.5 py-1 rounded-lg text-xs font-medium">
                New Moen Faucet provided
              </span>
            </div>
          </div>

          {/* Photo Attachments Gallery */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#45464d] font-bold block mb-2">
              Attached Job Photos (2)
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#eff4ff] border border-[#e5eeff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeMmKPOGxoG-pOglaUf0lQljHX_XuuAWOMDBb3JOivZni6aqSEjETmIIvsO3JsAy7O39IVQbUPhTG0uX78dDhxTayy7eaz4cOR9VzjiJy8LO_svU7WLlXymjVZrKBXVWhvcHZpHMVJAZ0917dBdx_yyWG47SXu8zzlZ_ETcJ_ICyGtphOI6dcWOixUyJfseIEuESXxuIsxtHbYBktRzv9CXvfT5mjQtM9m90IDqBAovdocXy1qGLIP"
                  alt="Active leak"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded font-semibold">
                  Active Leak
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#eff4ff] border border-[#e5eeff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8aaKjY1jl4-eMJSkpAWNrExgre3NjR8ysqQzAVpCTRriCwelxMaHaDS8R5eEjMJKmjV_JyWqnXs5iD_Looyh7y79VJ98RXYNZmdOigMn61PGXD1K35Wlar2Zoy1SpmrWNBL5gOzzguh21Tbm4OsWyBuEhSpJ-QPW0s5Ucp0f7IdyK8PL0z_r4-0XGh9B6xzvcW-C_heIU_WA1VycGQuh5oaeXIH1SGwFiKbTigB1NV2RVa8ucWm8A"
                  alt="New hardware"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded font-semibold">
                  New Hardware
                </span>
              </div>
            </div>
          </div>

          {/* Task Verification Checklist */}
          <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-1.5 border border-[#dce9ff]">
            <span className="text-[10px] uppercase tracking-wider text-[#45464d] font-bold mb-0.5">
              Required Escrow Sign-Off Criteria
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] text-xs">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">check_box</span>
              <span>Pressure test water lines for 3 minutes with zero drips</span>
            </div>
            <div className="flex items-center gap-2 text-[#0b1c30] text-xs">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">check_box</span>
              <span>Clean work area & upload clear before/after photos</span>
            </div>
            <div className="flex items-center gap-2 text-[#0b1c30] text-xs">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">check_box</span>
              <span>Properly bag & haul away old corroded fittings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Worker Application & Offer Formulation */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4a] text-[20px]">send_and_archive</span>
              Your Application & Offer
            </h3>
            <span className="inline-flex items-center gap-1 bg-[#85f8c4] text-[#002114] px-2 py-0.5 rounded text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px]">verified</span> Verified Pro
            </span>
          </div>

          {/* Pricing Bid Selector */}
          <div>
            <label className="text-xs text-[#45464d] font-semibold block mb-1.5">
              Your Proposed Payout
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOfferType('budget')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  offerType === 'budget'
                    ? 'bg-[#85f8c4] text-[#002114] border-[#006c4a] shadow-xs'
                    : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff]'
                }`}
              >
                <span className="font-headline text-[16px] font-black">$150.00</span>
                <span className="text-[10px] font-medium">Accept Client's Budget</span>
              </button>
              <button
                type="button"
                onClick={() => setOfferType('custom')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  offerType === 'custom'
                    ? 'bg-[#85f8c4] text-[#002114] border-[#006c4a] shadow-xs'
                    : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff]'
                }`}
              >
                <span className="font-headline text-[16px] font-bold">Custom Offer</span>
                <span className="text-[10px] text-[#45464d]">Submit counter-bid</span>
              </button>
            </div>

            {offerType === 'custom' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-[#45464d] font-semibold">Counter-bid Amount:</span>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-xs font-bold text-[#0b1c30]">$</span>
                  <input
                    type="number"
                    value={customBidAmount}
                    onChange={(e) => setCustomBidAmount(e.target.value)}
                    className="w-24 pl-6 pr-2 py-1 bg-[#eff4ff] border border-[#cbdbf5] rounded-lg text-xs font-bold text-[#0b1c30] focus:outline-none focus:ring-1 focus:ring-[#006c4a]"
                  />
                </div>
              </div>
            )}

            {/* Fee & Net Breakdown */}
            <div className="mt-2.5 bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-1 border border-[#dce9ff]">
              <div className="flex justify-between text-xs text-[#45464d]">
                <span>Client Escrow Total:</span>
                <span className="font-semibold text-[#0b1c30]">${budget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#45464d]">
                <span>SmS Platform & Insurance Fee (8%):</span>
                <span>-${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#006c4a] font-bold pt-1.5 border-t border-dashed border-[#cbdbf5]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                  Your Net Take-Home Pay:
                </span>
                <span className="font-headline text-[16px]">${netTakeHome.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          {/* Arrival Time Chips */}
          <div>
            <label className="text-xs text-[#45464d] font-semibold block mb-1.5">When Can You Start?</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setStartTime('30min')}
                className={`px-3 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
                  startTime === '30min'
                    ? 'bg-[#006c4a] text-white'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">bolt</span>
                In ~30 Minutes (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setStartTime('330pm')}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  startTime === '330pm'
                    ? 'bg-[#006c4a] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                Today by 3:30 PM
              </button>
              <button
                type="button"
                onClick={() => setStartTime('flexible')}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  startTime === 'flexible'
                    ? 'bg-[#006c4a] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                Flexible schedule
              </button>
            </div>
          </div>

          {/* Pitch Note */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-[#45464d] font-semibold">Message to Sarah</label>
              <span className="text-[10px] text-[#006c4a] font-bold">Auto-attach license proof</span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-[#eff4ff] rounded-xl p-2.5 text-xs text-[#0b1c30] placeholder:text-[#45464d] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#006c4a] transition-all resize-none border border-[#e5eeff]"
            />
            {/* Pre-fill suggestions */}
            <div className="flex items-center gap-1.5 mt-1 overflow-x-auto pb-1 text-[#45464d]">
              <span className="text-[10px] whitespace-nowrap">Quick fill:</span>
              <button
                type="button"
                onClick={() =>
                  setMessage((prev) => prev + ' 7+ yrs licensed residential plumbing experience.')
                }
                className="bg-[#dce9ff] text-[#0b1c30] px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap hover:bg-[#cbdbf5]"
              >
                "7+ yrs plumbing experience"
              </button>
              <button
                type="button"
                onClick={() =>
                  setMessage((prev) => prev + ' Dedicated van with Moen basin wrench on-board.')
                }
                className="bg-[#dce9ff] text-[#0b1c30] px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap hover:bg-[#cbdbf5]"
              >
                "Own basin wrench ready"
              </button>
            </div>
          </div>

          {/* Trust Badges Auto-Attached */}
          <div className="flex items-center gap-2.5 p-2 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006c4a] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#0b1c30] block">SmS Tradesperson Guarantee Attached</span>
              <span className="text-[11px] text-[#45464d] truncate block">Identity verified • General liability coverage up to $1M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Submission Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#f8f9ff]/92 backdrop-blur-xl border-t border-[#e5eeff] p-4 pb-safe z-40 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="Save or bookmark task"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 border ${
              isBookmarked
                ? 'bg-[#006c4a] text-white border-[#006c4a]'
                : 'bg-[#dce9ff] text-[#0b1c30] border-[#cbdbf5] hover:bg-[#cbdbf5]'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${isBookmarked ? 'fill-1' : ''}`}>
              bookmark
            </span>
          </button>

          <button
            type="button"
            onClick={handleSubmitOffer}
            disabled={isSubmitted}
            className="flex-1 h-12 rounded-xl bg-[#006c4a] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#00714e] active:scale-[0.98] transition-all disabled:opacity-75"
          >
            {isSubmitted ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                <span>Offer Dispatched to Sarah...</span>
              </>
            ) : (
              <>
                <span>Submit Offer (${budget.toFixed(0)})</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[#45464d] text-[10px]">
          <span className="material-symbols-outlined text-[13px] text-[#006c4a]">shield</span>
          <span>Zero upfront cost • Protected by SmS Escrow Guarantee</span>
        </div>
      </div>
    </div>
  );
};
