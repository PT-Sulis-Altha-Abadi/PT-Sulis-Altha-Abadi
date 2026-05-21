import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buyerLeads,
  closings,
  exportProducts,
  followUps,
  monthlyTargets,
  profitSeries,
  shipments,
  suppliers,
  teamPerformance,
} from "@/data/admin-dashboard";
import {
  editableDashboardSectionKeys,
  editableDashboardSectionMap,
} from "@/data/admin-dashboard-config";

const dataDirectory = path.join(process.cwd(), ".data");
const dashboardFile = path.join(dataDirectory, "admin-dashboard.json");
const dashboardBlobStoreName = "admin-dashboard";
const dashboardBlobKey = "data/current";

const defaultDashboardData = {
  buyerLeads,
  followUps,
  closings,
  shipments,
  exportProducts,
  suppliers,
  profitSeries,
  teamPerformance,
  monthlyTargets,
};

function shouldUseNetlifyBlobs() {
  const configuredStorage = process.env.MESSAGE_STORAGE;

  if (configuredStorage) {
    return configuredStorage === "netlify-blobs";
  }

  return Boolean(process.env.SITE_ID);
}

function slugify(value, fallback) {
  const text = String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return text || fallback;
}

function getRecordLabel(record, section, index) {
  const primaryField = editableDashboardSectionMap[section]?.primaryField;
  return record?.[primaryField] ?? record?.name ?? record?.company ?? record?.label ?? index;
}

function normalizeRecord(section, record, index = 0) {
  const sectionConfig = editableDashboardSectionMap[section];
  const normalized = {
    id: record.id ?? `${section}-${index + 1}-${slugify(getRecordLabel(record, section, index), "item")}`,
  };

  for (const field of sectionConfig.fields) {
    const value = record[field.name] ?? "";

    if (field.type === "number") {
      const numberValue = Number(value);
      normalized[field.name] = Number.isFinite(numberValue) ? numberValue : 0;
    } else {
      normalized[field.name] = String(value);
    }
  }

  return normalized;
}

function normalizeDashboardData(data = {}) {
  return Object.fromEntries(
    editableDashboardSectionKeys.map((section) => {
      const records = Array.isArray(data[section]) ? data[section] : defaultDashboardData[section];

      return [section, records.map((record, index) => normalizeRecord(section, record, index))];
    }),
  );
}

async function getNetlifyBlobStore() {
  const { getStore } = await import("@netlify/blobs");

  return getStore({
    name: dashboardBlobStoreName,
    consistency: "strong",
  });
}

async function readRawDashboardData() {
  try {
    const contents = await readFile(dashboardFile, "utf8");
    const parsed = JSON.parse(contents);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

async function writeRawDashboardData(data) {
  await mkdir(dataDirectory, { recursive: true });

  const tempFile = `${dashboardFile}.${randomUUID()}.tmp`;
  await writeFile(tempFile, JSON.stringify(data, null, 2), "utf8");
  await rename(tempFile, dashboardFile);
}

async function readNetlifyDashboardData() {
  const store = await getNetlifyBlobStore();
  const data = await store.get(dashboardBlobKey, { type: "json" });

  return data && typeof data === "object" ? data : {};
}

async function writeNetlifyDashboardData(data) {
  const store = await getNetlifyBlobStore();
  await store.setJSON(dashboardBlobKey, data);
}

function assertSection(section) {
  if (!editableDashboardSectionMap[section]) {
    const error = new Error("Modul dashboard tidak dikenal.");
    error.status = 400;
    throw error;
  }
}

function sanitizeRecord(section, record) {
  assertSection(section);

  return normalizeRecord(section, {
    id: record.id,
    ...record,
  });
}

async function writeDashboardData(data) {
  const normalized = normalizeDashboardData(data);

  if (shouldUseNetlifyBlobs()) {
    await writeNetlifyDashboardData(normalized);
    return normalized;
  }

  await writeRawDashboardData(normalized);
  return normalized;
}

export async function getAdminDashboardData() {
  const data = shouldUseNetlifyBlobs()
    ? await readNetlifyDashboardData()
    : await readRawDashboardData();

  return normalizeDashboardData(data);
}

export async function createDashboardRecord(section, payload) {
  assertSection(section);

  const data = await getAdminDashboardData();
  const record = sanitizeRecord(section, {
    ...payload,
    id: randomUUID(),
  });

  data[section] = [record, ...data[section]];

  return writeDashboardData(data);
}

export async function updateDashboardRecord(section, id, payload) {
  assertSection(section);

  const data = await getAdminDashboardData();
  const records = data[section];
  const index = records.findIndex((record) => record.id === id);

  if (index === -1) {
    const error = new Error("Data yang mau diedit tidak ditemukan.");
    error.status = 404;
    throw error;
  }

  records[index] = sanitizeRecord(section, {
    ...records[index],
    ...payload,
    id,
  });

  data[section] = records;

  return writeDashboardData(data);
}

export async function deleteDashboardRecord(section, id) {
  assertSection(section);

  const data = await getAdminDashboardData();
  const records = data[section];
  const nextRecords = records.filter((record) => record.id !== id);

  if (nextRecords.length === records.length) {
    const error = new Error("Data yang mau dihapus tidak ditemukan.");
    error.status = 404;
    throw error;
  }

  data[section] = nextRecords;

  return writeDashboardData(data);
}
