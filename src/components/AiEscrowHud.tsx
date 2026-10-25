import React, { useState } from 'react';
import { ScreenId } from './BottomNav';

interface AiEscrowHudProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat?: () => void;
}

export const AiEscrowHud: React.FC<AiEscrowHudProps> = ({ onNavigate }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showHashModal, setShowHashModal] = useState(false);

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-32 max-w-lg mx-auto select-none">
      {/* AR Viewfinder / Computer Vision HUD Viewport */}
      <div className="relative w-full overflow-hidden bg-[#131b2e] text-white">
        {/* Camera Feed Container */}
        <div className="relative w-full h-80 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC9cedW9pMDNh5-RGDSA2zvhgOGROtcA4vN4C7D8PvahDY2OYbSM2yWTicNnVVVBcp2t4l06gTlz7fyLRtPNxx5HHjBIugLNvWSetBXnj6eHOBPl-6P59oV7APykko1FQWiqfrpB4E0Lu5AhNMhLL4kjPeTNcIp3LlD5rAUNUWorsnrw4A8TisM7ni-7A2Iu0C6BxT16iPgoHZeKoh4uiikjFIP4HiWA1i6ot9S9LmH_544rFHVw7S"
            alt="Macro plumbing inspection"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-[#131b2e]/60 pointer-events-none" />

          {/* Scanning Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#85f8c4] to-transparent shadow-[0_0_12px_#85f8c4] animate-pulse" />

          {/* AR HUD Corner Brackets */}
          <div className="absolute top-4 left-4 w-7 h-7 flex flex-col justify-between pointer-events-none">
            <div className="w-full h-1 bg-[#85f8c4]" />
            <div className="w-1 h-full bg-[#85f8c4]" />
          </div>
          <div className="absolute top-4 right-4 w-7 h-7 flex flex-col items-end justify-between pointer-events-none">
            <div className="w-full h-1 bg-[#85f8c4]" />
            <div className="w-1 h-full bg-[#85f8c4] self-end" />
          </div>
          <div className="absolute bottom-16 left-4 w-7 h-7 flex flex-col justify-between pointer-events-none">
            <div className="w-1 h-full bg-[#85f8c4]" />
            <div className="w-full h-1 bg-[#85f8c4]" />
          </div>
          <div className="absolute bottom-16 right-4 w-7 h-7 flex flex-col items-end justify-between pointer-events-none">
            <div className="w-1 h-full bg-[#85f8c4] self-end" />
            <div className="w-full h-1 bg-[#85f8c4]" />
          </div>

          {/* Live Neural Telemetry Pill */}
          <div className="absolute top-4 inset-x-0 mx-auto w-max flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full shadow-lg border border-[#85f8c4]/30">
            <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-ping" />
            <span className="text-[10px] text-[#85f8c4] tracking-wider uppercase font-mono font-bold">
              CV-Vision Neural Core v4.8 • Real-time
            </span>
          </div>

          {/* Bounding Box 1: P-Trap Joint */}
          <div className="absolute top-20 left-10 w-32 h-24 rounded-lg bg-[#006c4a]/15 border border-[#85f8c4] shadow-[0_0_20px_rgba(133,248,196,0.3)] flex flex-col justify-between p-1.5 pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-[#006c4a] text-white px-1.5 py-0.5 rounded font-bold uppercase">
                P-Trap Joint #1
              </span>
              <span className="text-[10px] text-[#85f8c4] font-black">100% OK</span>
            </div>
            <div className="flex items-center gap-1 self-start bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[12px] text-[#85f8c4]">water_drop</span>
              <span className="text-[10px] text-white font-mono">0.00 mL/min</span>
            </div>
          </div>

          {/* Bounding Box 2: Moen Pressure Ball-Valve */}
          <div className="absolute bottom-20 right-8 w-28 h-20 rounded-lg bg-[#d3e4fe]/20 border border-[#d3e4fe] shadow-[0_0_15px_rgba(211,228,254,0.3)] flex flex-col justify-between p-1.5 pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-[#d3e4fe] text-[#0b1c30] px-1 py-0.5 rounded font-bold uppercase">
                Valve Seal
              </span>
              <span className="text-[10px] text-white font-bold font-mono">58 PSI</span>
            </div>
            <div className="flex items-center gap-1 self-end bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[12px] text-[#85f8c4] fill-1">check_circle</span>
              <span className="text-[9px] text-white font-semibold">Code Compliant</span>
            </div>
          </div>
        </div>

        {/* Live Telemetry Readout Deck inside Viewport */}
        <div className="p-4 bg-gradient-to-b from-[#131b2e] to-[#213145]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#85f8c4] shadow-[0_0_6px_#85f8c4]"></span>
              <h2 className="font-headline text-[16px] text-white font-bold tracking-tight">AI Audit Certified</h2>
            </div>
            <span className="text-xs text-[#85f8c4] bg-[#82f5c1]/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-[#85f8c4]/30">
              3 / 3 Passed
            </span>
          </div>

          {/* Telemetry Metric Cards Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex flex-col border border-white/10">
              <div className="flex items-center gap-1 text-[#85f8c4] mb-1">
                <span className="material-symbols-outlined text-[16px]">speed</span>
                <span className="text-[10px] font-bold uppercase">Pressure</span>
              </div>
              <span className="font-headline text-[16px] font-extrabold text-white">58 PSI</span>
              <span className="text-[11px] text-[#dce9ff] truncate">Steady 3m Test</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex flex-col border border-white/10">
              <div className="flex items-center gap-1 text-[#85f8c4] mb-1">
                <span className="material-symbols-outlined text-[16px]">thermostat</span>
                <span className="text-[10px] font-bold uppercase">Infrared</span>
              </div>
              <span className="font-headline text-[16px] font-extrabold text-white">PASS</span>
              <span className="text-[11px] text-[#dce9ff] truncate">99.9% Thermal</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex flex-col border border-white/10">
              <div className="flex items-center gap-1 text-[#85f8c4] mb-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="text-[10px] font-bold uppercase">UPC Code</span>
              </div>
              <span className="font-headline text-[16px] font-extrabold text-white">Sec 705</span>
              <span className="text-[11px] text-[#dce9ff] truncate">100% Weld Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Processing Canvas */}
      <div className="px-4 flex flex-col gap-4 -mt-3 relative z-10">
        {/* Instant Smart Escrow Autopilot Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#82f5c1] flex items-center justify-center text-[#00714e] shadow-inner">
                <span className="material-symbols-outlined text-[28px] fill-1">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#006c4a] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a]"></span>
                  Escrow Autopilot Disbursed
                </span>
                <h3 className="font-headline text-[22px] text-[#0b1c30] font-black tracking-tight">
                  $185.00 Total
                </h3>
              </div>
            </div>
            <span className="text-xs bg-[#eff4ff] text-[#45464d] px-2.5 py-1 rounded-full font-bold border border-[#dce9ff]">
              1.8s Speed
            </span>
          </div>

          <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-1.5 border border-[#dce9ff]">
            <div className="flex items-center justify-between text-[#0b1c30]">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFxvlZYUTRU41rQ7Dv25clOv_PnX7mPJPEPIGkFJ8Xtpz5vtQWm8cL63EWFFOSIZaRwQdVzLU_hZkuC4HfkPhTnq8foPrs-Yb0lvD2oQMV-h_u2E58iXyaCyGRNCkG6v1GRKc4R6OI_y1tEheszJNCar_iRV1-wE5HuYZdCtVy9ZWIj0T8qCHEo0ypvRyd-qY5HDOgMurS1-tzZGE8EZ7Vm6QldSbjjUyjI9PqFq7EGWqhHuiMl7ir"
                  alt="Chase Bank badge"
                  className="w-6 h-6 rounded-full object-contain bg-white shadow-xs p-0.5 border"
                />
                <span className="text-xs font-bold">Alex M. • Chase Debit (...9412)</span>
              </div>
              <span className="font-headline text-[16px] text-[#006c4a] font-black">$170.20 Net</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d] text-[11px]">
              <span>Stripe Direct Micro-Rail • SMS-ETH-9842</span>
              <span className="font-semibold text-[#006c4a]">Zero Poster Hold</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#e5eeff]/70 rounded-xl border border-[#cbdbf5]">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0b1c30] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px] text-[#006c4a]">mark_email_read</span>
            </div>
            <p className="text-[12px] text-[#45464d] leading-snug">
              Poster <strong className="text-[#0b1c30]">Sarah M.</strong> received automated 4K certification breakdown & warranty card. No sign-off delays.
            </p>
          </div>
        </div>

        {/* SmS 30-Day Autonomous Warranty Guarantee Banner */}
        <div className="bg-gradient-to-br from-[#131b2e] to-[#213145] rounded-2xl p-4 text-white shadow-lg relative overflow-hidden border border-[#85f8c4]/30">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 text-white pointer-events-none">
            <span className="material-symbols-outlined text-[120px] fill-1">verified_user</span>
          </div>

          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#85f8c4] text-[20px] fill-1">shield</span>
              <span className="text-[10px] text-[#85f8c4] uppercase tracking-wider font-bold">
                SmS Underwritten Protocol
              </span>
            </div>

            <h4 className="font-headline text-[15px] font-bold text-white">
              100% Autonomous 30-Day Leak Shield
            </h4>
            <p className="text-[12px] text-[#dae2fd] leading-relaxed">
              Because SmS Computer Vision validated moisture-zero integrity, SmS assumes full civil liability. Both parties enjoy absolute peace of mind with 0% chargeback risk.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-white/15 text-white px-2.5 py-0.5 rounded-full font-mono">
                Policy #AR-90214-W
              </span>
              <span className="text-[10px] text-[#85f8c4] font-semibold">Active & Insured</span>
            </div>
          </div>
        </div>

        {/* Spatial Scope & Micro-Escrow Deltas Panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-[15px] text-[#0b1c30] font-bold">Scope & Micro-Escrow Deltas</h3>
            <span className="text-[11px] text-[#45464d] font-semibold">Real-Time Adjustments</span>
          </div>

          {/* Item 1: Base Scope */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e5eeff] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30] shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[#006c4a]">plumbing</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#0b1c30] font-bold">P-Trap & Slip Joint Replacement</span>
                <span className="text-[11px] text-[#006c4a] font-medium">AI Verified 0-Leak Validated</span>
              </div>
            </div>
            <span className="font-headline text-[15px] text-[#0b1c30] font-extrabold">$150.00</span>
          </div>

          {/* Item 2: Micro-Delta */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e5eeff] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#ffddb8] flex items-center justify-center text-[#2a1700] shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[#b87500]">add_task</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#0b1c30] font-bold">Replaced Degraded Shut-off Valve</span>
                  <span className="text-[9px] bg-[#2a1700] text-[#ffddb8] px-1.5 py-0.2 rounded font-bold">
                    Delta
                  </span>
                </div>
                <span className="text-[11px] text-[#45464d]">Approved via Poster FaceID in AR room</span>
              </div>
            </div>
            <span className="font-headline text-[15px] text-[#006c4a] font-extrabold">+$35.00</span>
          </div>

          {/* Verification Evidence */}
          <div className="bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between border border-[#dce9ff]">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxxCKUba3x3pQgwL5w3LfDjKfEJuhc188PSXjGzZWJN2NHSV8XymFFuuOcu2fX6P916osMYkr9y2z1SsuS3ZI8MiJlyIiO31EilF9yCt-7z4E8im4Qo5lGZ6QjpxeRCZXG3_8B1bBTiXdqY3H2O79LyE-mtwytoQB500dKRsLy30_tqD9taQWTXKdM7ymB_hrX1XE0_9-50_lGHrly2XV1vNoRTX7zchospwtORQdxkkUniu93AlmK"
                alt="Forensic snapshot"
                className="w-12 h-12 rounded-lg object-cover border"
              />
              <div className="flex flex-col">
                <span className="text-xs text-[#0b1c30] font-bold">Forensic 4K Spatial Evidence</span>
                <span className="text-[11px] text-[#45464d] font-mono">Hash: 8a7f9c...402 • Timestamped UTC</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowHashModal(true)}
              className="px-3 py-1.5 rounded-lg bg-white text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] border border-[#cbdbf5] transition-all shadow-xs"
            >
              Inspect
            </button>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2 mt-1">
          {/* Corridor Next Gig Match */}
          <button
            type="button"
            onClick={() => onNavigate('flight-deck')}
            className="w-full bg-[#006c4a] text-white rounded-xl py-3 px-4 shadow-lg flex items-center justify-between hover:bg-[#00714e] active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[24px] text-[#85f8c4]">radar</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#85f8c4] uppercase tracking-wider font-bold">
                  Adjacent Corridor Match
                </span>
                <span className="text-xs font-bold">Accept Next Gig (0.6 mi away)</span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-headline text-[16px] font-black text-white">
              <span>+$180</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </button>

          {/* Download PDF Certificate */}
          <button
            type="button"
            onClick={handleDownload}
            className="w-full bg-white text-[#0b1c30] rounded-xl py-3 px-4 shadow-sm border border-[#e5eeff] flex items-center justify-center gap-2 hover:bg-[#eff4ff] active:scale-[0.99] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006c4a]">
              {isDownloaded ? 'check_circle' : 'download'}
            </span>
            <span className="text-xs font-bold">
              {isDownloaded ? 'Certificate Downloaded (PDF)' : 'Download Certified Certificate (PDF)'}
            </span>
          </button>
        </div>
      </div>

      {/* Forensic Hash Modal */}
      {showHashModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-[#e5eeff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c4a]">fingerprint</span>
                <h4 className="font-headline text-[15px] font-bold text-[#0b1c30]">Cryptographic Audit Log</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowHashModal(false)}
                className="text-[#45464d] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              This proof was validated by Computer Vision Neural Core v4.8 and anchored to the SmS Escrow Ledger.
            </p>
            <div className="bg-[#eff4ff] p-3 rounded-xl font-mono text-[11px] text-[#0b1c30] break-all border border-[#dce9ff]">
              SHA-256: 8a7f9c2e01b8d4e9f76a5410c92be64188fa932cc7b1945d836209fae48107c1
            </div>
            <button
              type="button"
              onClick={() => setShowHashModal(false)}
              className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
