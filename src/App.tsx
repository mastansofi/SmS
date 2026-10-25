import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, ScreenId } from './components/BottomNav';
import { ScreenSwitcherModal } from './components/ScreenSwitcherModal';

import { HomeFeed } from './components/HomeFeed';
import { DiscoverTasks } from './components/DiscoverTasks';
import { PostTaskOffer } from './components/PostTaskOffer';
import { ActiveTaskProof } from './components/ActiveTaskProof';
import { LiveArScope } from './components/LiveArScope';
import { AiEscrowHud } from './components/AiEscrowHud';
import { FlightDeck } from './components/FlightDeck';
import { TaskChat } from './components/TaskChat';
import { DoerWallet } from './components/DoerWallet';
import { TaskAnalytics } from './components/TaskAnalytics';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeRole, setActiveRole] = useState<'post' | 'work'>('work');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [history, setHistory] = useState<ScreenId[]>(['home']);

  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // current
      const prev = newHistory[newHistory.length - 1] || 'home';
      setHistory(newHistory);
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeaderConfig = () => {
    switch (currentScreen) {
      case 'home':
        return {
          variant: 'standard' as const,
          activeRole,
        };
      case 'discover':
        return {
          variant: 'standard' as const,
          activeRole,
        };
      case 'post-task-offer':
        return {
          variant: 'back' as const,
          title: 'Post Task',
          subtitle: 'Task Details & Offer Proposal',
          onBack: handleBack,
          rightAction: (
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(true)}
              className="px-2 py-1 bg-[#dce9ff] text-[#0b1c30] text-[11px] font-bold rounded-lg border border-[#cbdbf5] hover:bg-[#cbdbf5]"
            >
              Screens (9)
            </button>
          ),
        };
      case 'active-task':
        return {
          variant: 'back' as const,
          title: 'Active Task',
          subtitle: 'Sign-Off & Escrow Release',
          onBack: handleBack,
          rightAction: (
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(true)}
              className="px-2 py-1 bg-[#dce9ff] text-[#0b1c30] text-[11px] font-bold rounded-lg border border-[#cbdbf5] hover:bg-[#cbdbf5]"
            >
              Screens (9)
            </button>
          ),
        };
      case 'live-ar-scope':
        return {
          variant: 'back' as const,
          title: 'Live AR Scope Session',
          subtitle: '256-bit P2P Escrow Tunnel',
          onBack: handleBack,
          rightAction: (
            <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded-full border border-[#cbdbf5]">
              <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
              <span className="text-[10px] text-[#006c4a] font-bold uppercase">Live Scope</span>
            </div>
          ),
        };
      case 'ai-escrow':
        return {
          variant: 'autonomous' as const,
          title: 'AI Escrow HUD',
          activeRole,
        };
      case 'flight-deck':
        return {
          variant: 'autonomous' as const,
          title: 'Flight Deck',
          activeRole,
        };
      case 'messages':
        return {
          variant: 'back' as const,
          title: 'Marcus Vance',
          subtitle: 'Online • Assigned Worker',
          onBack: handleBack,
          rightAction: (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => alert('Starting masked encrypted voice call with Marcus...')}
                className="w-8 h-8 rounded-full hover:bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('live-ar-scope')}
                className="w-8 h-8 rounded-full hover:bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
              </button>
            </div>
          ),
        };
      case 'wallet':
        return {
          variant: 'standard' as const,
          activeRole,
        };
      case 'task-analytics':
        return {
          variant: 'back' as const,
          title: 'Task Analytics',
          subtitle: 'Performance & Earnings History',
          onBack: handleBack,
          rightAction: (
            <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded-full border border-[#cbdbf5]">
              <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
              <span className="text-[10px] text-[#006c4a] font-bold uppercase">Live Audit</span>
            </div>
          ),
        };
      default:
        return {
          variant: 'standard' as const,
          activeRole,
        };
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Top Floating App Banner with Screen Switcher Quick Launcher */}
      <div className="bg-[#131b2e] text-white text-[11px] px-3 py-1 flex items-center justify-between z-50">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping" />
          <span className="font-bold text-[#85f8c4]">SmS Kinetic System</span>
          <span className="text-[#7c839b] hidden xs:inline">• Autonomous Escrow & Task Marketplace</span>
        </div>
        <button
          type="button"
          onClick={() => setIsSwitcherOpen(true)}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-white font-bold transition-colors text-[10px]"
        >
          <span className="material-symbols-outlined text-[14px]">view_carousel</span>
          <span>View All 10 Screens</span>
        </button>
      </div>

      {/* Main App Bar */}
      <Header
        variant={headerConfig.variant}
        title={headerConfig.title}
        subtitle={headerConfig.subtitle}
        onBack={headerConfig.onBack}
        activeRole={activeRole}
        onRoleChange={(newRole) => {
          setActiveRole(newRole);
          if (newRole === 'post') {
            navigateTo('post-task-offer');
          } else {
            navigateTo('discover');
          }
        }}
        onProfileClick={() => navigateTo('wallet')}
        rightAction={headerConfig.rightAction}
      />

      {/* Screen Render Canvas */}
      <main className="flex-1 w-full pt-16">
        {currentScreen === 'home' && (
          <HomeFeed
            onNavigate={navigateTo}
            onSelectTask={() => navigateTo('post-task-offer')}
          />
        )}

        {currentScreen === 'discover' && (
          <DiscoverTasks
            onNavigate={navigateTo}
            onSelectTask={() => navigateTo('post-task-offer')}
          />
        )}

        {currentScreen === 'post-task-offer' && (
          <PostTaskOffer
            onNavigate={navigateTo}
            onOpenChat={() => navigateTo('messages')}
          />
        )}

        {currentScreen === 'active-task' && (
          <ActiveTaskProof
            onNavigate={navigateTo}
            onOpenChat={() => navigateTo('messages')}
          />
        )}

        {currentScreen === 'live-ar-scope' && (
          <LiveArScope
            onNavigate={navigateTo}
            onOpenChat={() => navigateTo('messages')}
          />
        )}

        {currentScreen === 'ai-escrow' && (
          <AiEscrowHud
            onNavigate={navigateTo}
            onOpenChat={() => navigateTo('messages')}
          />
        )}

        {currentScreen === 'flight-deck' && (
          <FlightDeck
            onNavigate={navigateTo}
            onOpenChat={() => navigateTo('messages')}
          />
        )}

        {currentScreen === 'messages' && (
          <TaskChat onNavigate={navigateTo} />
        )}

        {currentScreen === 'wallet' && (
          <DoerWallet
            onNavigate={navigateTo}
            onOpenProof={() => navigateTo('active-task')}
          />
        )}

        {currentScreen === 'task-analytics' && (
          <TaskAnalytics
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
      />

      {/* Screen Switcher Modal */}
      <ScreenSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={navigateTo}
      />
    </div>
  );
}
