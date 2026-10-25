import React from 'react';
import { ScreenId } from './BottomNav';

interface ScreenSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

interface ScreenOption {
  id: ScreenId;
  title: string;
  badge: string;
  category: string;
  icon: string;
  description: string;
}

const SCREENS: ScreenOption[] = [
  {
    id: 'home',
    title: '1. Home Feed & Marketplace',
    badge: '3D Hero',
    category: 'Marketplace',
    icon: 'home',
    description: '3D kinetic escrow core, categories, urgent nearby tasks, 4-step workflow, FAQ',
  },
  {
    id: 'discover',
    title: '2. Discover / Task Radar',
    badge: '48 Nearby',
    category: 'Browse',
    icon: 'search',
    description: 'List View vs Map Radar, interactive price pins, proximity slider & filters drawer',
  },
  {
    id: 'post-task-offer',
    title: '3. Post Task / Offer Proposal',
    badge: '$150 Escrow',
    category: 'Poster & Bids',
    icon: 'send_and_archive',
    description: 'Task specifications, Sarah M. profile, Austin benchmarks, bid calculator & submission',
  },
  {
    id: 'active-task',
    title: '4. Active Task / Proof Sign-Off',
    badge: 'Ready for Proof',
    category: 'Execution',
    icon: 'task_alt',
    description: 'Live stopwatch, 5-step milestone stepper, interactive checklist, before/after proof photos',
  },
  {
    id: 'live-ar-scope',
    title: '5. Live AR Scope Session',
    badge: '256-bit P2P',
    category: 'Real-Time AR',
    icon: 'videocam',
    description: '4K video feed, two-way audio, 3D laser pointer, auto-diagnostic, 1-tap FaceID delta approval',
  },
  {
    id: 'ai-escrow',
    title: '6. AI Escrow / AR Inspection HUD',
    badge: 'CV Neural Core',
    category: 'Autonomous',
    icon: 'view_in_ar',
    description: 'Computer vision neural core, 58 PSI pressure audit, instant $185 escrow disbursement',
  },
  {
    id: 'flight-deck',
    title: '7. Flight Deck / Flash Dispatch',
    badge: '38s Countdown',
    category: 'Autonomous',
    icon: 'rocket_launch',
    description: 'Van loadout, corridor yield surge map, truck parts inventory HUD, digital NFC gate key',
  },
  {
    id: 'messages',
    title: '8. Task Chat & Scope Delta',
    badge: 'Encrypted',
    category: 'Communication',
    icon: 'chat',
    description: 'WhatsApp-grade chat, 4K spatial logs, audio waveform memo, in-stream delta card +$35',
  },
  {
    id: 'wallet',
    title: '9. Doer Profile & Earnings Wallet',
    badge: '$1,482.50',
    category: 'Earnings',
    icon: 'account_balance_wallet',
    description: 'Instant dispatch toggle, weekly velocity chart, instant debit cashout, client reviews',
  },
  {
    id: 'task-analytics',
    title: '10. Task Analytics & Performance',
    badge: 'Insights',
    category: 'Analytics',
    icon: 'insights',
    description: 'Completion rate funnel, historical earnings trajectory, category yield & quality audits',
  },
];

export const ScreenSwitcherModal: React.FC<ScreenSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#f8f9ff] rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-[#e5eeff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006c4a] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-[16px] text-[#0b1c30]">All SmS App Screens</h3>
              <p className="text-[12px] text-[#45464d]">Tap any screen to test and inspect interactions</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List of screens */}
        <div className="p-4 overflow-y-auto space-y-2.5 max-h-[60vh] no-scrollbar">
          {SCREENS.map((screen) => {
            const isSelected = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  onSelectScreen(screen.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${
                  isSelected
                    ? 'bg-white border-[#006c4a] shadow-md ring-2 ring-[#006c4a]/10'
                    : 'bg-white border-[#e5eeff] hover:bg-[#eff4ff] hover:border-[#cbdbf5]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#006c4a] text-white' : 'bg-[#e5eeff] text-[#006c4a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{screen.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-headline font-bold text-[14px] text-[#0b1c30] truncate">
                      {screen.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] shrink-0">
                      {screen.badge}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#45464d] line-clamp-2 leading-relaxed">
                    {screen.description}
                  </p>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[#006c4a] text-[20px] shrink-0 self-center">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#eff4ff] border-t border-[#e5eeff] text-center text-[11px] text-[#45464d] flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[#006c4a] text-[15px]">verified</span>
          <span>Complete 9-Screen SmS Task & Escrow Suite Active</span>
        </div>
      </div>
    </div>
  );
};
