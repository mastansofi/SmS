import React, { useState } from 'react';
import { ScreenId } from './BottomNav';

interface LiveArScopeProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat?: () => void;
}

interface SpatialPin {
  id: number;
  x: number;
  y: number;
  label: string;
}

export const LiveArScope: React.FC<LiveArScopeProps> = ({ onNavigate, onOpenChat }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [activeTool, setActiveTool] = useState<'laser' | 'draw' | 'camera' | 'measure'>('laser');
  const [spatialPins, setSpatialPins] = useState<SpatialPin[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showSnapshotFlash, setShowSnapshotFlash] = useState(false);

  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPin: SpatialPin = {
      id: Date.now(),
      x,
      y,
      label: `Pin #${spatialPins.length + 1} (${Math.round(x)}%, ${Math.round(y)}%)`,
    };

    setSpatialPins((prev) => [...prev, newPin]);
  };

  const handleSnapshot = () => {
    setShowSnapshotFlash(true);
    setTimeout(() => setShowSnapshotFlash(false), 250);
  };

  const handleAuthorizeDelta = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsApproved(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-32 max-w-lg mx-auto relative select-none">
      {/* Snapshot White Flash Overlay */}
      {showSnapshotFlash && (
        <div className="fixed inset-0 bg-white opacity-85 z-50 pointer-events-none transition-opacity duration-300" />
      )}

      {/* AR Camera Viewport Container */}
      <div
        onClick={handleViewportClick}
        className="relative w-full h-[520px] bg-[#131b2e] overflow-hidden cursor-crosshair"
      >
        {/* Camera Live Feed Simulation */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7BB-_lPfBVjmd8Eu68-KYR1F1lNX8yAsXGw6KmW3nOjqrjC6M5IUD7fax3PjZN_mWCpPQb6NYYyRc8xzyZoGnAhZ5tw9stqYNoRk8lulMzfa-C7lfe7T2QINzKZR0y_vp9YV-1mI3UdlbEaTPrOEER9UARAvyLgf-5aeQAkVB-h6fCZNwU1nFvWuDzaFnwB95JnpPHSBWhDJfCFiIBwWAclintLn2FEo90JNNpJLb2gPT-_k5pP7L')`,
          }}
        />

        {/* Spatial Camera HUD & Grid Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131b2e]/80 via-transparent to-[#131b2e]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(19,27,46,0.65)_100%)] pointer-events-none" />

        {/* Corner Framing Reticles */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#d3e4fe]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#d3e4fe]/60 pointer-events-none" />
        <div className="absolute bottom-20 left-3 w-5 h-5 border-b-2 border-l-2 border-[#d3e4fe]/60 pointer-events-none" />
        <div className="absolute bottom-20 right-3 w-5 h-5 border-b-2 border-r-2 border-[#d3e4fe]/60 pointer-events-none" />

        {/* TOP HUD: Tech Metadata & Signal Metrics */}
        <div className="absolute top-2 left-0 right-0 px-4 flex flex-col gap-1.5 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#131b2e]/90 backdrop-blur-md px-3 py-1 rounded-full text-white border border-[#cbdbf5]/20">
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c4a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#82f5c1]"></span>
              </div>
              <span className="text-xs font-semibold text-white tracking-tight">Alex Rivera (Master Plumber)</span>
              <span className="text-[10px] text-[#7c839b] font-mono">Cam #1</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] bg-[#dce9ff]/20 backdrop-blur-md text-[#d3e4fe] px-2 py-0.5 rounded font-mono">
                4K HDR 60fps
              </span>
              <div className="flex items-center gap-1 bg-[#131b2e]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#cbdbf5]/20">
                <span className="material-symbols-outlined text-[13px] text-[#85f8c4]">wifi_tethering</span>
                <span className="text-[10px] text-[#85f8c4] font-mono">18ms</span>
              </div>
            </div>
          </div>

          {/* Live Two-Way Audio Strip */}
          <div className="flex items-center justify-between bg-[#131b2e]/85 backdrop-blur-md rounded-xl px-3 py-1.5 text-white shadow-sm border border-[#cbdbf5]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#82f5c1] text-[18px]">graphic_eq</span>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-[#85f8c4] rounded-full animate-pulse"></span>
                <span className="w-0.5 h-3.5 bg-[#82f5c1] rounded-full animate-bounce"></span>
                <span className="w-0.5 h-1.5 bg-[#85f8c4] rounded-full animate-pulse"></span>
                <span className="w-0.5 h-3 bg-[#82f5c1] rounded-full animate-bounce"></span>
              </div>
              <span className="text-xs text-white tracking-tight font-medium">Two-Way Voice Live</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`w-7 h-7 flex items-center justify-center rounded-full active:scale-95 transition-transform ${
                  isMicMuted ? 'bg-[#ba1a1a] text-white' : 'bg-white/20 text-white'
                }`}
                title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isMicMuted ? 'mic_off' : 'mic'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                className={`w-7 h-7 flex items-center justify-center rounded-full active:scale-95 transition-transform ${
                  isSpeakerOff ? 'bg-[#ba1a1a] text-white' : 'bg-white/20 text-white'
                }`}
                title={isSpeakerOff ? 'Turn Speaker On' : 'Turn Speaker Off'}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isSpeakerOff ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('active-task')}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#ba1a1a] text-white active:scale-95 transition-transform"
                title="End AR Session"
              >
                <span className="material-symbols-outlined text-[15px]">call_end</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spatial Pointer targeting corroded shut-off valve */}
        <div className="absolute top-[46%] left-[44%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <span className="absolute w-14 h-14 rounded-full border border-[#85f8c4] animate-ping opacity-60"></span>
            <span className="absolute w-10 h-10 rounded-full border-2 border-[#85f8c4] shadow-[0_0_15px_rgba(133,248,196,0.9)] animate-spin"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></div>
          </div>

          <div className="relative -mt-1 bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-2 text-white shadow-lg flex items-start gap-1.5 max-w-[210px] border border-[#85f8c4]/40">
            <span className="material-symbols-outlined text-[#ffb95f] text-[16px] shrink-0 mt-0.5">warning</span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs text-white font-bold truncate">Alex Pointing</span>
                <span className="text-[9px] bg-[#ffdad6] text-[#93000a] px-1 rounded uppercase tracking-wider font-bold">
                  High Risk
                </span>
              </div>
              <span className="text-[11px] text-[#d3e4fe] leading-tight mt-0.5">
                Corroded Shut-Off Valve Stem
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic User Pins from Tapping */}
        {spatialPins.map((pin) => (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10 animate-fade-in"
          >
            <div className="w-4 h-4 rounded-full bg-[#85f8c4] border-2 border-white shadow-[0_0_10px_#85f8c4]"></div>
            <span className="text-[9px] bg-black/80 text-white px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
              {pin.label}
            </span>
          </div>
        ))}

        {/* Real-Time AI Autonomous Diagnostic Marker */}
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <div className="bg-[#131b2e]/85 backdrop-blur-md rounded-xl p-3 text-white shadow-md flex items-center gap-2.5 border border-[#85f8c4]/30">
            <div className="w-8 h-8 rounded-lg bg-[#85f8c4]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#85f8c4] text-[18px]">neurology</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#85f8c4] uppercase tracking-wider font-bold">Auto-Diagnostic</span>
                <span className="text-[11px] text-[#d3e4fe] font-mono">98.4% Confidence</span>
              </div>
              <p className="text-[11px] text-white line-clamp-1 leading-snug">
                Micro-fracture on valve thread. Replacement required before repressurization.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Client Collaborative AR Toolbar */}
        <div className="absolute right-3 top-28 flex flex-col gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTool('laser');
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-90 ${
              activeTool === 'laser'
                ? 'bg-[#85f8c4] text-[#002114] ring-2 ring-white'
                : 'bg-[#131b2e]/85 text-white hover:bg-white hover:text-[#0b1c30]'
            }`}
            title="Spatial Laser Pointer"
          >
            <span className="material-symbols-outlined text-[18px]">ads_click</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTool('draw');
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-90 ${
              activeTool === 'draw'
                ? 'bg-[#85f8c4] text-[#002114] ring-2 ring-white'
                : 'bg-[#131b2e]/85 text-white hover:bg-white hover:text-[#0b1c30]'
            }`}
            title="Draw Annotation"
          >
            <span className="material-symbols-outlined text-[18px]">gesture</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSnapshot();
            }}
            className="w-9 h-9 rounded-full bg-[#131b2e]/85 backdrop-blur-md text-white shadow-md flex items-center justify-center hover:bg-white hover:text-[#0b1c30] transition-all active:scale-90"
            title="Capture HD Inspection Frame"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTool('measure');
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-90 ${
              activeTool === 'measure'
                ? 'bg-[#85f8c4] text-[#002114] ring-2 ring-white'
                : 'bg-[#131b2e]/85 text-white hover:bg-white hover:text-[#0b1c30]'
            }`}
            title="Spatial Measure"
          >
            <span className="material-symbols-outlined text-[18px]">straighten</span>
          </button>
        </div>

        {/* Tap Prompt */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#131b2e]/70 backdrop-blur-sm pointer-events-none border border-white/10">
          <span className="text-[11px] text-[#d3e4fe]">Tap screen anywhere to cast 3D pin</span>
        </div>
      </div>

      {/* DYNAMIC MICRO-ESCROW DELTA BOTTOM SHEET */}
      <div className="relative w-full -mt-6 rounded-t-3xl bg-white shadow-2xl z-30 p-4 flex flex-col gap-3 border border-[#e5eeff]">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-[#cbdbf5] rounded-full mx-auto -mt-1 shrink-0" />

        {/* Technician Live Transcript Note */}
        <div className="bg-[#eff4ff] rounded-xl p-3 flex items-start gap-2.5 border border-[#dce9ff]">
          <div className="w-7 h-7 rounded-full bg-[#131b2e] text-white flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#0b1c30] font-bold">Alex Rivera</span>
              <span className="text-[10px] text-[#45464d]">42s ago</span>
            </div>
            <p className="text-[12px] text-[#0b1c30] italic mt-0.5 leading-relaxed">
              "The main P-trap repair is solid, but this shut-off valve is weeping under 50 PSI. I have the exact Moen heavy-duty replacement right on my truck if you want me to swap it now."
            </p>
          </div>
        </div>

        {/* Scope Change Notice & Delta Analysis Card */}
        <div className="bg-[#e5eeff] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#cbdbf5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b87500] text-[18px]">difference</span>
              <h2 className="font-headline text-[15px] text-[#0b1c30] font-bold">Unforeseen Scope Delta</h2>
            </div>
            <div className="flex items-center gap-1 bg-[#ffddb8] text-[#2a1700] px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87500] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase">Pending Release</span>
            </div>
          </div>

          {/* Itemized Delta Comparison */}
          <div className="bg-white rounded-xl p-3 flex flex-col gap-2 border border-[#e5eeff]">
            <div className="flex items-center justify-between text-xs text-[#45464d]">
              <span>Original Job (Kitchen Sink P-Trap)</span>
              <span className="font-semibold text-[#0b1c30]">
                $150.00 <span className="text-[#006c4a] font-normal">(Escrowed)</span>
              </span>
            </div>

            <div className="flex items-start justify-between bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff]">
              <div className="flex flex-col min-w-0 pr-2">
                <span className="text-xs text-[#0b1c30] font-bold">+ Moen 1/4-Turn Brass Valve (#4912)</span>
                <span className="text-[11px] text-[#45464d]">
                  Verified Truck Inventory • Zero Contractor Markup
                </span>
              </div>
              <span className="font-headline text-[16px] text-[#006c4a] font-black shrink-0">+$35.00</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#eff4ff]">
              <span className="text-xs text-[#0b1c30] font-bold">New Escrow Total</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-[22px] text-[#0b1c30] font-black">
                  {isApproved ? '$185.00' : '$185.00'}
                </span>
                <span className="text-xs text-[#45464d]">USD</span>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="flex items-center gap-1.5 text-[#45464d] text-[11px] px-0.5">
            <span className="material-symbols-outlined text-[#006c4a] text-[16px] shrink-0">verified_user</span>
            <span>
              Autonomous Escrow Lock: SmS AI 30-Day Complete Leak Warranty automatically extends to newly installed valve.
            </span>
          </div>
        </div>

        {/* Biometric Approval & Actions */}
        <div className="flex flex-col gap-2">
          {isApproved ? (
            <div className="w-full h-12 bg-[#006c4a] rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Delta Funded into Escrow ($185.00)</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAuthorizeDelta}
              disabled={isAuthenticating}
              className="w-full h-12 bg-black rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#131b2e] active:scale-[0.98] transition-all disabled:opacity-75"
            >
              {isAuthenticating ? (
                <>
                  <span className="material-symbols-outlined text-[20px] text-[#85f8c4] animate-spin">refresh</span>
                  <span>Authenticating FaceID...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px] text-[#85f8c4]">face</span>
                  <span>Approve & Fund +$35.00 Delta</span>
                  <span className="material-symbols-outlined text-[16px] text-[#d3e4fe]">arrow_forward</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('active-task')}
            className="w-full h-10 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center justify-center transition-colors border border-[#cbdbf5]"
          >
            Decline (Complete Original $150.00 Scope Only)
          </button>
        </div>
      </div>
    </div>
  );
};
