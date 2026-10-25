import React, { useState } from 'react';
import { ScreenId } from './BottomNav';

interface TaskChatProps {
  onNavigate: (screen: ScreenId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'alex' | 'sarah';
  text?: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  image?: string;
  isVoice?: boolean;
  voiceDuration?: string;
  isDelta?: boolean;
}

export const TaskChat: React.FC<TaskChatProps> = ({ onNavigate }) => {
  const [inputText, setInputText] = useState('');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [deltaStatus, setDeltaStatus] = useState<'pending' | 'approved' | 'declined'>('pending');
  const [isTypingVisible, setIsTypingVisible] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'sarah',
      text: 'Hi Alex! The building doorman is informed and the freight elevator is unlocked. Are you still on track for 3:00 PM?',
      time: '2:48 PM',
    },
    {
      id: 'm2',
      sender: 'alex',
      text: 'On my way! Just pulling into the visitor parking bay with the Moen replacement unit.',
      time: '2:50 PM',
      status: 'delivered',
    },
    {
      id: 'm3',
      sender: 'alex',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYxs3zO0f-xWANPp1e0r6UZMzYdjJSgn3Uhrb46dsPwUXl3FOqGRZ3e4jEXNCPLmSDYN_qkrtBZqdEklP1sY0GS7sge2Bps-3T3buj2uziuINFn0m5LVTdpaookt3Vkrqdvr2quCrEpK3VrW1RMWbToJs7-LpgSjpyAjFksfQtjAY1houqCRWynPlaj4VUHqSz9zH0eIigGl8uMaOMfRBNrug4KbIPdDMue0TV33j0nqmB_pX5OYVW',
      text: "I've arrived at Unit 4B and started testing the shut-off valve pressure.",
      time: '3:12 PM',
      status: 'read',
    },
    {
      id: 'm4',
      sender: 'sarah',
      isVoice: true,
      voiceDuration: '0:14',
      text: '"Sounds great! Please inspect the cold supply valve while you\'re under the sink as well."',
      time: '3:15 PM',
    },
    {
      id: 'm5',
      sender: 'alex',
      text: "Checked it! It's corroding around the thread. I can swap it for the Moen 1/4-turn valve in my truck for +$35.",
      time: '3:18 PM',
      status: 'read',
    },
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} PM`;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'alex',
      text: inputText.trim(),
      time: timeStr,
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate Sarah reply after 2 seconds
    setIsTypingVisible(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-reply-${Date.now()}`,
          sender: 'sarah',
          text: 'Thanks Alex! Looks good, please proceed with the swap.',
          time: timeStr,
        },
      ]);
      setIsTypingVisible(false);
    }, 2200);
  };

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto select-none">
      {/* Pinned Escrow & Task Status Hub */}
      <aside className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-xs px-4 py-2.5 flex flex-col gap-2 border-b border-[#e5eeff]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-8 h-8 rounded-full bg-[#82f5c1] text-[#00714e] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-xs text-[#0b1c30] truncate font-bold">
                  Task #SMS-8942
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-bold tracking-tight uppercase shrink-0">
                  In Progress
                </span>
              </div>
              <p className="text-[11px] text-[#45464d] truncate">
                Fix Leaking Pipe & Faucet • <span className="font-bold text-[#006c4a]">$150.00 Escrow Vault</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('active-task')}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center transition-colors"
            title="Inspect Task Checklist"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </div>

        {/* Quick Action / Operational Shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onNavigate('active-task')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs whitespace-nowrap shadow-xs border border-[#cbdbf5]"
          >
            <span className="material-symbols-outlined text-[15px] text-[#006c4a]">checklist</span>
            <span>Scope Checklist</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('live-ar-scope')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-xs font-bold whitespace-nowrap shadow-xs"
          >
            <span className="material-symbols-outlined text-[15px] text-[#b87500]">add_moderator</span>
            <span>Request Delta</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Connected to Masked Relay (+1-512-555-0199)')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs whitespace-nowrap shadow-xs border border-[#cbdbf5]"
          >
            <span className="material-symbols-outlined text-[15px] text-[#45464d]">phone_in_talk</span>
            <span>Masked Relay</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Pinning Unit 4B GeoCoordinates to map...')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#45464d] text-xs whitespace-nowrap shadow-xs border border-[#cbdbf5]"
          >
            <span className="material-symbols-outlined text-[15px]">location_on</span>
            <span>Unit 4B GeoPin</span>
          </button>
        </div>
      </aside>

      {/* Message Stream Container */}
      <section className="flex flex-col px-4 pt-3 gap-3 relative w-full">
        {/* Security Shield Notice */}
        <div className="mx-auto max-w-sm w-full bg-white/90 rounded-xl p-2.5 shadow-xs border border-[#e5eeff] flex items-start gap-2">
          <span className="material-symbols-outlined text-[#006c4a] text-[18px] shrink-0 mt-0.5">lock</span>
          <p className="text-[11px] text-[#45464d] text-left leading-snug">
            <strong className="font-bold text-[#0b1c30]">End-to-End Encrypted & SmS Escrow Guarded.</strong> All chats, diagnostic media, and quote changes are timestamped for instant automated audit and funds release protection.
          </p>
        </div>

        {/* Date Divider */}
        <div className="flex items-center justify-center my-1">
          <span className="px-3 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-[10px] uppercase tracking-wider font-bold border border-[#dce9ff]">
            Today, October 24
          </span>
        </div>

        {/* Message History */}
        {messages.map((m) => {
          const isMe = m.sender === 'alex';

          if (!isMe) {
            return (
              <div key={m.id} className="flex items-end gap-2 max-w-[85%] self-start animate-fade-in">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhVsbzz8O9ZJTYy11UvzDBZA5AlQjnLfWIP39W-nIFvyvWXep1aWebMRj9KjDjUCW6RuHJ3Wczyp0XlortXRPy_tU1YmEwRuLaoD-zPQiAidU29umA9QEnK476dU1KPpAxdsGUoL1RVHR9lulq5nWesnhE-C9sFAfNA3czNwlkg7mST_SYLN97AUstTmQXIljSxCckMTVpgtrydQMK5jlhhSJb0qvFZsK8oVbRQFEfEpBOA-E4G_wo"
                  alt="Sarah M."
                  className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 border border-white shadow-xs"
                />
                <div className="flex flex-col gap-0.5">
                  <div className="bg-white rounded-2xl rounded-bl-xs p-3 shadow-sm border border-[#e5eeff] text-[#0b1c30] flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#006c4a]">Sarah M. (Task Poster)</span>

                    {/* Audio Note */}
                    {m.isVoice && (
                      <div className="flex items-center gap-2 bg-[#eff4ff] p-2 rounded-xl border border-[#dce9ff]">
                        <button
                          type="button"
                          onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                          className="w-8 h-8 rounded-full bg-[#006c4a] text-white flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isPlayingVoice ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-0.5 h-5">
                            <span className="w-1 h-3 bg-[#006c4a] rounded-full"></span>
                            <span className="w-1 h-5 bg-[#006c4a] rounded-full"></span>
                            <span className="w-1 h-2 bg-[#006c4a] rounded-full"></span>
                            <span className="w-1 h-5 bg-[#006c4a] rounded-full"></span>
                            <span className="w-1 h-3 bg-[#cbdbf5] rounded-full"></span>
                            <span className="w-1 h-4 bg-[#cbdbf5] rounded-full"></span>
                            <span className="w-1 h-2 bg-[#cbdbf5] rounded-full"></span>
                            <span className="w-1 h-4 bg-[#cbdbf5] rounded-full"></span>
                          </div>
                          <div className="flex justify-between items-center text-[#45464d] text-[10px]">
                            <span>{m.voiceDuration}</span>
                            <span>Voice Memo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {m.text && (
                      <p className="text-[13px] leading-relaxed text-[#0b1c30]">{m.text}</p>
                    )}

                    <div className="flex items-center justify-end gap-1 pt-0.5">
                      <span className="text-[10px] text-[#45464d]">{m.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Outgoing (Alex)
          return (
            <div key={m.id} className="flex flex-col items-end gap-0.5 max-w-[88%] self-end animate-fade-in">
              <div className="bg-[#131b2e] text-white rounded-2xl rounded-br-xs p-3 shadow-sm flex flex-col gap-1.5 border border-[#131b2e]">
                {m.image && (
                  <div
                    onClick={() => onNavigate('live-ar-scope')}
                    className="relative w-full rounded-xl overflow-hidden shadow-inner cursor-pointer"
                  >
                    <img
                      src={m.image}
                      alt="Attachment"
                      className="w-full h-44 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[13px] text-[#006c4a]">verified</span>
                      <span className="text-[10px] font-bold text-[#0b1c30]">Verified 4K Spatial Log</span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">expand_content</span>
                      <span>Tap to inspect</span>
                    </div>
                  </div>
                )}

                {m.text && (
                  <p className="text-[13px] leading-relaxed text-white">{m.text}</p>
                )}

                <div className="flex items-center justify-end gap-1.5 pt-0.5">
                  <span className="text-[10px] text-[#bec6e0]">{m.time}</span>
                  {m.status === 'read' && (
                    <span className="material-symbols-outlined text-[16px] leading-none text-[#85f8c4]">
                      done_all
                    </span>
                  )}
                  {m.status === 'delivered' && (
                    <span className="material-symbols-outlined text-[16px] leading-none text-[#bec6e0]">
                      done_all
                    </span>
                  )}
                  {m.status === 'sent' && (
                    <span className="material-symbols-outlined text-[16px] leading-none text-[#bec6e0]">
                      done
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Embedded Interactive Scope Delta Card inside the Chat Stream */}
        <div className="w-full max-w-sm mx-auto my-1">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-[#cbdbf5] flex flex-col gap-2.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#b87500] animate-pulse"></span>
                Scope Delta Proposal
              </span>
              <span className="font-headline text-[15px] font-black text-[#0b1c30]">+$35.00</span>
            </div>

            <div className="flex items-start gap-2.5 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
              <div className="w-9 h-9 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[#006c4a]">plumbing</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-headline text-xs text-[#0b1c30] font-bold truncate">
                  Moen Brass 1/4-Turn Shut-Off Valve
                </h4>
                <p className="text-[11px] text-[#45464d] line-clamp-2 mt-0.5">
                  Corroded cold-supply replacement. On-van inventory serial #MO-7819. Labor included in current window.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#45464d] text-[10px] px-1">
              <span className="material-symbols-outlined text-[14px] text-[#006c4a]">security</span>
              <span>Funds hold releases automatically upon photo completion sign-off.</span>
            </div>

            {/* Interactive Actions for Delta */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDeltaStatus('declined')}
                disabled={deltaStatus !== 'pending'}
                className="h-10 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-colors border border-[#cbdbf5] disabled:opacity-60"
              >
                {deltaStatus === 'declined' ? 'Declined' : 'Decline'}
              </button>
              <button
                type="button"
                onClick={() => setDeltaStatus('approved')}
                disabled={deltaStatus !== 'pending'}
                className={`h-10 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                  deltaStatus === 'approved'
                    ? 'bg-[#006c4a] text-white'
                    : 'bg-[#006c4a] text-white hover:bg-[#00714e]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {deltaStatus === 'approved' ? 'check' : 'fingerprint'}
                </span>
                <span>{deltaStatus === 'approved' ? 'Delta Approved' : 'Approve Delta'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Typing Indicator */}
        {isTypingVisible && (
          <div className="flex items-end gap-2 max-w-[85%] self-start animate-fade-in">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRsDZxsWT2RaCh7j--u4V1N4qbnNPi77WwAmpgjRZhxVwcagJyu_kDM5YpRe585WdRgQuvsvfe7jRVFsaXBC_cx5s802j5WW0c3MoPx71Q9n8EASyc2-7ffy8WRk24zDAaOQ3ACdYu9zBf20DtywHl93Hla1u-7bgVxZVMJ5ZBrbw9x5TowaDmG9QdPVROaZLsFf2uB-UM3wEJCR3I43hmTRybwPvbertzqsOO5Soc_wNhA0khGPN4"
              alt="Sarah"
              className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 border border-white shadow-xs"
            />
            <div className="bg-white rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-sm border border-[#e5eeff] flex items-center gap-2">
              <span className="text-xs text-[#45464d] italic">Sarah is typing</span>
              <div className="flex items-center gap-1 pl-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Persistent WhatsApp-Style Mobile Input Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-lg px-4 py-2 pb-safe">
        <div className="max-w-lg mx-auto flex items-end gap-2">
          {/* Spatial Media (+) Button */}
          <button
            type="button"
            onClick={() => onNavigate('live-ar-scope')}
            title="Attach Spatial AR Photo / Scope"
            className="w-10 h-10 rounded-full bg-[#dce9ff] hover:bg-[#cbdbf5] text-[#0b1c30] flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006c4a]">add</span>
          </button>

          {/* Pill Chat Input Field */}
          <div className="flex-1 bg-white rounded-full px-3.5 py-1.5 shadow-xs border border-[#cbdbf5] flex items-center gap-2 min-h-[42px]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type message or record audio..."
              className="w-full bg-transparent border-0 outline-none text-xs text-[#0b1c30] placeholder:text-[#76777d]"
            />
            <button
              type="button"
              onClick={() => onNavigate('live-ar-scope')}
              className="w-7 h-7 rounded-full text-[#45464d] hover:text-[#006c4a] flex items-center justify-center shrink-0"
              title="Camera"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Recording 10s audio note...')}
              className="w-7 h-7 rounded-full text-[#45464d] hover:text-[#006c4a] flex items-center justify-center shrink-0"
              title="Record Voice"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-[#006c4a] hover:bg-[#00714e] text-white flex items-center justify-center shrink-0 shadow-md active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px] ml-0.5">send</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1.5 pb-0.5 text-[#45464d] text-[10px]">
          <span className="material-symbols-outlined text-[13px] text-[#006c4a]">verified</span>
          <span>Protected by SmS Instant Escrow & Masked Relay</span>
        </div>
      </footer>
    </div>
  );
};
