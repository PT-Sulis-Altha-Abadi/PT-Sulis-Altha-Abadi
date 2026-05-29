"use client";

import * as XLSX from "xlsx";
import { editableDashboardSectionMap } from "@/data/admin-dashboard-config";
import { buildSectionTemplate, rowsToRecords } from "@/lib/admin-excel";

function getSection(sectionKey) {
  const section = editableDashboardSectionMap[sectionKey];
  if (!section) {
    throw new Error(`Modul ${sectionKey} tidak dikenal.`);
  }
  return section;
}

export function downloadTemplate(sectionKey) {
  const template = buildSectionTemplate(sectionKey);
  const worksheet = XLSX.utils.aoa_to_sheet([template.headers, template.sampleRow]);
  worksheet["!cols"] = template.headers.map(() => ({ wch: 22 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, template.sheetName);
  XLSX.writeFile(workbook, `template-${sectionKey}.xlsx`);
}

export function exportSectionToExcel(sectionKey, records) {
  const section = getSection(sectionKey);
  const headers = section.fields.map((field) => field.label);
  const rows = records.map((record) =>
    section.fields.map((field) => {
      const value = record[field.name];
      if (field.type === "number") {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : 0;
      }
      return value ?? "";
    }),
  );

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  worksheet["!cols"] = headers.map(() => ({ wch: 22 }));

  const workbook = XLSX.utils.book_new();
  const sheetName = section.shortTitle.replace(/[^A-Za-z0-9]/g, "").slice(0, 31) || "Sheet1";
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${sectionKey}-${today}.xlsx`);
}

export async function parseExcelFile(file, sectionKey) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheet = workbook.SheetNames[0];

  if (!firstSheet) {
    throw new Error("File Excel kosong atau tidak punya sheet aktif.");
  }

  const sheet = workbook.Sheets[firstSheet];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

  if (!rows.length) {
    throw new Error("Sheet aktif tidak punya baris data.");
  }

  const records = rowsToRecords(sectionKey, rows);

  if (!records.length) {
    throw new Error(
      "Tidak ada baris valid yang bisa diimport. Pastikan header kolom sesuai template.",
    );
  }

  return records;
}
