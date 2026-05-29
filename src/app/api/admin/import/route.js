import { cookies } from "next/headers";
import { z } from "zod";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import {
  bulkAppendDashboardRecords,
  bulkReplaceDashboardRecords,
} from "@/lib/admin-dashboard-store";
import { rowsToRecords } from "@/lib/admin-excel";
import { editableDashboardSectionMap } from "@/data/admin-dashboard-config";

const importSchema = z.object({
  section: z.string().min(1),
  mode: z.enum(["append", "replace"]).default("append"),
  rows: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;
  return isAdminSessionValid(session);
}

export async function POST(request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { ok: false, message: "Akses admin dibutuhkan." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = importSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Format data import tidak valid." },
      { status: 422 },
    );
  }

  const { section, mode, rows } = parsed.data;

  if (!editableDashboardSectionMap[section]) {
    return Response.json(
      { ok: false, message: "Modul dashboard tidak dikenal." },
      { status: 400 },
    );
  }

  let records;
  try {
    records = rowsToRecords(section, rows);
  } catch (error) {
    return Response.json(
      { ok: false, message: error.message || "Gagal membaca data Excel." },
      { status: 422 },
    );
  }

  if (records.length === 0) {
    return Response.json(
      { ok: false, message: "Tidak ada baris valid yang bisa diimport." },
      { status: 422 },
    );
  }

  try {
    const data =
      mode === "replace"
        ? await bulkReplaceDashboardRecords(section, records)
        : await bulkAppendDashboardRecords(section, records);

    return Response.json({
      ok: true,
      data,
      message: `${records.length} baris berhasil di-import (${mode}).`,
      imported: records.length,
    });
  } catch (error) {
    return Response.json(
      { ok: false, message: error.message || "Gagal menyimpan data import." },
      { status: error.status ?? 500 },
    );
  }
}
