"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import {
  editableDashboardSectionKeys,
  editableDashboardSectionMap,
  editableDashboardSections,
} from "@/data/admin-dashboard-config";
import { cn } from "@/lib/utils";

const chartColors = ["#70c96f", "#3b82f6", "#fb923c", "#8b5cf6", "#22d3ee", "#f43f5e"];
const trendFractions = [0.08, 0.24, 0.42, 0.56, 0.72, 0.86, 1];

function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatMoney(value) {
  return `$${formatCompactNumber(value)}`;
}

function getStatusClass(status = "") {
  if (/hot|closing|po|aktif|selesai|proses/i.test(status)) {
    return "border-emerald-300/20 bg-emerald-400/10 text-emerald-200";
  }

  if (/negosiasi|negotiation|customs|audit|high|urgent/i.test(status)) {
    return "border-amber-300/20 bg-amber-400/10 text-amber-200";
  }

  if (/follow|stuffing|transit|medium|pesan/i.test(status)) {
    return "border-blue-300/20 bg-blue-400/10 text-blue-200";
  }

  return "border-slate-300/15 bg-slate-400/10 text-slate-200";
}

function DashboardCard({ children, className = "", id }) {
  return (
    <section
      id={id}
      className={cn(
        "h-full min-w-0 rounded-lg border border-white/10 bg-[#101b2b] p-4 shadow-2xl shadow-black/10 sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

function CardTitle({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-1 text-base font-extrabold uppercase text-white sm:text-lg">{title}</h2>
      </div>
      {action ? <div className="text-xs font-bold text-slate-400">{action}</div> : null}
    </div>
  );
}

function ProgressBar({ value, color = "bg-emerald-300" }) {
  const safeValue = Number.isFinite(Number(value)) ? Math.min(Math.max(Number(value), 0), 140) : 0;

  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(safeValue, 100)}%` }} />
    </div>
  );
}

function getDashboardList(data, sectionKey) {
  return Array.isArray(data?.[sectionKey]) ? data[sectionKey] : [];
}

function buildBlankRecord(sectionKey) {
  const section = editableDashboardSectionMap[sectionKey];

  return Object.fromEntries(
    section.fields.map((field) => [field.name, field.type === "number" ? 0 : ""]),
  );
}

function getRecordTitle(sectionKey, record) {
  const section = editableDashboardSectionMap[sectionKey];
  return record[section.primaryField] || "Data baru";
}

function createWebsiteLeads(messages) {
  return messages.map((message) => ({
    id: `website-${message.id}`,
    company: message.company || message.name,
    country: "Indonesia",
    product: "Inquiry Website",
    source: "Website Contact",
    status: "Pesan Baru",
    value: "-",
    owner: "Admin",
    nextAction: `Balas ${message.email}`,
    createdAt: message.createdAt,
    fromWebsite: true,
  }));
}

function StatCard({ label, value, helper, icon, tone = "green" }) {
  const toneClasses = {
    blue: "bg-blue-500/18 text-blue-100 ring-blue-300/25",
    green: "bg-green-500/18 text-green-100 ring-green-300/25",
    orange: "bg-orange-500/18 text-orange-100 ring-orange-300/25",
    purple: "bg-violet-500/18 text-violet-100 ring-violet-300/25",
    teal: "bg-emerald-500/18 text-emerald-100 ring-emerald-300/25",
  }[tone];

  return (
    <article className="h-full min-h-[112px] rounded-lg border border-white/10 bg-[#101b2b] p-4 shadow-2xl shadow-black/10">
      <div className="flex h-full items-center gap-3">
        <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 2xl:h-14 2xl:w-14", toneClasses)}>
          <Icon name={icon} className="h-6 w-6 2xl:h-7 2xl:w-7" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <p className="mt-2 break-words text-xl font-extrabold text-white 2xl:text-2xl">{value}</p>
          <p className="mt-1 text-xs font-bold text-emerald-200">{helper}</p>
        </div>
      </div>
    </article>
  );
}

function TopControls() {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-[#101b2b] p-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-emerald-300">Dashboard Overview</p>
        <p className="mt-1 text-sm text-slate-400">Filter cepat dan report untuk kontrol operasional.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:items-center">
        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0b1626] px-4 text-sm font-bold text-slate-200">
          Semua Produk
          <Icon name="ChevronDown" className="h-4 w-4" />
        </button>
        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0b1626] px-4 text-sm font-bold text-slate-200">
          <Icon name="CalendarDays" className="h-4 w-4" />
          Mei 2025
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0b1626] px-4 text-sm font-bold text-slate-200 transition hover:border-emerald-300/40 hover:text-white"
        >
          <Icon name="Download" className="h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
}

function buildTrendPoints(total, height, width) {
  const safeTotal = Math.max(Number(total), 1);
  return trendFractions
    .map((fraction, index) => {
      const x = (index / (trendFractions.length - 1)) * width;
      const y = height - Math.max(8, fraction * safeTotal) / safeTotal * (height - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function LineTrendChart({ allLeads, followUps, closings, shipments, className }) {
  const width = 620;
  const height = 220;
  const lines = [
    { label: "Lead", total: allLeads.length, color: "#70c96f" },
    { label: "Follow Up", total: followUps.length, color: "#3b82f6" },
    { label: "Closing", total: closings.length, color: "#fb923c" },
    { label: "Container", total: shipments.length, color: "#8b5cf6" },
  ];

  return (
    <DashboardCard className={className}>
      <CardTitle eyebrow="Performa Bulanan" title="Performa Lead & Closing" action="Bulan ini" />
      <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
        {lines.map((line) => (
          <span key={line.label} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color }} />
            {line.label}
          </span>
        ))}
      </div>
      <div className="mt-5">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
          {[40, 80, 120, 160].map((line) => (
            <line key={line} x1="0" x2={width} y1={height - line} y2={height - line} stroke="rgba(255,255,255,0.08)" />
          ))}
          {lines.map((line) => (
            <polyline
              key={line.label}
              fill="none"
              stroke={line.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points={buildTrendPoints(line.total, height - 22, width - 24)}
              transform="translate(12 8)"
            />
          ))}
          {["01 Mei", "05 Mei", "10 Mei", "15 Mei"].map((label, index) => (
            <text key={label} x={index * 190 + 10} y={height - 2} fill="#94a3b8" fontSize="12">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </DashboardCard>
  );
}

function StatusDonut({ closings, shipments, className }) {
  const items = [
    { label: "Closing", value: closings.length, color: "#70c96f" },
    { label: "Container", value: shipments.length, color: "#3b82f6" },
    { label: "Follow Up", value: Math.max(closings.filter((item) => /negosiasi|termin/i.test(item.status)).length, 1), color: "#fb923c" },
    { label: "Siap Kirim", value: shipments.filter((item) => /customs|transit|siap/i.test(item.status)).length, color: "#8b5cf6" },
  ];
  const total = Math.max(items.reduce((sum, item) => sum + item.value, 0), 1);
  const gradient = items
    .reduce(
      (state, item) => {
        const start = state.cursor;
        const end = start + (item.value / total) * 100;

        return {
          cursor: end,
          segments: [...state.segments, `${item.color} ${start}% ${end}%`],
        };
      },
      { cursor: 0, segments: [] },
    )
    .segments.join(", ");

  return (
    <DashboardCard id="closing-container" className={className}>
      <CardTitle eyebrow="Status Closing / Container" title="Status Closing / Container" />
      <div className="mt-5 grid gap-5 md:grid-cols-[170px_1fr] md:items-center xl:grid-cols-1 2xl:grid-cols-[190px_1fr]">
        <div
          className="mx-auto grid h-40 w-40 place-items-center rounded-full 2xl:h-44 2xl:w-44"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[#101b2b] text-center 2xl:h-28 2xl:w-28">
            <span>
              <span className="block text-3xl font-extrabold text-white">{total}</span>
              <span className="block text-sm text-slate-400">Total</span>
            </span>
          </div>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-bold text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-extrabold text-white">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

function ProfitPanel({ profitSeries, className }) {
  const revenue = profitSeries.reduce((sum, item) => sum + Number(item.revenue || 0), 0);
  const profit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0);
  const max = Math.max(...profitSeries.map((item) => Number(item.profit || 0)), 1);

  return (
    <DashboardCard id="profit-finance" className={className}>
      <CardTitle eyebrow="Profit Bulan Ini" title="Profit Bulan Ini" action="USD" />
      <p className="mt-5 text-3xl font-extrabold text-emerald-200">{formatMoney(profit * 1000)}</p>
      <p className="mt-1 text-sm font-bold text-emerald-200">↑ 35% dari bulan lalu</p>
      <div className="mt-6 flex h-40 items-end gap-3">
        {profitSeries.map((item, index) => (
          <div key={item.id} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full max-w-12 rounded-t bg-gradient-to-t from-emerald-600 to-emerald-300"
              style={{ height: `${Math.max(18, (Number(item.profit || 0) / max) * 100)}%` }}
            />
            <span className="text-[11px] font-bold text-slate-400">M{index + 1}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Total omset: {formatMoney(revenue * 1000)}</p>
    </DashboardCard>
  );
}

function LeadLatest({ leads, className }) {
  const rows = leads.slice(0, 7);

  return (
    <DashboardCard id="lead-tracker" className={className}>
      <CardTitle
        eyebrow="Lead Terbaru"
        title="Lead Terbaru"
        action={<Link href="#data-control" className="hover:text-white">Lihat Semua</Link>}
      />
      <div className="mt-5 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="border-b border-white/10 px-2 py-3">Buyer</th>
              <th className="border-b border-white/10 px-2 py-3">Negara</th>
              <th className="border-b border-white/10 px-2 py-3">Produk</th>
              <th className="border-b border-white/10 px-2 py-3">Sumber</th>
              <th className="border-b border-white/10 px-2 py-3">Status</th>
              <th className="border-b border-white/10 px-2 py-3">PIC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={lead.id} className="text-slate-300">
                <td className="border-b border-white/10 px-2 py-3 font-bold text-white">{lead.company}</td>
                <td className="border-b border-white/10 px-2 py-3">{lead.country}</td>
                <td className="border-b border-white/10 px-2 py-3">{lead.product}</td>
                <td className="border-b border-white/10 px-2 py-3">{lead.source}</td>
                <td className="border-b border-white/10 px-2 py-3">
                  <span className={cn("rounded-full border px-2 py-1 text-xs font-extrabold", getStatusClass(lead.status))}>
                    {lead.status}
                  </span>
                </td>
                <td className="border-b border-white/10 px-2 py-3">{lead.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 grid gap-3 lg:hidden">
        {rows.map((lead) => (
          <article key={lead.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-extrabold text-white">{lead.company}</p>
                <p className="mt-1 text-xs text-slate-400">{lead.country} - {lead.product}</p>
              </div>
              <span className={cn("rounded-full border px-2 py-1 text-xs font-extrabold", getStatusClass(lead.status))}>
                {lead.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{lead.nextAction}</p>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}

function ClosingContainerActive({ closings, shipments, className }) {
  const rows = [
    ...closings.map((item) => ({
      id: item.id,
      buyer: item.buyer,
      product: item.product,
      qty: "-",
      status: item.status,
      estimate: `${item.progress}%`,
    })),
    ...shipments.map((item) => ({
      id: item.id,
      buyer: item.route,
      product: item.cargo,
      qty: item.container,
      status: item.status,
      estimate: item.eta,
    })),
  ].slice(0, 7);

  return (
    <DashboardCard className={className}>
      <CardTitle eyebrow="Closing / Container Aktif" title="Closing / Container Aktif" action="Lihat Semua" />
      <div className="mt-5 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="border-b border-white/10 px-2 py-3">Buyer/Rute</th>
              <th className="border-b border-white/10 px-2 py-3">Produk</th>
              <th className="border-b border-white/10 px-2 py-3">Qty/Container</th>
              <th className="border-b border-white/10 px-2 py-3">Status</th>
              <th className="border-b border-white/10 px-2 py-3">Est.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="text-slate-300">
                <td className="border-b border-white/10 px-2 py-3 font-bold text-white">{row.buyer}</td>
                <td className="border-b border-white/10 px-2 py-3">{row.product}</td>
                <td className="border-b border-white/10 px-2 py-3">{row.qty}</td>
                <td className="border-b border-white/10 px-2 py-3">
                  <span className={cn("rounded-full border px-2 py-1 text-xs font-extrabold", getStatusClass(row.status))}>
                    {row.status}
                  </span>
                </td>
                <td className="border-b border-white/10 px-2 py-3">{row.estimate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 grid gap-3 lg:hidden">
        {rows.map((row) => (
          <article key={row.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <p className="font-extrabold text-white">{row.buyer}</p>
            <p className="mt-1 text-sm text-slate-400">{row.product}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className={cn("rounded-full border px-2 py-1 text-xs font-extrabold", getStatusClass(row.status))}>
                {row.status}
              </span>
              <span className="text-xs font-bold text-slate-400">{row.estimate}</span>
            </div>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}

function TeamPerformance({ team, className }) {
  return (
    <DashboardCard id="kpi-team" className={className}>
      <CardTitle eyebrow="Top Performer" title="Top Performer" action="Bulan Ini" />
      <div className="mt-5 grid gap-3">
        {team.slice(0, 5).map((member, index) => (
          <article key={member.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-extrabold text-amber-200">
                  {index + 1}
                </span>
                <div>
                  <p className="font-extrabold text-white">{member.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Lead {member.leads} / Follow Up {member.followUps} / Closing {member.closing}
                  </p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-emerald-200">{member.score}%</span>
            </div>
            <div className="mt-3">
              <ProgressBar value={member.score} color="bg-emerald-300" />
            </div>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}

function ActivityToday({ followUps, className }) {
  return (
    <DashboardCard id="follow-up" className={className}>
      <CardTitle eyebrow="Aktivitas Hari Ini" title="Aktivitas Hari Ini" />
      <div className="mt-5 grid gap-3">
        {followUps.slice(0, 5).map((item) => (
          <div key={item.id} className="grid grid-cols-[64px_1fr] gap-3 text-sm">
            <span className="font-extrabold text-emerald-200">{item.time}</span>
            <span className="leading-6 text-slate-300">{item.task} ({item.company})</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function FollowReminder({ followUps, className }) {
  return (
    <DashboardCard className={className}>
      <CardTitle eyebrow="Pengingat Follow Up" title="Pengingat Follow Up" action="Lihat Semua" />
      <div className="mt-5 grid gap-3">
        {followUps.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.04] px-3 py-3">
            <div>
              <span className={cn("rounded px-2 py-1 text-xs font-extrabold", getStatusClass(item.priority))}>
                {item.priority}
              </span>
              <p className="mt-2 text-sm font-bold text-white">{item.company}</p>
            </div>
            <span className="text-xs text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function FinancialSummary({ profitSeries, className }) {
  const revenue = profitSeries.reduce((sum, item) => sum + Number(item.revenue || 0), 0) * 1000;
  const profit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0) * 1000;
  const expense = Math.max(revenue - profit, 0);
  const margin = revenue ? (profit / revenue) * 100 : 0;

  return (
    <DashboardCard className={className}>
      <CardTitle eyebrow="Ringkasan Keuangan" title="Ringkasan Keuangan" action="USD" />
      <div className="mt-5 grid gap-3 text-sm">
        {[
          ["Total Omset", formatMoney(revenue)],
          ["Total Profit", formatMoney(profit)],
          ["Pengeluaran", formatMoney(expense)],
          ["Margin", `${margin.toFixed(2)}%`],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-slate-400">{label}</span>
            <span className="font-extrabold text-white">{value}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function TargetPanel({ targets, className }) {
  return (
    <DashboardCard className={className}>
      <CardTitle eyebrow="Target vs Realisasi" title="Target vs Realisasi" action="Bulan Ini" />
      <div className="mt-5 grid gap-4">
        {targets.map((target) => (
          <div key={target.id}>
            <div className="mb-2 flex justify-between gap-4 text-sm">
              <span className="font-bold text-slate-300">{target.label}</span>
              <span className="font-extrabold text-white">{target.value}%</span>
            </div>
            <ProgressBar value={target.value} color={Number(target.value) > 100 ? "bg-emerald-300" : "bg-lime-300"} />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function ProductSupplierSnapshot({ products, suppliers, className }) {
  return (
    <DashboardCard id="supplier-stock" className={className}>
      <CardTitle eyebrow="Supplier & Stock" title="Produk Ekspor / Supplier" />
      <div className="mt-5 grid gap-3">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-extrabold text-white">{product.name}</p>
                <p className="mt-1 text-xs text-slate-400">Stok {product.stock} / Margin {product.margin}</p>
              </div>
              <span className="font-extrabold text-emerald-200">{product.demand}%</span>
            </div>
            <div className="mt-3">
              <ProgressBar value={product.demand} color="bg-emerald-300" />
            </div>
          </div>
        ))}
        <p className="text-xs text-slate-500">{suppliers.length} supplier aktif di control center.</p>
      </div>
    </DashboardCard>
  );
}

function WebsiteMessages({ messages, className }) {
  return (
    <DashboardCard className={className}>
      <CardTitle
        eyebrow="Inbox Website"
        title="Pesan Masuk Terbaru"
        action={<Link href="/admin/messages" className="hover:text-white">{messages.length} pesan</Link>}
      />
      <div className="mt-5 grid gap-3">
        {messages.length ? (
          messages.slice(0, 4).map((message) => (
            <article key={message.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words text-sm font-extrabold text-white">{message.name}</p>
                  <p className="mt-1 break-words text-xs text-slate-400">{message.email}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">{formatDate(message.createdAt)}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{message.message}</p>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 p-5 text-sm leading-6 text-slate-400">
            Belum ada pesan masuk dari website.
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

function CrudForm({ section, formValues, onChange, onSubmit, onCancel, editingRecord, saving }) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-white/10 bg-[#0b1626] p-4">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
            {editingRecord ? "Edit Data" : "Tambah Data"}
          </p>
          <h3 className="mt-1 text-lg font-extrabold text-white">{section.title}</h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-white/25 hover:text-white"
          aria-label="Tutup form"
        >
          <Icon name="X" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {section.fields.map((field) => {
          const inputClass =
            "min-h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10";

          return (
            <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-200">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  className={cn(inputClass, "min-h-28 resize-y")}
                  value={formValues[field.name] ?? ""}
                  onChange={(event) => onChange(field, event.target.value)}
                  required={field.required}
                />
              ) : (
                <input
                  className={inputClass}
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  value={formValues[field.name] ?? ""}
                  onChange={(event) => onChange(field, event.target.value)}
                  required={field.required}
                />
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-extrabold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="Check" className="h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

function CrudRecordCard({ section, record, onEdit, onDelete, deleting }) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0b1626] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="break-words text-base font-extrabold text-white">{getRecordTitle(section.key, record)}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">{section.shortTitle}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20">
          <Icon name={section.icon} className="h-5 w-5" />
        </span>
      </div>

      <dl className="mt-4 grid gap-3">
        {section.fields.slice(0, 6).map((field) => (
          <div key={field.name} className="grid gap-1 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{field.label}</dt>
            <dd className="break-words text-sm leading-6 text-slate-200">
              {String(record[field.name] ?? "-")}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-300/20 bg-blue-400/10 px-3 text-sm font-bold text-blue-100 transition hover:border-blue-300/45"
        >
          <Icon name="Pencil" className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-red-300/20 bg-red-400/10 px-3 text-sm font-bold text-red-100 transition hover:border-red-300/45 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="Trash2" className="h-4 w-4" />
          {deleting ? "Hapus..." : "Hapus"}
        </button>
      </div>
    </article>
  );
}

function DataControlCenter({ data, setData }) {
  const [activeSectionKey, setActiveSectionKey] = useState("buyerLeads");
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formValues, setFormValues] = useState(buildBlankRecord("buyerLeads"));
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [deletingId, setDeletingId] = useState("");
  const section = editableDashboardSectionMap[activeSectionKey];
  const records = getDashboardList(data, activeSectionKey);
  const filteredRecords = records.filter((record) => {
    return JSON.stringify(record).toLowerCase().includes(query.toLowerCase());
  });

  function openCreate(sectionKey = activeSectionKey) {
    setActiveSectionKey(sectionKey);
    setEditingRecord(null);
    setFormValues(buildBlankRecord(sectionKey));
    setFormOpen(true);
    setStatus({ state: "idle", message: "" });
  }

  function openEdit(record) {
    setEditingRecord(record);
    setFormValues({ ...record });
    setFormOpen(true);
    setStatus({ state: "idle", message: "" });
  }

  function handleFieldChange(field, value) {
    setFormValues((current) => ({
      ...current,
      [field.name]: field.type === "number" ? Number(value) : value,
    }));
  }

  async function saveRecord(event) {
    event.preventDefault();

    const missingField = section.fields.find((field) => field.required && String(formValues[field.name] ?? "").trim() === "");

    if (missingField) {
      setStatus({ state: "error", message: `${missingField.label} wajib diisi.` });
      return;
    }

    setStatus({ state: "saving", message: "Menyimpan data..." });

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: editingRecord ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: activeSectionKey,
          id: editingRecord?.id,
          record: formValues,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Data gagal disimpan." });
        return;
      }

      setData(result.data);
      setFormOpen(false);
      setEditingRecord(null);
      setFormValues(buildBlankRecord(activeSectionKey));
      setStatus({ state: "success", message: result.message ?? "Data tersimpan." });
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    }
  }

  async function deleteRecord(record) {
    const ok = window.confirm(`Hapus data "${getRecordTitle(activeSectionKey, record)}"?`);

    if (!ok) {
      return;
    }

    setDeletingId(record.id);
    setStatus({ state: "saving", message: "Menghapus data..." });

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: activeSectionKey,
          id: record.id,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Data gagal dihapus." });
        return;
      }

      setData(result.data);
      setStatus({ state: "success", message: result.message ?? "Data terhapus." });
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    } finally {
      setDeletingId("");
    }
  }

  return (
    <DashboardCard id="data-control" className="scroll-mt-24">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">Control Center</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white">Kontrol Data Bisnis</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Data operasional bisa ditambah, diedit, dihapus, dan tersimpan. Ini yang menghubungkan tampilan dashboard dengan isi admin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openCreate()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-600"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Tambah Data
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {editableDashboardSections.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setActiveSectionKey(item.key);
              setFormOpen(false);
              setEditingRecord(null);
              setFormValues(buildBlankRecord(item.key));
              setQuery("");
            }}
            className={cn(
              "inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-md border px-3 text-sm font-bold transition",
              activeSectionKey === item.key
                ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-100"
                : "border-white/10 bg-[#0b1626] text-slate-300 hover:border-white/25 hover:text-white",
            )}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            <span className="min-w-0 break-words">{item.shortTitle}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {getDashboardList(data, item.key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#0b1626] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">{section.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{section.description}</p>
            </div>
            <label className="relative min-w-0 lg:w-[320px]">
              <Icon name="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari data..."
                className="min-h-11 w-full rounded-md border border-white/10 bg-white/[0.04] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10"
              />
            </label>
          </div>

          {status.message ? (
            <p
              className={cn(
                "mt-4 rounded-md border px-4 py-3 text-sm font-bold",
                status.state === "success" && "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
                status.state === "error" && "border-red-300/20 bg-red-400/10 text-red-100",
                status.state === "saving" && "border-blue-300/20 bg-blue-400/10 text-blue-100",
              )}
            >
              {status.message}
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredRecords.length ? (
              filteredRecords.map((record) => (
                <CrudRecordCard
                  key={record.id}
                  section={section}
                  record={record}
                  onEdit={() => openEdit(record)}
                  onDelete={() => deleteRecord(record)}
                  deleting={deletingId === record.id}
                />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 bg-[#0b1626] p-8 text-center md:col-span-2 2xl:col-span-3">
                <p className="text-lg font-extrabold text-white">Data belum ada</p>
                <p className="mt-2 text-sm text-slate-400">Klik tombol tambah untuk mengisi modul ini.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="xl:sticky xl:top-28 xl:self-start">
          {formOpen ? (
            <CrudForm
              section={section}
              formValues={formValues}
              onChange={handleFieldChange}
              onSubmit={saveRecord}
              onCancel={() => {
                setFormOpen(false);
                setEditingRecord(null);
                setFormValues(buildBlankRecord(activeSectionKey));
              }}
              editingRecord={editingRecord}
              saving={status.state === "saving"}
            />
          ) : (
            <div className="rounded-lg border border-white/10 bg-[#0b1626] p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">Panel Data</p>
              <h3 className="mt-2 text-xl font-extrabold text-white">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{section.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{records.length}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">Filter</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{filteredRecords.length}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openCreate()}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-extrabold text-white transition hover:bg-emerald-600"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Tambah {section.shortTitle}
              </button>
            </div>
          )}
        </aside>
      </div>
    </DashboardCard>
  );
}

export default function AdminDashboardClient({ initialData, messages }) {
  const [data, setData] = useState(initialData);
  const derived = useMemo(() => {
    const websiteLeads = createWebsiteLeads(messages);
    const buyerLeads = getDashboardList(data, "buyerLeads");
    const allLeads = [...websiteLeads, ...buyerLeads];
    const followUps = getDashboardList(data, "followUps");
    const closings = getDashboardList(data, "closings");
    const shipments = getDashboardList(data, "shipments");
    const products = getDashboardList(data, "exportProducts");
    const suppliers = getDashboardList(data, "suppliers");
    const profitSeries = getDashboardList(data, "profitSeries");
    const team = getDashboardList(data, "teamPerformance");
    const targets = getDashboardList(data, "monthlyTargets");
    const totalProfit = profitSeries.reduce((sum, item) => sum + Number(item.profit || 0), 0) * 1000;
    const hotLeads = allLeads.filter((lead) => /hot|negosiasi|negotiation|closing|pesan/i.test(lead.status)).length;

    return {
      websiteLeads,
      buyerLeads,
      allLeads,
      followUps,
      closings,
      shipments,
      products,
      suppliers,
      profitSeries,
      team,
      targets,
      totalProfit,
      hotLeads,
    };
  }, [data, messages]);

  return (
    <div className="grid gap-4 lg:gap-5">
      <TopControls />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Total Lead"
          value={String(derived.allLeads.length)}
          helper={`${derived.websiteLeads.length} dari website`}
          icon="Users2"
          tone="green"
        />
        <StatCard
          label="Follow Up"
          value={String(derived.followUps.length)}
          helper="Agenda aktif"
          icon="MessageCircle"
          tone="blue"
        />
        <StatCard
          label="Hot Lead"
          value={String(derived.hotLeads)}
          helper="Prioritas closing"
          icon="Flame"
          tone="purple"
        />
        <StatCard
          label="Closing (Proses)"
          value={String(derived.closings.length)}
          helper="Deal berjalan"
          icon="BriefcaseBusiness"
          tone="orange"
        />
        <StatCard
          label="Closing (Selesai)"
          value={`${derived.shipments.length} Container`}
          helper="Pengiriman aktif"
          icon="CircleCheck"
          tone="teal"
        />
        <StatCard
          label="Total Profit"
          value={formatMoney(derived.totalProfit)}
          helper="Update dari CRUD"
          icon="DollarSign"
          tone="blue"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <LineTrendChart
          allLeads={derived.allLeads}
          followUps={derived.followUps}
          closings={derived.closings}
          shipments={derived.shipments}
          className="xl:col-span-5 2xl:col-span-6"
        />
        <StatusDonut
          closings={derived.closings}
          shipments={derived.shipments}
          className="xl:col-span-4 2xl:col-span-3"
        />
        <ProfitPanel profitSeries={derived.profitSeries} className="xl:col-span-3" />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <LeadLatest leads={derived.allLeads} className="xl:col-span-5" />
        <ClosingContainerActive
          closings={derived.closings}
          shipments={derived.shipments}
          className="xl:col-span-4"
        />
        <TeamPerformance team={derived.team} className="xl:col-span-3" />
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <ActivityToday followUps={derived.followUps} />
        <FollowReminder followUps={derived.followUps} />
        <FinancialSummary profitSeries={derived.profitSeries} />
        <TargetPanel targets={derived.targets} />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <ProductSupplierSnapshot
          products={derived.products}
          suppliers={derived.suppliers}
          className="xl:col-span-5"
        />
        <WebsiteMessages messages={messages} className="xl:col-span-7" />
      </div>

      <DataControlCenter data={data} setData={setData} />

      <div className="rounded-lg border border-emerald-300/15 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
        Modul aktif: {editableDashboardSectionKeys.length} area kontrol. Pesan dari website depan masuk ke inbox admin dan juga tampil sebagai lead website di dashboard.
      </div>
    </div>
  );
}
