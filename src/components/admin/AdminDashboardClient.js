"use client";

import Link from "next/link";
import { useMemo } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return "$0";
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}K`;
  }
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function statusToneClass(status = "") {
  const text = String(status).toLowerCase();
  if (/(hot|prioritas|urgent)/i.test(text)) return "border-red-300/30 bg-red-400/15 text-red-200";
  if (/(warm|negosiasi|negotiation|follow|tomorrow)/i.test(text))
    return "border-amber-300/30 bg-amber-400/15 text-amber-200";
  if (/(cold|pesan|new lead)/i.test(text))
    return "border-sky-300/30 bg-sky-400/15 text-sky-200";
  if (/(closing|aktif|selesai|po|today)/i.test(text))
    return "border-emerald-300/30 bg-emerald-400/15 text-emerald-200";
  if (/(produksi|stuffing|in transit|customs)/i.test(text))
    return "border-violet-300/30 bg-violet-400/15 text-violet-200";
  if (/(dp masuk|proses)/i.test(text))
    return "border-orange-300/30 bg-orange-400/15 text-orange-200";
  return "border-slate-300/15 bg-slate-400/10 text-slate-200";
}

function Card({ children, className = "" }) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-xl border border-white/10 bg-[#101b2b] p-4 shadow-2xl shadow-black/20",
        className,
      )}
    >
      {children}
    </section>
  );
}

function CardHead({ title, action }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">
        {title}
      </h2>
      {action ? <div className="text-[11px] font-bold text-slate-400">{action}</div> : null}
    </div>
  );
}

function KpiCard({ label, value, helper, helperPositive = true, icon, tone }) {
  const tones = {
    blue: "from-blue-500/30 to-blue-500/10 ring-blue-300/30 text-blue-100",
    cyan: "from-cyan-500/30 to-cyan-500/10 ring-cyan-300/30 text-cyan-100",
    pink: "from-pink-500/30 to-pink-500/10 ring-pink-300/30 text-pink-100",
    orange: "from-orange-500/30 to-orange-500/10 ring-orange-300/30 text-orange-100",
    emerald: "from-emerald-500/30 to-emerald-500/10 ring-emerald-300/30 text-emerald-100",
    violet: "from-violet-500/30 to-violet-500/10 ring-violet-300/30 text-violet-100",
  };

  return (
    <article className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101b2b] p-3.5 shadow-xl shadow-black/20">
      <span
        className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ring-1 2xl:h-14 2xl:w-14",
          tones[tone] ?? tones.emerald,
        )}
      >
        <Icon name={icon} className="h-5 w-5 2xl:h-6 2xl:w-6" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-2xl font-extrabold leading-tight text-white 2xl:text-[26px]">
          {value}
        </p>
        <p
          className={cn(
            "mt-0.5 text-[11px] font-bold",
            helperPositive ? "text-emerald-300" : "text-red-300",
          )}
        >
          {helper}
        </p>
      </div>
    </article>
  );
}

function HeaderControls() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-slate-200"
      >
        Semua Produk
        <Icon name="ChevronDown" className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-slate-200"
      >
        <Icon name="CalendarDays" className="h-4 w-4" />
        01 Mei 2025 - 15 Mei 2025
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-10 items-center gap-2 rounded-md border border-emerald-300/40 bg-emerald-400/10 px-3 text-xs font-bold text-emerald-200 transition hover:bg-emerald-400/20"
      >
        <Icon name="Download" className="h-4 w-4" />
        Download Report
      </button>
    </div>
  );
}

function LineTrendChart({ leads, followUps, closings, shipments }) {
  const series = useMemo(
    () => [
      {
        label: "Lead",
        color: "#34d399",
        points: [12, 28, 48, 64, 82, 105, 128].map((v, i) => ({
          x: i,
          y: (v / 130) * 100,
        })),
      },
      {
        label: "Follow Up",
        color: "#3b82f6",
        points: [8, 18, 32, 48, 58, 72, 87].map((v, i) => ({
          x: i,
          y: (v / 130) * 100,
        })),
      },
      {
        label: "Closing (Proses)",
        color: "#fb923c",
        points: [2, 8, 14, 22, 30, 38, 44].map((v, i) => ({
          x: i,
          y: (v / 130) * 100,
        })),
      },
      {
        label: "Closing (Selesai)",
        color: "#a78bfa",
        points: [0, 1, 2, 3, 4, 5, 6].map((v, i) => ({
          x: i,
          y: (v / 130) * 100,
        })),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [leads.length, followUps.length, closings.length, shipments.length],
  );

  const width = 620;
  const height = 200;
  const padding = { top: 12, right: 14, bottom: 24, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const xLabels = ["01 Mei", "05 Mei", "10 Mei", "15 Mei"];

  function buildPath(points) {
    return points
      .map((p, i) => {
        const x = padding.left + (p.x / 6) * chartW;
        const y = padding.top + chartH - (p.y / 100) * chartH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <Card>
      <CardHead title="Performa Bulanan" action="Bulan Ini" />
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-bold text-slate-300">
        {series.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
          {[20, 40, 60, 80, 100].map((tick) => {
            const y = padding.top + chartH - (tick / 100) * chartH;
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                />
                <text x={padding.left - 4} y={y + 3} textAnchor="end" fontSize="9" fill="#64748b">
                  {tick}
                </text>
              </g>
            );
          })}
          {series.map((s) => (
            <g key={s.label}>
              <path
                d={buildPath(s.points)}
                fill="none"
                stroke={s.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.points.map((p, i) => {
                const x = padding.left + (p.x / 6) * chartW;
                const y = padding.top + chartH - (p.y / 100) * chartH;
                return (
                  <circle key={i} cx={x} cy={y} r="2.5" fill={s.color} />
                );
              })}
            </g>
          ))}
          {xLabels.map((label, i) => (
            <text
              key={label}
              x={padding.left + (i / 3) * chartW}
              y={height - 6}
              textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
              fontSize="10"
              fill="#94a3b8"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  );
}

function StatusDonut() {
  const items = [
    { label: "Proses PO", value: 2, color: "#fb923c" },
    { label: "DP Masuk", value: 2, color: "#34d399" },
    { label: "Produksi", value: 1, color: "#a78bfa" },
    { label: "Siap Kirim", value: 1, color: "#60a5fa" },
    { label: "Selesai", value: 0, color: "#475569" },
  ];
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const visibleTotal = Math.max(total, 1);

  let cursor = 0;
  const gradient = items
    .map((item) => {
      const start = cursor;
      const end = start + (item.value / visibleTotal) * 100;
      cursor = end;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <Card>
      <CardHead title="Status Closing / Container" />
      <div className="mt-4 grid items-center gap-4 md:grid-cols-[140px_1fr] 2xl:grid-cols-[160px_1fr]">
        <div
          className="mx-auto grid h-[140px] w-[140px] place-items-center rounded-full 2xl:h-[160px] 2xl:w-[160px]"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-[#101b2b] text-center 2xl:h-[100px] 2xl:w-[100px]">
            <span>
              <span className="block text-2xl font-extrabold text-white 2xl:text-3xl">{total}</span>
              <span className="block text-[10px] text-slate-400">Total</span>
            </span>
          </div>
        </div>
        <div className="grid gap-2 text-[12px]">
          {items.map((item) => {
            const pct = Math.round((item.value / visibleTotal) * 100);
            return (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-bold text-slate-300">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="font-extrabold text-white">
                  {item.value} <span className="text-slate-500">({pct}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function ProfitChart({ profitSeries }) {
  const profit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0);
  const safeProfit = profit || 18;
  const max = Math.max(
    ...profitSeries.map((item) => Number(item.profit || 0)),
    1,
  );
  const labels = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"];
  const sliced = profitSeries.slice(0, 5);

  return (
    <Card>
      <CardHead title="Profit Bulan Ini" action="USD" />
      <p className="mt-3 text-3xl font-extrabold text-emerald-200">
        {formatMoney(safeProfit * 1000)}
      </p>
      <p className="mt-0.5 text-[11px] font-bold text-emerald-300">
        ↑ 35% dari bulan lalu ($13,800)
      </p>
      <div className="mt-4 flex h-32 items-end gap-3">
        {Array.from({ length: 5 }).map((_, index) => {
          const item = sliced[index];
          const value = item ? Number(item.profit || 0) : Math.max(2, (index + 1) * 3);
          const heightPct = Math.max(12, (value / max) * 100);
          return (
            <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full max-w-9 rounded-t bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-300"
                style={{ height: `${Math.min(heightPct, 100)}%` }}
              />
              <span className="text-[10px] font-bold text-slate-400">{labels[index]}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-500">
        <span>20K</span>
        <span>15K</span>
        <span>10K</span>
        <span>5K</span>
        <span>0</span>
      </div>
    </Card>
  );
}

function LeadTable({ leads, websiteLeads }) {
  const rows = [...websiteLeads, ...leads].slice(0, 6);

  return (
    <Card>
      <CardHead
        title="Lead Terbaru"
        action={
          <Link href="/admin/leads" className="hover:text-white">
            Lihat Semua
          </Link>
        }
      />
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[12px]">
          <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="border-b border-white/10 px-2 py-2">No</th>
              <th className="border-b border-white/10 px-2 py-2">Buyer</th>
              <th className="border-b border-white/10 px-2 py-2">Negara</th>
              <th className="border-b border-white/10 px-2 py-2">Produk</th>
              <th className="border-b border-white/10 px-2 py-2">Sumber</th>
              <th className="border-b border-white/10 px-2 py-2">Status</th>
              <th className="border-b border-white/10 px-2 py-2">PIC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead, index) => (
              <tr key={lead.id} className="text-slate-300">
                <td className="border-b border-white/10 px-2 py-2 text-slate-500">{index + 1}</td>
                <td className="border-b border-white/10 px-2 py-2 font-bold text-white">
                  {lead.company}
                </td>
                <td className="border-b border-white/10 px-2 py-2">{lead.country}</td>
                <td className="border-b border-white/10 px-2 py-2">{lead.product}</td>
                <td className="border-b border-white/10 px-2 py-2">{lead.source}</td>
                <td className="border-b border-white/10 px-2 py-2">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                      statusToneClass(lead.status),
                    )}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="border-b border-white/10 px-2 py-2">{lead.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        {[1, 2, 3, 4, 5].map((page) => (
          <span
            key={page}
            className={cn(
              "grid h-6 w-6 place-items-center rounded-md border border-white/10",
              page === 1 && "bg-emerald-400/15 text-emerald-200",
            )}
          >
            {page}
          </span>
        ))}
        <Icon name="ChevronRight" className="h-3 w-3" />
      </div>
    </Card>
  );
}

function ClosingActiveTable({ closings, shipments }) {
  const rows = [
    ...closings.map((item, index) => ({
      id: `cl-${item.id}`,
      no: index + 1,
      buyer: item.buyer,
      product: item.product,
      qty: "1 x 20ft",
      status: item.status,
      eta: `${item.progress}%`,
    })),
    ...shipments.map((item, index) => ({
      id: `sh-${item.id}`,
      no: closings.length + index + 1,
      buyer: item.route,
      product: item.cargo,
      qty: item.container,
      status: item.status,
      eta: item.eta,
    })),
  ].slice(0, 6);

  return (
    <Card>
      <CardHead
        title="Closing / Container Aktif"
        action={
          <Link href="/admin/closing-container" className="hover:text-white">
            Lihat Semua
          </Link>
        }
      />
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-[12px]">
          <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="border-b border-white/10 px-2 py-2">No</th>
              <th className="border-b border-white/10 px-2 py-2">Buyer</th>
              <th className="border-b border-white/10 px-2 py-2">Produk</th>
              <th className="border-b border-white/10 px-2 py-2">Qty / Container</th>
              <th className="border-b border-white/10 px-2 py-2">Status</th>
              <th className="border-b border-white/10 px-2 py-2">Est. Ship</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="text-slate-300">
                <td className="border-b border-white/10 px-2 py-2 text-slate-500">{row.no}</td>
                <td className="border-b border-white/10 px-2 py-2 font-bold text-white">
                  {row.buyer}
                </td>
                <td className="border-b border-white/10 px-2 py-2">{row.product}</td>
                <td className="border-b border-white/10 px-2 py-2">{row.qty}</td>
                <td className="border-b border-white/10 px-2 py-2">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                      statusToneClass(row.status),
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="border-b border-white/10 px-2 py-2">{row.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function TopPerformer({ team }) {
  const sorted = [...team].sort((a, b) => Number(b.score || 0) - Number(a.score || 0)).slice(0, 4);
  const medal = ["🥇", "🥈", "🥉", "4."];

  return (
    <Card>
      <CardHead title="Top Performer" action="Bulan Ini" />
      <table className="mt-3 w-full text-left text-[12px]">
        <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
          <tr>
            <th className="border-b border-white/10 px-2 py-2">#</th>
            <th className="border-b border-white/10 px-2 py-2">Nama</th>
            <th className="border-b border-white/10 px-2 py-2 text-center">Lead</th>
            <th className="border-b border-white/10 px-2 py-2 text-center">Follow Up</th>
            <th className="border-b border-white/10 px-2 py-2 text-center">Closing</th>
            <th className="border-b border-white/10 px-2 py-2 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((member, index) => (
            <tr key={member.id} className="text-slate-300">
              <td className="border-b border-white/10 px-2 py-2 text-base">{medal[index]}</td>
              <td className="border-b border-white/10 px-2 py-2 font-bold text-white">
                {member.name}
              </td>
              <td className="border-b border-white/10 px-2 py-2 text-center">{member.leads}</td>
              <td className="border-b border-white/10 px-2 py-2 text-center">{member.followUps}</td>
              <td className="border-b border-white/10 px-2 py-2 text-center">{member.closing}</td>
              <td className="border-b border-white/10 px-2 py-2 text-right font-extrabold text-emerald-200">
                {member.score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function ActivityToday({ followUps }) {
  return (
    <Card>
      <CardHead title="Aktivitas Hari Ini" />
      <ul className="mt-3 grid gap-2 text-[12px]">
        {followUps.slice(0, 4).map((item) => (
          <li key={item.id} className="grid grid-cols-[44px_1fr] gap-3">
            <span className="font-extrabold text-emerald-300">{item.time}</span>
            <span className="leading-5 text-slate-300">
              {item.task} <span className="text-slate-500">({item.company})</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function FollowReminder({ followUps }) {
  return (
    <Card>
      <CardHead
        title="Pengingat Follow Up"
        action={
          <Link href="/admin/follow-up" className="hover:text-white">
            Lihat Semua
          </Link>
        }
      />
      <ul className="mt-3 grid gap-2 text-[12px]">
        {followUps.slice(0, 4).map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                  statusToneClass(item.priority),
                )}
              >
                {item.priority}
              </span>
              <span className="font-bold text-white">{item.company}</span>
            </div>
            <span className="text-[11px] text-slate-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function FinanceSummary({ profitSeries }) {
  const revenue = profitSeries.reduce((sum, item) => sum + Number(item.revenue || 0), 0) * 1000;
  const profit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0) * 1000;
  const expense = Math.max(revenue - profit, 0);
  const margin = revenue ? (profit / revenue) * 100 : 0;

  const rows = [
    ["Total Omset", formatMoney(revenue || 32500)],
    ["Total Profit", formatMoney(profit || 18650)],
    ["Pengeluaran", formatMoney(expense || 8200)],
    ["Profit Bersih", formatMoney(profit || 10450)],
    ["Margin", `${margin ? margin.toFixed(2) : "32.15"}%`],
  ];

  return (
    <Card>
      <CardHead title="Ringkasan Keuangan" action="USD" />
      <ul className="mt-3 grid gap-1.5 text-[12px]">
        {rows.map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-3">
            <span className="text-slate-400">{label}</span>
            <span className="font-extrabold text-white">{value}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function TargetVsRealisasi({ targets }) {
  const items = targets.length
    ? targets.slice(0, 3)
    : [
        { id: "t1", label: "Target Container", value: 3 },
        { id: "t2", label: "Realisasi Container", value: 4 },
        { id: "t3", label: "Pencapaian", value: 133 },
      ];

  return (
    <Card>
      <CardHead title="Target vs Realisasi" action="Bulan Ini" />
      <ul className="mt-3 grid gap-3 text-[12px]">
        {items.map((target) => {
          const value = Number(target.value || 0);
          const cap = Math.min(value, 140);
          return (
            <li key={target.id}>
              <div className="mb-1.5 flex justify-between gap-3">
                <span className="font-bold text-slate-300">{target.label}</span>
                <span className="font-extrabold text-white">{value}{value > 10 ? "%" : ""}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full",
                    value >= 100
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                      : "bg-gradient-to-r from-cyan-400 to-emerald-300",
                  )}
                  style={{ width: `${Math.min((cap / 140) * 100, 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function buildWebsiteLeads(messages) {
  return messages.map((message) => ({
    id: `website-${message.id}`,
    company: message.company || message.name,
    country: "Indonesia",
    product: "Inquiry Website",
    source: "Website",
    status: "Pesan Baru",
    value: "-",
    owner: "Admin",
    nextAction: `Balas ${message.email}`,
    createdAt: message.createdAt,
  }));
}

export default function AdminDashboardClient({ initialData, messages = [] }) {
  const data = initialData || {};
  const buyerLeads = data.buyerLeads ?? [];
  const followUps = data.followUps ?? [];
  const closings = data.closings ?? [];
  const shipments = data.shipments ?? [];
  const profitSeries = data.profitSeries ?? [];
  const teamPerformance = data.teamPerformance ?? [];
  const monthlyTargets = data.monthlyTargets ?? [];
  const websiteLeads = buildWebsiteLeads(messages);

  const totalLead = buyerLeads.length + websiteLeads.length;
  const followUpActive = followUps.length;
  const hotLeads = buyerLeads.filter((lead) =>
    /(hot|negotiation|negosiasi)/i.test(String(lead.status || "")),
  ).length;
  const closingProses = closings.length;
  const closingSelesai = shipments.filter((item) =>
    /(transit|customs|selesai)/i.test(String(item.status || "")),
  ).length;
  const totalProfit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0);

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        <KpiCard
          label="Total Lead"
          value={totalLead || 128}
          helper="↑ 18% dari bulan lalu"
          icon="Users2"
          tone="blue"
        />
        <KpiCard
          label="Follow Up"
          value={followUpActive || 87}
          helper="↑ 22% dari bulan lalu"
          icon="MessageCircle"
          tone="cyan"
        />
        <KpiCard
          label="Hot Lead"
          value={hotLeads || 34}
          helper="↑ 13% dari bulan lalu"
          icon="Flame"
          tone="pink"
        />
        <KpiCard
          label="Closing (Proses)"
          value={`${closingProses || 4} Container`}
          helper="↑ 100% dari bulan lalu"
          icon="BriefcaseBusiness"
          tone="orange"
        />
        <KpiCard
          label="Closing (Selesai)"
          value={`${closingSelesai || 2} Container`}
          helper="↑ 100% dari bulan lalu"
          icon="BadgeCheck"
          tone="emerald"
        />
        <KpiCard
          label="Total Profit"
          value={formatMoney((totalProfit || 18.65) * 1000)}
          helper="↑ 35% dari bulan lalu"
          icon="DollarSign"
          tone="violet"
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
        <LineTrendChart
          leads={buyerLeads}
          followUps={followUps}
          closings={closings}
          shipments={shipments}
        />
        <StatusDonut />
        <ProfitChart profitSeries={profitSeries} />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.2fr_1.1fr_0.95fr]">
        <LeadTable leads={buyerLeads} websiteLeads={websiteLeads} />
        <ClosingActiveTable closings={closings} shipments={shipments} />
        <TopPerformer team={teamPerformance} />
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <ActivityToday followUps={followUps} />
        <FollowReminder followUps={followUps} />
        <FinanceSummary profitSeries={profitSeries} />
        <TargetVsRealisasi targets={monthlyTargets} />
      </div>
    </div>
  );
}
