import React, { useState, useEffect } from 'react';
import { ScreenId } from './BottomNav';
import confetti from 'canvas-confetti';

interface FlightDeckProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat?: () => void;
}

export const FlightDeck: React.FC<FlightDeckProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(38);
  const totalTime = 45;
  const [isLocked, setIsLocked] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [scanningTool, setScanningTool] = useState(false);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Moen Adler Cartridge (#1225)',
      location: 'Bin A-2 • RFID Tag #992-M',
      stock: '3 In Stock',
      icon: 'plumbing',
      status: 'ready',
    },
    {
      id: 2,
      name: '1.5" PVC Trap & Slip Nut Kit',
      location: 'Bin B-4 • Matched to Job #8412',
      stock: '4 In Stock',
      icon: 'tune',
      status: 'ready',
    },
    {
      id: 3,
      name: 'Milwaukee M18 ProPress',
      location: 'Cradle 1 • Calibrated Oct 2024',
      stock: 'Bat 94%',
      icon: 'handyman',
      status: 'battery',
    },
    {
      id: 4,
      name: 'Digital Manometer / Sniffer',
      location: 'Tool Rack C • Gas / Air Ready',
      stock: 'Online',
      icon: 'speed',
      status: 'sensor',
    },
  ]);

  // Live countdown timer for the flash offer
  useEffect(() => {
    if (isLocked || isDeclined) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked, isDeclined]);

  const circumference = 2 * Math.PI * 18; // ~113.1
  const strokeOffset = circumference - (timeLeft / totalTime) * circumference;

  const handleConfirmLock = () => {
    setIsLocked(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#006c4a', '#85f8c4', '#68dba9'],
    });
    setTimeout(() => {
      onNavigate('active-task');
    }, 1600);
  };

  const handleScanItem = () => {
    setScanningTool(true);
    setTimeout(() => {
      setScanningTool(false);
      setInventory((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: 'SharkBite 1/2" Push-to-Connect Tee',
          location: 'Bin C-1 • RFID Tag #551-B',
          stock: '6 In Stock',
          icon: 'precision_manufacturing',
          status: 'ready',
        },
      ]);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 gap-3.5 max-w-lg mx-auto select-none">
      {/* Telemetry Engine Status Ribbon */}
      <section className="flex flex-col gap-1.5 mt-2">
        <div className="flex items-center justify-between bg-[#eff4ff] p-3 rounded-xl border border-[#cbdbf5]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c4a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006c4a]"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#006c4a] font-bold">
                Autonomous Engine Active
              </span>
              <span className="font-headline text-[15px] font-bold text-[#0b1c30]">Austin Central Corridor</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#dce9ff] px-2.5 py-1 rounded-full border border-[#cbdbf5]">
            <span className="material-symbols-outlined text-[15px] text-[#006c4a]">radar</span>
            <span className="text-xs text-[#0b1c30] font-semibold">6.2 mi scan</span>
          </div>
        </div>

        {/* Vehicle Telemetry Meta Pill */}
        <div className="flex items-center justify-between bg-white shadow-xs px-3.5 py-2 rounded-xl border border-[#e5eeff]">
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-[18px] text-[#45464d]">local_shipping</span>
            <span className="text-xs text-[#0b1c30] font-bold truncate">Ford Transit #TX-482</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#006c4a]"></span>
            <span className="text-[11px] text-[#45464d] font-semibold">Tier 3 Master Loadout</span>
          </div>
        </div>
      </section>

      {/* High Priority Live Autonomous Match Card */}
      {!isDeclined && (
        <section className="relative overflow-hidden bg-[#131b2e] text-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-[#85f8c4]/30">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#006c4a]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Match Card Header & Dynamic Timer */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-[#006c4a] text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  Flash Binding Offer
                </span>
                <span className="text-[10px] text-[#85f8c4] font-semibold">99.8% Match</span>
              </div>
              <h2 className="font-headline text-[16px] text-white font-bold leading-tight">
                Emergency P-Trap Failure & Main Shutoff
              </h2>
              <span className="text-[12px] text-[#bec6e0] mt-0.5">
                Marcus V. • Downtown Austin • Verified Escrow
              </span>
            </div>

            {/* Circular Countdown Timer Widget */}
            <div className="flex flex-col items-center shrink-0 ml-2">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    className="text-white/20"
                    cx="22"
                    cy="22"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    fill="none"
                    r="18"
                    stroke="#85f8c4"
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute font-headline text-[13px] font-bold text-[#85f8c4]">
                  {timeLeft}s
                </span>
              </div>
              <span className="text-[9px] text-[#bec6e0] mt-0.5 font-semibold">Auto-Locks</span>
            </div>
          </div>

          {/* Match Justifications & Telemetry Sync Grid */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col gap-1.5 relative z-10 border border-white/10">
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#85f8c4] text-[18px]">verified</span>
                <span className="font-medium">Van Bin B-4: 1.5" PVC P-Trap & Ball Valve</span>
              </div>
              <span className="text-[10px] text-[#85f8c4] font-bold bg-[#006c4a]/50 px-1.5 py-0.5 rounded">
                IN TRUCK
              </span>
            </div>
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">alt_route</span>
                <span className="text-[#d3e4fe]">Route Detour: +0.4 mi (adds 6 min to transit)</span>
              </div>
              <span className="text-[10px] text-[#dce9ff] font-semibold">OPTIMAL</span>
            </div>
          </div>

          {/* Guaranteed Payout & Binding Call to Action */}
          <div className="flex flex-col gap-2 pt-1 relative z-10">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#bec6e0] uppercase tracking-wider font-semibold">
                  Instant Smart Contract
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline text-[26px] font-black text-white">$210.00</span>
                  <span className="text-xs text-[#85f8c4] font-semibold">Fixed Escrow Locked</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#bec6e0]">
                <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                <span className="text-xs font-medium">Funds in Vault</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirmLock}
                disabled={isLocked}
                className={`flex-1 h-12 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isLocked ? 'bg-[#006c4a] ring-2 ring-[#85f8c4]' : 'bg-[#006c4a] hover:bg-[#00714e] active:scale-95'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#85f8c4]">
                  {isLocked ? 'check_circle' : 'electric_bolt'}
                </span>
                <span>{isLocked ? 'Contract Locked & Routed!' : 'Confirm Lock & Route'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDeclined(true)}
                className="px-4 h-12 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Corridor Yield & Heatmap */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006c4a] text-[20px]">hub</span>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Dynamic Corridor Yield</h3>
          </div>
          <div className="flex items-center gap-1 bg-[#85f8c4]/30 px-2.5 py-0.5 rounded-full border border-[#006c4a]/20">
            <span className="text-xs text-[#006c4a] font-bold">+$74/hr</span>
            <span className="text-[10px] text-[#45464d]">projected rate</span>
          </div>
        </div>

        {/* Radar Map Canvas Simulation */}
        <div className="relative w-full h-48 bg-[#131b2e] rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-3 border border-[#cbdbf5]">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center filter contrast-125"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhVdyk8RqLD6hWnMjxkolTg55WIFJ9I3YTexCfK21vAYN9knBxcd32cgpOrwLS5NhSfr5eUh2C11LfZHZttSUrV77nf-0YwvD-OdIi1XWWPfkb2XEUc8bI4hS5RyO7xNhbhhxenrCLQpcQal-fTxjNjwIOLocOyGV7hi-uPYp_r_UfDrPIZLSUw8LmcYISnXNLcV8zNKubmS38_1tz13Wt0uiC39UKM40cWQD90jXmW1ZZUaj2DJIE')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-[#131b2e]/80 pointer-events-none" />

          {/* Top Overlay Tags */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#0b1c30] text-[10px] font-bold flex items-center gap-1 shadow-sm border border-[#e5eeff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-pulse"></span>
              Corridor: I-35 Frontage • SB
            </span>
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#0b1c30] text-[10px] font-bold shadow-sm border border-[#e5eeff]">
              3 Nearby Bids
            </span>
          </div>

          {/* Pulse Node Pin: Truck Current GPS */}
          <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-[#85f8c4]/50 animate-ping"></div>
              <div className="w-7 h-7 rounded-full bg-[#006c4a] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[16px]">navigation</span>
              </div>
            </div>
            <span className="bg-black text-white px-1.5 py-0.5 rounded text-[9px] shadow mt-1 whitespace-nowrap font-bold">
              Your Rig
            </span>
          </div>

          {/* Opportunity Node 1 */}
          <div className="absolute right-1/4 top-1/3 z-20 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white text-[#ba1a1a] flex items-center justify-center shadow-lg border border-[#ffdad6]">
              <span className="material-symbols-outlined text-[14px] font-bold">bolt</span>
            </div>
            <span className="bg-[#ba1a1a] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold shadow mt-0.5">
              +$45 Surge
            </span>
          </div>

          {/* Opportunity Node 2 */}
          <div className="absolute right-10 bottom-8 z-20 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-white text-[#006c4a] flex items-center justify-center shadow border border-[#cbdbf5]">
              <span className="material-symbols-outlined text-[12px] font-bold">priority_high</span>
            </div>
            <span className="bg-[#d3e4fe] text-[#0b1c30] text-[9px] px-1 rounded shadow mt-0.5 font-bold">
              +$30 Surge
            </span>
          </div>

          {/* Bottom Map Strip Stats */}
          <div className="relative z-10 flex items-center justify-between text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <span className="text-[11px] text-[#eaf1ff]">Auto-Detour Tolerance: ±1.2 mi</span>
            <button
              type="button"
              onClick={() => alert('Flight path tolerance adjusted to ±2.0 mi')}
              className="text-[#85f8c4] hover:underline text-[11px] font-bold"
            >
              Tweak Flight Path
            </button>
          </div>
        </div>
      </section>

      {/* Live Truck Inventory HUD */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006c4a] text-[20px]">inventory_2</span>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Live Truck Inventory HUD</h3>
          </div>
          <span className="text-[10px] text-[#45464d] font-semibold">RFID & Optical Sync</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-1.5 border border-[#e5eeff]">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#eff4ff] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-[#006c4a]">{item.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">{item.name}</span>
                  <span className="text-[10px] text-[#45464d] truncate">{item.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'battery'
                      ? 'bg-[#85f8c4] text-[#002114]'
                      : 'bg-[#eff4ff] text-[#0b1c30]'
                  }`}
                >
                  {item.stock}
                </span>
                <span className="material-symbols-outlined text-[#006c4a] text-[18px]">
                  {item.status === 'battery'
                    ? 'battery_charging_full'
                    : item.status === 'sensor'
                    ? 'sensors'
                    : 'check_circle'}
                </span>
              </div>
            </div>
          ))}

          {/* Quick Scan Trigger */}
          <button
            type="button"
            onClick={handleScanItem}
            disabled={scanningTool}
            className="w-full mt-1 py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-[#cbdbf5] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006c4a]">
              {scanningTool ? 'refresh' : 'qr_code_scanner'}
            </span>
            <span>{scanningTool ? 'Scanning RFID tags...' : '+ Quick Scan Onboard Tool / Supply Pack'}</span>
          </button>
        </div>
      </section>

      {/* Autonomous Access & Safety Gate Handoff */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#82f5c1] text-[#00714e] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[22px]">contactless</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[14px] text-[#0b1c30] font-bold">Digital Gate Key Ready</span>
              <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
            </div>
            <span className="text-[11px] text-[#45464d]">Auto-unlocks complex gate within 100ft range</span>
          </div>
        </div>
        <span className="text-[10px] bg-[#dce9ff] text-[#0b1c30] font-bold px-2.5 py-1 rounded-full border border-[#cbdbf5]">
          NFC / BLE
        </span>
      </section>
    </div>
  );
};
