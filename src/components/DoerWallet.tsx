import React, { useState } from 'react';
import { ScreenId } from './BottomNav';
import confetti from 'canvas-confetti';

interface DoerWalletProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenProof?: () => void;
}

export const DoerWallet: React.FC<DoerWalletProps> = ({ onNavigate }) => {
  const [isLiveDispatchOn, setIsLiveDispatchOn] = useState(true);
  const [balance, setBalance] = useState(1482.5);
  const [isCashingOut, setIsCashingOut] = useState(false);
  const [cashoutNotice, setCashoutNotice] = useState<string | null>(null);

  const weeklyData = [
    { day: 'M', amount: 160, height: '40%' },
    { day: 'T', amount: 220, height: '55%' },
    { day: 'W', amount: 180, height: '45%' },
    { day: 'T', amount: 420, height: '100%', isPeak: true },
    { day: 'F', amount: 310, height: '75%' },
    { day: 'S', amount: 140, height: '35%' },
    { day: 'S', amount: 52.5, height: '15%' },
  ];

  const handleCashout = () => {
    if (balance <= 0) return;
    setIsCashingOut(true);
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#006c4a', '#85f8c4', '#ffddb8'],
      });
      setBalance(0);
      setIsCashingOut(false);
      setCashoutNotice('Success! $1,482.50 disbursed to Chase Debit •••• 4812 via Stripe Direct.');
      setTimeout(() => setCashoutNotice(null), 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 gap-3 max-w-lg mx-auto select-none">
      {/* Live Instant Dispatch Toggle Banner */}
      <section className="mt-2 bg-[#85f8c4]/40 border border-[#006c4a]/30 p-3 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#006c4a] text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xs font-bold text-[#002114] flex items-center gap-1">
              Live Instant Dispatch: {isLiveDispatchOn ? 'ON ⚡' : 'PAUSED'}
            </span>
            <span className="text-[11px] text-[#005137] truncate">
              {isLiveDispatchOn
                ? 'Receiving urgent jobs within 10 miles of Austin...'
                : 'Paused. Turn on to receive automatic high-yield corridors.'}
            </span>
          </div>
        </div>

        {/* Switch */}
        <button
          type="button"
          onClick={() => setIsLiveDispatchOn(!isLiveDispatchOn)}
          className={`w-12 h-7 rounded-full p-1 transition-colors relative flex items-center ${
            isLiveDispatchOn ? 'bg-[#006c4a]' : 'bg-[#c6c6cd]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              isLiveDispatchOn ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </section>

      {/* Profile Card */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdzCgXJcLzvouZT5yApemhAYH5Cn5lw7fytLijsLKyUqPlr57_zfARmg4crAUd9XVbuz0yL09dwTPgQOPJnZbUOC1jgJb6GcGXLEgzq_uRvZs92UIYSsqezqBVkJ-Ba69kGdWQEmetY5_illj5qEnOwrJqqDxmtVxUHibtjPWftAMFKZ9xognguEQjdX8ZQ5XivjAQ6ZsQdVKZp4KXS5wMkDH6WDut8L3SYrH7ec"
                alt="Alex Rivera"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#006c4a] ring-2 ring-white"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="font-headline text-[17px] font-bold text-[#0b1c30]">Alex Rivera</h2>
                <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Verified Pro
                </span>
              </div>
              <span className="text-xs text-[#45464d] mt-0.5">Master Handyman & Certified Tradesperson</span>
              <div className="flex items-center gap-1 text-xs text-[#45464d] mt-1">
                <span className="bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Top 1% Austin
                </span>
                <span>•</span>
                <span className="text-amber-700 font-bold flex items-center">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 fill-1">star</span> 4.96
                </span>
                <span>(184 reviews)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('task-analytics')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006c4a] text-xs font-bold border border-[#cbdbf5] transition-all shadow-xs active:scale-95"
            title="Open Task Analytics"
          >
            <span className="material-symbols-outlined text-[16px]">query_stats</span>
            <span>Analytics</span>
          </button>
        </div>

        {/* Live Photo Status Pill */}
        <div className="bg-[#eff4ff] p-2 rounded-xl flex items-center justify-between text-xs text-[#45464d] border border-[#dce9ff]">
          <span className="flex items-center gap-1 font-semibold text-[#006c4a]">
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            Photo: Verified & Live
          </span>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#006c4a]">
            <button type="button" className="hover:underline">Change</button>
            <span>•</span>
            <button type="button" className="hover:underline">Manage</button>
          </div>
        </div>

        {/* Metric Triplet */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dce9ff]">
            <span className="font-headline text-[16px] font-black text-[#0b1c30] block">99.2%</span>
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Completion</span>
          </div>
          <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dce9ff]">
            <span className="font-headline text-[16px] font-black text-[#0b1c30] block">&lt; 4 min</span>
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Response</span>
          </div>
          <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dce9ff]">
            <span className="font-headline text-[16px] font-black text-[#0b1c30] block">312</span>
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Jobs Done</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#eff4ff]">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#eff4ff] text-[#006c4a] px-2.5 py-1 rounded-lg border border-[#cbdbf5]">
            <span className="material-symbols-outlined text-[14px]">shield</span> ID Verified
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#eff4ff] text-[#006c4a] px-2.5 py-1 rounded-lg border border-[#cbdbf5]">
            <span className="material-symbols-outlined text-[14px]">plumbing</span> Licensed Plumber
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#eff4ff] text-[#006c4a] px-2.5 py-1 rounded-lg border border-[#cbdbf5]">
            <span className="material-symbols-outlined text-[14px]">verified</span> Background Checked
          </span>
        </div>
      </section>

      {/* Cashout Success Toast */}
      {cashoutNotice && (
        <div className="bg-[#006c4a] text-white p-3 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-[#85f8c4]">check_circle</span>
          <span>{cashoutNotice}</span>
        </div>
      )}

      {/* Total Available Balance Card */}
      <section className="bg-[#131b2e] text-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 border border-[#85f8c4]/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#bec6e0] uppercase font-bold tracking-wider">
            Total Available Balance
          </span>
          <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>
            +$340 this week
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-headline text-[32px] font-black text-white">
            ${balance.toFixed(2)}
          </span>
          <span className="text-xs text-[#bec6e0] font-semibold">USD</span>
        </div>

        {/* Pending in Escrow */}
        <div className="bg-white/10 rounded-xl p-2.5 flex items-center justify-between text-xs border border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#85f8c4] text-[18px]">lock</span>
            <div>
              <span className="font-bold text-white">Pending in Escrow: $288.00</span>
              <p className="text-[10px] text-[#bec6e0]">Releasing on Sarah M. & Marcus V. sign-off</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#bec6e0] text-[18px]">info</span>
        </div>

        {/* Payment Target */}
        <div className="flex items-center justify-between text-xs text-[#bec6e0] pt-1">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">credit_card</span>
            Payout to: Chase Debit •••• 4812
          </span>
          <button type="button" className="text-[#85f8c4] font-bold hover:underline">Change</button>
        </div>

        {/* Cashout CTAs */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            type="button"
            onClick={handleCashout}
            disabled={isCashingOut || balance <= 0}
            className="w-full h-12 bg-[#006c4a] hover:bg-[#00714e] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px] text-[#85f8c4]">bolt</span>
            <span>
              {isCashingOut
                ? 'Processing Micro-Rail Transfer...'
                : balance <= 0
                ? 'Balance Transferred ($0.00)'
                : 'Instant Cashout to Debit (Free)'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => alert('Direct Deposit is scheduled for every Monday 5:00 AM CST.')}
            className="w-full h-10 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center justify-center transition-colors"
          >
            Direct Deposit (Weekly • Auto every Mon)
          </button>
        </div>
      </section>

      {/* Weekly Earnings Velocity Chart */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Weekly Earnings Velocity</h3>
            <p className="text-[11px] text-[#45464d]">28.5 hrs logged • Avg $52/hr</p>
          </div>
          <div className="text-right">
            <span className="font-headline text-[16px] font-bold text-[#0b1c30]">$1,482</span>
            <span className="text-[10px] text-[#006c4a] block font-semibold">Peak: Thu ($420)</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-36 pt-6 pb-2 flex items-end justify-between gap-2 px-2 border-b border-[#eff4ff]">
          {weeklyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              {d.isPeak && (
                <span className="text-[10px] font-bold text-[#006c4a] -mb-1 animate-pulse font-mono">
                  ${d.amount}
                </span>
              )}
              <div
                style={{ height: d.height }}
                className={`w-full max-w-[32px] rounded-t-lg transition-all ${
                  d.isPeak ? 'bg-[#006c4a]' : 'bg-[#dce9ff] group-hover:bg-[#cbdbf5]'
                }`}
              />
              <span className="text-[10px] font-bold text-[#45464d] mt-1">{d.day}</span>
            </div>
          ))}
        </div>

        {/* Task Analytics Dashboard Trigger */}
        <button
          type="button"
          onClick={() => onNavigate('task-analytics')}
          className="mt-1 py-2 px-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006c4a] text-xs font-bold flex items-center justify-between border border-[#cbdbf5] transition-all group active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">insights</span>
            <span>Open Task Analytics & Completion Funnel</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] bg-[#85f8c4] text-[#002114] px-1.5 py-0.5 rounded font-bold">
              312 Jobs
            </span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </div>
        </button>
      </section>

      {/* Auto-Accept Preferences */}
      <section className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5eeff] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006c4a]">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xs font-bold text-[#0b1c30]">Auto-Accept Preferences</span>
            <span className="text-[11px] text-[#45464d]">Plumbing, Electrical • Min $50/hr</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => alert('Preferences saved for instant corridor auto-locks.')}
          className="text-xs font-bold text-[#006c4a] hover:underline"
        >
          Configure
        </button>
      </section>

      {/* Recent Activity & Releases */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Recent Activity & Releases</h3>
          <span className="text-xs text-[#006c4a] font-bold">View All (48)</span>
        </div>

        {/* Item 1: Pipe & Faucet */}
        <div
          onClick={() => onNavigate('active-task')}
          className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5eeff] flex flex-col gap-2 cursor-pointer hover:border-[#cbdbf5] transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#82f5c1]/40 text-[#006c4a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1c30]">Fix Leaking Pipe & Faucet</span>
                <span className="text-[11px] text-[#45464d]">Sarah M. • Instant Payout • 2h ago</span>
              </div>
            </div>
            <span className="font-headline text-[15px] font-bold text-[#006c4a]">+$138.00</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#eff4ff] text-[11px]">
            <span className="flex items-center gap-1 text-[#006c4a] font-semibold">
              <span className="material-symbols-outlined text-[14px]">lock_open</span>
              Escrow Released Instantly
            </span>
            <span className="text-[#006c4a] font-bold hover:underline">View Proof Photo</span>
          </div>
        </div>

        {/* Item 2: EV Charger */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5eeff] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#ffddb8] text-[#2a1700] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">ev_station</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1c30]">Emergency EV Charger Reset</span>
                <span className="text-[11px] text-[#45464d]">Tech District • Completed Yesterday</span>
              </div>
            </div>
            <span className="font-headline text-[15px] font-bold text-[#006c4a]">+$210.00</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#45464d] pt-1 border-t border-[#eff4ff]">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[13px] fill-1">star</span>
              ))}
            </div>
            <span className="italic">"Fixed in under an hour, true lifesaver!" 5.0★</span>
          </div>
        </div>

        {/* Item 3: HVAC */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">mode_fan</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">HVAC Filter & Vent Sanitization</span>
              <span className="text-[11px] text-[#45464d]">Marcus V. • Completed Oct 22</span>
            </div>
          </div>
          <span className="font-headline text-[15px] font-bold text-[#006c4a]">+$160.00</span>
        </div>
      </section>

      {/* Poster Spotlight */}
      <section className="bg-gradient-to-br from-[#eff4ff] to-[#dce9ff] rounded-2xl p-4 shadow-sm border border-[#cbdbf5] flex flex-col gap-2">
        <span className="text-[10px] text-[#006c4a] font-bold uppercase tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">format_quote</span>
          Poster Spotlight
        </span>
        <p className="text-[12px] text-[#0b1c30] italic leading-relaxed">
          "Alex arrived in 25 minutes, resolved the leak with zero hassle. Escrow released in seconds! Will definitely rehire for plumbing projects."
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG2qrvxwNDJEYCUbfic093XcpW3_iea_s9lFqcOyzC1ff35qDOL_Fs6_J50fRcLA7a3NK0spAlmX854dMVjotPkfDtWpZwuE0NGNl9sOJjs7UPKy9vvNuX1mjiockQDGApR65Yn3aj_gx4FS6TlqA5_CnO2boNvKUB1vmHqAtoKRLXECYx3pX2gfYeNTeI19MAId6csUMX_obdDbcYjY7kGI9IhFaBOhSpsQAIM4o"
              alt="Sarah"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-bold text-[#0b1c30]">Sarah M. • Verified Austin Homeowner</span>
          </div>
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[13px] fill-1">star</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
