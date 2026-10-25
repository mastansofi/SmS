import React, { useState, useEffect } from 'react';
import { ScreenId } from './BottomNav';
import confetti from 'canvas-confetti';
import { updateTaskStatus } from '../lib/taskService';

interface ActiveTaskProofProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat?: () => void;
}

export const ActiveTaskProof: React.FC<ActiveTaskProofProps> = ({ onNavigate, onOpenChat }) => {
  const [secondsOnSite, setSecondsOnSite] = useState(6320); // 1h 45m 20s
  const [cleanWorkspaceChecked, setCleanWorkspaceChecked] = useState(false);
  const [photosList, setPhotosList] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDfQb7SJFL21IMozxxf_J01fCh7mKF-MxnChgNM3ue-ji8VILMxEP3gf2clu8uU4qkDK7DmTeDiqp4_Dw2dOrb_L2hEo4KyhqBOEiG6gTEtx6X7Fm6hpBVhufwQt-uxR37jD64tbYHfX0wpOY8pSiLFg_UKjqWr3byOTrIRO887MNRFq1rN1NtfB6Q6qd-diV0eLIN0D4hzDaCXf7PeUHWFp8lKQWa1RtYEjm_KqrOz2oOXULaGvWeB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFRnWThOwaDP_R-BgUCiIyXxwYWfHLBzdESG4VE2vWWhg7dB8PD61tqU_GE6pRNdpSn7sWDZPqsm5KUfae60NOB9s4WAWBaxkPVG7c1PTbfCbGpSnv9qhR6IU6LsTBsr6lZRrvDG75HapWAHtFCgZJNUBnQoASpFT3pjaHmf1zdbmxn8F8F2LiTBiD3JN4PnFtnaNOaaqWW6lMScg9RRvCtghsM7T-RC9tffgoi5Q5v7B_jEXNPQ-',
  ]);
  const [workerNotes, setWorkerNotes] = useState(
    'Replaced 1.5-inch P-trap with new PVC kit, installed client\'s Moen fixture, run test for 5 minutes with hot and cold water. Zero leakage detected. Workspace swept clean.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live stopwatch effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsOnSite((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAddPhoto = () => {
    // Add third inspection photo
    setPhotosList((prev) => [
      ...prev,
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDC9cedW9pMDNh5-RGDSA2zvhgOGROtcA4vN4C7D8PvahDY2OYbSM2yWTicNnVVVBcp2t4l06gTlz7fyLRtPNxx5HHjBIugLNvWSetBXnj6eHOBPl-6P59oV7APykko1FQWiqfrpB4E0Lu5AhNMhLL4kjPeTNcIp3LlD5rAUNUWorsnrw4A8TisM7ni-7A2Iu0C6BxT16iPgoHZeKoh4uiikjFIP4HiWA1i6ot9S9LmH_544rFHVw7S',
    ]);
  };

  const handleSubmitProof = () => {
    setIsSubmitting(true);
    updateTaskStatus('SMS-8942', 'completed');
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#006c4a', '#85f8c4', '#ffddb8'],
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('ai-escrow');
    }, 1400);
  };

  const doneCount = 3 + (cleanWorkspaceChecked ? 1 : 0);

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto">
      {/* Status & Milestone Hero Banner */}
      <div className="px-4 pt-3 pb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] text-[10px] uppercase tracking-wider font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
              Ready for Proof
            </span>
            <span className="text-xs text-[#45464d] font-semibold">Task #SMS-8942</span>
          </div>

          <div className="flex items-center gap-1 text-[#006c4a] text-xs font-mono font-bold bg-[#82f5c1]/30 px-2.5 py-1 rounded-full border border-[#006c4a]/20">
            <span className="material-symbols-outlined text-[15px] fill-1">timer</span>
            <span>{formatTimer(secondsOnSite)} On-Site</span>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-[20px] text-[#0b1c30] font-bold leading-tight">
            Fix Leaking Pipe & Install Faucet
          </h2>
          <p className="text-[12px] text-[#45464d] mt-0.5">
            Assigned to you • Austin Downtown Central District
          </p>
        </div>

        {/* Escrow Lock Indicator Banner */}
        <div className="rounded-xl bg-[#dce9ff]/70 border border-[#cbdbf5] p-3 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#006c4a] shadow-xs">
              <span className="material-symbols-outlined text-[20px] fill-1">lock</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-[16px] text-[#0b1c30] font-black">$150.00</span>
                <span className="text-[10px] bg-[#68dba9]/40 text-[#005137] px-1.5 py-0.5 rounded font-bold">
                  Escrow Vault
                </span>
              </div>
              <p className="text-[11px] text-[#45464d]">Locked safely • Releases on Sarah M.'s approval</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ai-escrow')}
            title="Inspect Escrow Shield"
            className="text-[#45464d] hover:text-[#006c4a] p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </button>
        </div>

        {/* Interactive Progress Stepper */}
        <div className="rounded-xl bg-white p-3.5 shadow-sm border border-[#e5eeff] mt-0.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#0b1c30] font-bold">Workflow Milestones</span>
            <span className="text-xs text-[#006c4a] font-bold">Step 3 of 5</span>
          </div>

          {/* Segmented tracker bar */}
          <div className="grid grid-cols-5 gap-1.5 my-2">
            <div className="h-1.5 rounded-full bg-[#006c4a]"></div>
            <div className="h-1.5 rounded-full bg-[#006c4a]"></div>
            <div className="h-1.5 rounded-full bg-[#006c4a] relative">
              <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-[#006c4a] ring-2 ring-white"></span>
            </div>
            <div className="h-1.5 rounded-full bg-[#d3e4fe]"></div>
            <div className="h-1.5 rounded-full bg-[#d3e4fe]"></div>
          </div>

          <div className="flex justify-between items-center text-center pt-0.5 text-[10px]">
            <div className="flex flex-col items-center">
              <span className="text-[#006c4a] font-bold">✓</span>
              <span className="text-[#45464d] mt-0.5">Dispatched</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#006c4a] font-bold">✓</span>
              <span className="text-[#45464d] mt-0.5">Arrived</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-[#006c4a] text-white flex items-center justify-center text-[9px] font-bold">
                3
              </span>
              <span className="text-[#0b1c30] font-bold mt-0.5">Work Done</span>
            </div>
            <div className="flex flex-col items-center opacity-60">
              <span className="w-4 h-4 rounded-full bg-[#d3e4fe] text-[#45464d] flex items-center justify-center text-[9px]">
                4
              </span>
              <span className="text-[#45464d] mt-0.5">Review</span>
            </div>
            <div className="flex flex-col items-center opacity-60">
              <span className="w-4 h-4 rounded-full bg-[#d3e4fe] text-[#45464d] flex items-center justify-center text-[9px]">
                5
              </span>
              <span className="text-[#45464d] mt-0.5">Payout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Columns */}
      <div className="px-4 flex flex-col gap-3">
        {/* Poster Quick Card & Location Safety Strip */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdUrywrf_e3VGyEl-uE-rmO1uLHsRg8xpJHz_WvpvV8tpq8p_aG9MN_T2_bEAZacj5UOrdgkipE6dfmnGuEFR5JnUFqfdf-0xZqVtrHSvShYq7Om9C14-w7nypz89B3zl-nLI4t_WRgnIIAyBmLYYSd5bltFzjdlzzH_d_S3XqvXq7m9ZV8yfjzNa9f91vxYUgE5O6EkGqdZJTYpns2mLRoyFT8TMQMmH1Rn_IGSALx1NkRRejBJ_2"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#006c4a] text-white flex items-center justify-center text-[10px]">
                  <span className="material-symbols-outlined text-[11px]">check</span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[15px] text-[#0b1c30] font-bold">Sarah M.</span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#0b1c30] text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[12px] text-amber-500 fill-1">star</span>
                    4.9
                  </span>
                </div>
                <p className="text-[12px] text-[#45464d]">Top Poster • 14 tasks funded</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Dialing masked number for Sarah M. (Protected via SmS Relay)...')}
                title="Masked Call"
                className="w-10 h-10 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
              </button>
              <button
                type="button"
                onClick={onOpenChat || (() => onNavigate('messages'))}
                title="Task Chat"
                className="relative w-10 h-10 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center transition-transform active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px] flex items-center justify-center font-bold">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Unlocked Jobsite Address & Buzzer Note */}
          <div className="rounded-xl bg-[#eff4ff] p-3 flex flex-col gap-1.5 border border-[#dce9ff]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006c4a] text-[20px] mt-0.5">location_on</span>
                <div>
                  <p className="text-xs text-[#0b1c30] font-bold">701 Congress Ave, Unit 4B</p>
                  <p className="text-[11px] text-[#45464d]">Austin, TX 78701 • Intercom code #0412</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Opening turn-by-turn navigation in Maps...')}
                className="px-2.5 py-1.5 rounded-lg bg-white text-xs font-semibold text-[#0b1c30] flex items-center gap-1 shadow-xs border border-[#cbdbf5] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[14px] text-[#006c4a]">near_me</span>
                Maps
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-[#45464d] border-t border-[#dce9ff]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">info</span>
                Freight elevator unlocked at lobby
              </span>
              <span className="text-[#006c4a] text-[10px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                24/7 SmS Safety
              </span>
            </div>
          </div>
        </div>

        {/* Verification Sign-Off Checklist */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4a] text-[22px]">checklist_rtl</span>
              <h3 className="font-headline text-[15px] text-[#0b1c30] font-bold">
                Scope & Verification Checklist
              </h3>
            </div>
            <span className="text-xs text-[#006c4a] font-bold bg-[#85f8c4]/50 px-2 py-0.5 rounded-full">
              {doneCount} of 4 Done
            </span>
          </div>

          <p className="text-[12px] text-[#45464d]">
            All required items must be verified prior to requesting escrow release.
          </p>

          <div className="flex flex-col gap-2 mt-1">
            {/* Item 1 */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[20px] mt-0.5">check_box</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#45464d] line-through font-semibold">
                    Corroded P-trap replaced & sealed
                  </span>
                  <span className="text-[10px] text-[#006c4a] font-bold">Verified</span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">Installed new 1.5-inch PVC slip-joint assembly</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[20px] mt-0.5">check_box</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#45464d] line-through font-semibold">
                    New Moen Adler faucet installed
                  </span>
                  <span className="text-[10px] text-[#006c4a] font-bold">Verified</span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">Hot/cold supply lines snug, aerator cleared</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#006c4a] text-[20px] mt-0.5">check_box</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0b1c30] font-bold">3-minute water pressure test</span>
                  <span className="text-[10px] bg-[#ffdad6] text-[#93000a] px-1.5 py-0.5 rounded font-bold">
                    Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">Run full cold and hot flows. Zero drip detected.</p>
              </div>
            </div>

            {/* Item 4 (Interactive Pending) */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] cursor-pointer hover:bg-[#e5eeff] transition-colors">
              <input
                type="checkbox"
                checked={cleanWorkspaceChecked}
                onChange={(e) => setCleanWorkspaceChecked(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded text-[#006c4a] accent-[#006c4a]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      cleanWorkspaceChecked ? 'line-through text-[#45464d]' : 'text-[#0b1c30]'
                    }`}
                  >
                    Clean workspace & pack old parts
                  </span>
                  {cleanWorkspaceChecked ? (
                    <span className="text-[10px] text-[#006c4a] font-bold">Verified</span>
                  ) : (
                    <span className="text-[10px] bg-[#ffddb8] text-[#2a1700] px-1.5 py-0.5 rounded font-bold">
                      Action Needed
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">Wipe cabinet floor, haul away cracked P-trap</p>
              </div>
            </label>
          </div>
        </div>

        {/* Proof of Work Photos Section */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Proof of Work Photos</h3>
                <span className="w-2 h-2 rounded-full bg-[#006c4a]"></span>
              </div>
              <p className="text-[12px] text-[#45464d] mt-0.5">Visual evidence required for instant escrow release</p>
            </div>
            <span className="text-[11px] text-[#45464d] bg-[#eff4ff] px-2 py-1 rounded font-semibold">
              {photosList.length} Uploaded
            </span>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Before Photo */}
            <div className="relative rounded-xl overflow-hidden aspect-square bg-[#eff4ff] flex flex-col group shadow-sm border border-[#e5eeff]">
              <img src={photosList[0]} alt="Before photo" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-white">
                <span className="text-[10px] block truncate font-bold">Before: Leaking P-Trap</span>
                <span className="text-[9px] font-mono opacity-80 block">1:18 PM</span>
              </div>
              <span className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wide uppercase">
                Before
              </span>
            </div>

            {/* After Photo */}
            <div className="relative rounded-xl overflow-hidden aspect-square bg-[#eff4ff] flex flex-col group shadow-sm border border-[#e5eeff]">
              <img src={photosList[1]} alt="After photo" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-white">
                <span className="text-[10px] block truncate font-bold">After: Moen Installed</span>
                <span className="text-[9px] font-mono opacity-80 block">3:12 PM</span>
              </div>
              <span className="absolute top-1.5 left-1.5 bg-[#006c4a] text-white text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wide uppercase">
                After
              </span>
            </div>

            {/* Add Media Button */}
            <button
              type="button"
              onClick={handleAddPhoto}
              className="rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#cbdbf5] flex flex-col items-center justify-center p-2 text-center transition-all active:scale-95 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
              </div>
              <span className="text-[10px] text-[#0b1c30] font-bold leading-tight">
                + Add Video / Photo
              </span>
            </button>
          </div>

          {/* Watermark Badge */}
          <div className="flex items-center gap-1.5 text-[#45464d] text-xs bg-[#eff4ff] px-3 py-1.5 rounded-lg border border-[#dce9ff]">
            <span className="material-symbols-outlined text-[16px] text-[#006c4a]">verified</span>
            <span>GPS Watermark: 701 Congress Ave • Verified 3:42 PM Today</span>
          </div>

          {/* Completion Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#0b1c30] font-semibold flex items-center justify-between">
              <span>Worker Completion Notes</span>
              <span className="text-[#006c4a] font-normal text-[11px]">Visible to Sarah M.</span>
            </label>
            <textarea
              value={workerNotes}
              onChange={(e) => setWorkerNotes(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#006c4a] resize-none transition-colors border border-[#e5eeff]"
            />
          </div>
        </div>

        {/* Escrow Breakdown & Release Guarantee Card */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4a] text-[22px] fill-1">
                account_balance_wallet
              </span>
              <h3 className="font-headline text-[15px] text-[#0b1c30] font-bold">
                Earnings & Escrow Release
              </h3>
            </div>
            <span className="text-xs text-[#006c4a] bg-[#85f8c4]/50 px-2 py-0.5 rounded-full font-bold">
              Direct Payout
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-1 text-xs">
            <div className="flex justify-between items-center text-[#45464d]">
              <span>Client Escrow Balance</span>
              <span className="font-semibold text-[#0b1c30]">$150.00</span>
            </div>
            <div className="flex justify-between items-center text-[#45464d]">
              <span className="flex items-center gap-1">
                SmS Platform Fee (8%)
                <span className="material-symbols-outlined text-[14px]">help_outline</span>
              </span>
              <span className="text-[#45464d]">-$12.00</span>
            </div>
            <div className="h-px bg-[#eff4ff] my-1"></div>
            <div className="flex justify-between items-center text-[#0b1c30]">
              <div>
                <span className="font-headline text-[15px] font-extrabold text-[#0b1c30]">
                  Net Instant Payout
                </span>
                <p className="text-[11px] text-[#006c4a] font-medium">
                  Immediate transfer to Stripe Debit •••••4812
                </p>
              </div>
              <span className="font-headline text-[20px] font-black text-[#006c4a]">$138.00</span>
            </div>
          </div>

          <div className="mt-1 p-2.5 rounded-xl bg-[#eff4ff] flex items-start gap-2.5 border border-[#dce9ff]">
            <span className="material-symbols-outlined text-[#006c4a] text-[18px] mt-0.5">policy</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#0b1c30] font-semibold">24-Hour Auto-Release Protection</p>
              <p className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                Once submitted, Sarah M. has 24 hours to inspect. If no revision is raised, funds auto-disburse automatically into your connected account.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Help & Scope Change Trigger */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] text-[#45464d] border border-[#dce9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span className="text-xs">Need help or scope changed on site?</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('live-ar-scope')}
            className="text-xs text-[#006c4a] font-bold hover:underline"
          >
            Open AR Scope
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-lg border-t border-[#e5eeff] shadow-lg pb-safe">
        <div className="px-4 py-2.5 flex flex-col gap-1.5 max-w-lg mx-auto">
          {/* Primary Action CTA */}
          <button
            type="button"
            onClick={handleSubmitProof}
            disabled={isSubmitting}
            className={`w-full h-12 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              cleanWorkspaceChecked
                ? 'bg-[#006c4a] ring-4 ring-[#85f8c4] hover:bg-[#00714e]'
                : 'bg-[#006c4a] hover:opacity-95'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                <span>Submitting Forensic Logs...</span>
              </>
            ) : cleanWorkspaceChecked ? (
              <>
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>All Set! Release Payout ($138)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                <span>Submit Proof & Request Payout ($138)</span>
              </>
            )}
          </button>

          {/* Secondary Quick Trays */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onOpenChat || (() => onNavigate('messages'))}
              className="h-10 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#cbdbf5] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Message Sarah</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('live-ar-scope')}
              className="h-10 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#cbdbf5] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Adjust Scope (AR)</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-center text-[#45464d] text-[10px] pt-0.5">
            <span className="material-symbols-outlined text-[13px] text-[#006c4a]">lock</span>
            <span>Protected by SmS Escrow Vault • Zero fee guarantee on disputes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
