import React from 'react';

export type ScreenId =
  | 'home'
  | 'discover'
  | 'post-task-offer'
  | 'active-task'
  | 'live-ar-scope'
  | 'ai-escrow'
  | 'flight-deck'
  | 'messages'
  | 'wallet'
  | 'task-analytics';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenScreenSwitcher?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenScreenSwitcher,
}) => {
  // If we are in immersive full-screen modes like Live AR Scope or AI Escrow, we can show specialized tab bars or allow switching
  const isSpecializedScreen =
    currentScreen === 'flight-deck' ||
    currentScreen === 'ai-escrow' ||
    currentScreen === 'live-ar-scope';

  if (isSpecializedScreen) {
    return (
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f8f9ff]/92 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-4px_16px_rgba(11,28,48,0.06)]">
        <div className="relative flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => onNavigate('flight-deck')}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all ${
              currentScreen === 'flight-deck' ? 'text-[#006c4a] font-bold' : 'text-[#45464d]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            <span className="text-[10px] mt-0.5 tracking-tight">Flight Deck</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('ai-escrow')}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all ${
              currentScreen === 'ai-escrow' ? 'text-[#006c4a] font-bold' : 'text-[#45464d]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
            <span className="text-[10px] mt-0.5 tracking-tight">AI Escrow</span>
          </button>

          <div className="relative -top-4 flex flex-col items-center">
            <button
              type="button"
              onClick={() => onNavigate('live-ar-scope')}
              className="w-13 h-13 rounded-full bg-black text-white flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.28)] hover:scale-105 active:scale-95 transition-transform"
              title="Open Live AR Scope"
            >
              <span className="material-symbols-outlined text-[26px] text-[#85f8c4]">bolt</span>
            </button>
            <span className="text-[10px] text-[#0b1c30] font-bold mt-0.5">Live Scope</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('active-task')}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 transition-all text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[24px]">fact_check</span>
            <span className="text-[10px] mt-0.5 tracking-tight">Active Task</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('wallet')}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 transition-all text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            <span className="text-[10px] mt-0.5 tracking-tight">Activity</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f8f9ff]/92 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-4px_16px_rgba(11,28,48,0.06)]">
      <div className="relative flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'home' ? 'text-[#006c4a] font-bold' : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'home' ? 'fill-1' : ''}`}>
            home
          </span>
          <span className="text-[11px] mt-0.5">Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'discover' ? 'text-[#006c4a] font-bold' : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">search</span>
          <span className="text-[11px] mt-0.5">Discover</span>
        </button>

        {/* Center Primary Action: Post Task */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            type="button"
            onClick={() => onNavigate('post-task-offer')}
            className="w-13 h-13 rounded-full bg-black text-white flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-transform"
            title="Post a Task / View Offer Specs"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
          <span className="text-[10px] text-[#0b1c30] font-bold mt-0.5">Post Task</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('messages')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'messages' ? 'text-[#006c4a] font-bold' : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">chat_bubble_outline</span>
          <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-[#006c4a]"></span>
          <span className="text-[11px] mt-0.5">Messages</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('wallet')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'wallet' ? 'text-[#006c4a] font-bold' : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          <span className="text-[11px] mt-0.5">Wallet</span>
        </button>
      </div>
    </nav>
  );
};
