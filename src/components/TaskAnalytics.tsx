import React, { useState } from 'react';
import { ScreenId } from './BottomNav';

interface TaskAnalyticsProps {
  onNavigate: (screen: ScreenId) => void;
  onBack?: () => void;
}

export const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ onNavigate, onBack }) => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '6m' | 'all'>('6m');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const monthlyEarnings = [
    { month: 'May', amount: 2450, height: 46, tasks: 38 },
    { month: 'Jun', amount: 3100, height: 58, tasks: 46 },
    { month: 'Jul', amount: 3850, height: 72, tasks: 54 },
    { month: 'Aug', amount: 4200, height: 79, tasks: 58 },
    { month: 'Sep', amount: 4650, height: 88, tasks: 62 },
    { month: 'Oct', amount: 5280, height: 100, isCurrent: true, tasks: 54 },
  ];

  const categories = [
    { name: 'Skilled Trades & Plumbing', amount: 12700, percentage: 54, color: 'bg-[#006c4a]', textColor: 'text-[#006c4a]', icon: 'plumbing', avg: '$165/task' },
    { name: 'Electrical & EV Charging', amount: 6120, percentage: 26, color: 'bg-[#0284c7]', textColor: 'text-[#0284c7]', icon: 'bolt', avg: '$195/task' },
    { name: 'Carpentry & Assembly', amount: 2820, percentage: 12, color: 'bg-[#f59e0b]', textColor: 'text-[#f59e0b]', icon: 'handyman', avg: '$95/task' },
    { name: 'Courier & Hand Carry', amount: 1890, percentage: 8, color: 'bg-[#8b5cf6]', textColor: 'text-[#8b5cf6]', icon: 'local_shipping', avg: '$52/task' },
  ];

  const funnelSteps = [
    { label: 'Dispatched Opportunities', count: 320, pct: '100%', detail: 'Within 10 mi radius' },
    { label: 'Accepted & En Route', count: 318, pct: '99.4%', detail: 'Auto-locked in flight' },
    { label: 'AR Scope Verified', count: 316, pct: '98.8%', detail: 'Computer vision zero-leak' },
    { label: 'Photo Proof Signed-off', count: 314, pct: '98.1%', detail: 'Client approved on-site' },
    { label: 'Instant Escrow Released', count: 312, pct: '97.5%', detail: '0 chargebacks, 0 disputes' },
  ];

  const handleExport = (format: 'PDF' | 'CSV') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice(`Success! Alex_Rivera_Performance_${timeframe.toUpperCase()}.${format.toLowerCase()} exported to device.`);
      setTimeout(() => setExportNotice(null), 4000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-36 gap-3.5 max-w-lg mx-auto select-none">
      {/* Timeframe Filter Switcher */}
      <section className="mt-2 bg-white p-1 rounded-2xl shadow-xs border border-[#e5eeff] flex items-center">
        {(['7d', '30d', '6m', 'all'] as const).map((tf) => {
          const labels: Record<string, string> = {
            '7d': 'Last 7 Days',
            '30d': '30 Days',
            '6m': '6 Months',
            all: 'All-Time',
          };
          return (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-[#131b2e] text-white shadow-xs'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              {labels[tf]}
            </button>
          );
        })}
      </section>

      {/* Export Notification Toast */}
      {exportNotice && (
        <div className="bg-[#006c4a] text-white p-3 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-[#85f8c4]">check_circle</span>
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Core Performance Quadrant */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#85f8c4]/40 text-[#006c4a] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h2 className="font-headline text-[15px] font-bold text-[#0b1c30]">Executive Performance</h2>
              <p className="text-[11px] text-[#45464d]">Autonomous platform compliance record</p>
            </div>
          </div>
          <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Top 1% Austin
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] flex flex-col">
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Overall Rating</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[22px] font-black text-[#0b1c30]">4.96</span>
              <span className="text-amber-500 text-[14px]">★</span>
            </div>
            <span className="text-[10px] text-[#006c4a] font-bold mt-1">98.2% 5-Star (184 reviews)</span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] flex flex-col">
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Completion Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[22px] font-black text-[#006c4a]">99.2%</span>
            </div>
            <span className="text-[10px] text-[#006c4a] font-bold mt-1">312 Completed / 314 Accepted</span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] flex flex-col">
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">On-Time Arrival</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[22px] font-black text-[#0b1c30]">98.6%</span>
            </div>
            <span className="text-[10px] text-[#45464d] mt-1">Avg 4.2 min early on-site</span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] flex flex-col">
            <span className="text-[10px] text-[#45464d] font-semibold uppercase">Escrow Release Speed</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[22px] font-black text-[#006c4a]">1.8m</span>
            </div>
            <span className="text-[10px] text-[#006c4a] font-bold mt-1">Instant CV Autopilot Verified</span>
          </div>
        </div>
      </section>

      {/* Historical Earnings Trajectory & Chart */}
      <section className="bg-[#131b2e] text-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 border border-[#85f8c4]/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#bec6e0] uppercase font-bold tracking-wider">
              Historical Earnings Velocity
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-headline text-[26px] font-black text-white">$23,530.00</span>
              <span className="text-xs text-[#85f8c4] font-bold">+28% vs previous period</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-[#85f8c4] text-[#002114] px-2 py-0.5 rounded font-bold">
              Avg $52/hr
            </span>
            <span className="block text-[10px] text-[#bec6e0] mt-0.5">Corridor peak: $74/hr</span>
          </div>
        </div>

        {/* Dynamic Bar & Curve Chart */}
        <div className="h-44 pt-6 pb-2 flex items-end justify-between gap-2.5 px-1 border-b border-white/10">
          {monthlyEarnings.map((m, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              <span
                className={`text-[9px] font-mono font-bold transition-all ${
                  m.isCurrent ? 'text-[#85f8c4] animate-pulse' : 'text-[#bec6e0] opacity-80'
                }`}
              >
                ${(m.amount / 1000).toFixed(1)}k
              </span>
              <div
                style={{ height: `${m.height}%` }}
                className={`w-full max-w-[34px] rounded-t-lg transition-all ${
                  m.isCurrent
                    ? 'bg-gradient-to-t from-[#006c4a] to-[#85f8c4] shadow-[0_0_12px_rgba(133,248,196,0.5)]'
                    : 'bg-white/20 hover:bg-white/35'
                }`}
              />
              <span className="text-[10px] font-bold text-[#bec6e0] mt-0.5">{m.month}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-[#bec6e0] pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#85f8c4]"></span>
            October Pace: $5,280 (Projected Month Record)
          </span>
          <span className="text-[11px] font-mono">312 Escrow Disbursed</span>
        </div>
      </section>

      {/* Completion Funnel Breakdown */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4a] text-[20px]">filter_alt</span>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Task Completion Funnel</h3>
          </div>
          <span className="text-xs text-[#006c4a] font-bold bg-[#85f8c4]/40 px-2.5 py-0.5 rounded-full">
            0% Dispute Rate
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dce9ff] flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0b1c30]">{step.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-headline font-bold text-[#0b1c30]">{step.count}</span>
                  <span className="text-[10px] font-bold bg-white text-[#006c4a] px-1.5 py-0.2 rounded border border-[#cbdbf5]">
                    {step.pct}
                  </span>
                </div>
              </div>
              <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                <div
                  style={{ width: step.pct }}
                  className="bg-[#006c4a] h-full rounded-full transition-all duration-500"
                />
              </div>
              <span className="text-[10px] text-[#45464d]">{step.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Category Earnings Distribution */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4a] text-[20px]">pie_chart</span>
            <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Category Yield Breakdown</h3>
          </div>
          <span className="text-[11px] text-[#45464d] font-semibold">4 Specializations</span>
        </div>

        {/* Proportional Strip */}
        <div className="w-full h-3 rounded-full overflow-hidden flex shadow-inner">
          {categories.map((c, i) => (
            <div
              key={i}
              style={{ width: `${c.percentage}%` }}
              className={`${c.color} h-full transition-opacity cursor-pointer ${
                activeCategoryIndex === i ? 'opacity-100 ring-2 ring-black' : 'opacity-90 hover:opacity-100'
              }`}
              onClick={() => setActiveCategoryIndex(activeCategoryIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Category List */}
        <div className="flex flex-col gap-2 pt-1">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => setActiveCategoryIndex(activeCategoryIndex === i ? null : i)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeCategoryIndex === i
                  ? 'bg-[#eff4ff] border-[#006c4a] shadow-xs'
                  : 'bg-white border-[#e5eeff] hover:bg-[#eff4ff]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg ${cat.color} text-white flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">{cat.name}</span>
                  <span className="text-[10px] text-[#45464d]">{cat.avg}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline text-xs font-black text-[#0b1c30] block">
                  ${cat.amount.toLocaleString()}
                </span>
                <span className={`text-[10px] font-bold ${cat.textColor}`}>
                  {cat.percentage}% of revenue
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Autonomous Warranty & Quality Shield */}
      <section className="bg-gradient-to-br from-[#eff4ff] to-[#dce9ff] rounded-2xl p-4 shadow-sm border border-[#cbdbf5] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006c4a] text-[22px]">verified_user</span>
          <h3 className="font-headline text-[15px] font-bold text-[#0b1c30]">Underwritten Quality Audit</h3>
        </div>

        <p className="text-[12px] text-[#45464d] leading-relaxed">
          Alex has maintained a <strong>0.00% warranty claim rate</strong> across 48 Computer Vision certified plumbing and electrical dispatches. SmS assumes 100% civil liability for all certified work.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-white/90 p-2.5 rounded-xl border border-[#cbdbf5]">
            <span className="text-[10px] text-[#45464d] font-bold uppercase">Repeat Customer Rate</span>
            <span className="font-headline text-[17px] font-black text-[#006c4a] block mt-0.5">68%</span>
            <span className="text-[10px] text-[#45464d]">vs 24% Austin city baseline</span>
          </div>

          <div className="bg-white/90 p-2.5 rounded-xl border border-[#cbdbf5]">
            <span className="text-[10px] text-[#45464d] font-bold uppercase">Dispute Defense</span>
            <span className="font-headline text-[17px] font-black text-[#006c4a] block mt-0.5">100% Win</span>
            <span className="text-[10px] text-[#45464d]">4K Spatial Logs backed</span>
          </div>
        </div>
      </section>

      {/* Export & Navigation Action Trays */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            className="h-11 rounded-xl bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform hover:bg-[#131b2e] disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">picture_as_pdf</span>
            <span>{isExporting ? 'Exporting...' : 'Export PDF Report'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleExport('CSV')}
            disabled={isExporting}
            className="h-11 rounded-xl bg-white text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#cbdbf5] hover:bg-[#eff4ff] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006c4a]">table_chart</span>
            <span>Export CSV</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onBack || (() => onNavigate('wallet'))}
          className="w-full h-11 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#cbdbf5] transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Earnings & Wallet</span>
        </button>
      </section>
    </div>
  );
};
