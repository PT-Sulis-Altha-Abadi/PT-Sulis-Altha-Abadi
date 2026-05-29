import { editableDashboardSectionMap } from "@/data/admin-dashboard-config";

export function buildSectionTemplate(sectionKey) {
  const section = editableDashboardSectionMap[sectionKey];

  if (!section) {
    throw new Error(`Section ${sectionKey} tidak dikenal.`);
  }

  const headers = section.fields.map((field) => field.label);
  const sampleRow = section.fields.map((field) => {
    if (field.type === "number") {
      return 0;
    }
    return "";
  });

  return {
    title: section.title,
    sheetName: section.shortTitle.replace(/[^A-Za-z0-9]/g, "").slice(0, 31) || "Sheet1",
    headers,
    sampleRow,
    fields: section.fields,
  };
}

export function rowsToRecords(sectionKey, rows) {
  const section = editableDashboardSectionMap[sectionKey];

  if (!section) {
    throw new Error(`Section ${sectionKey} tidak dikenal.`);
  }

  // Match by either label or field name (case insensitive, trimmed).
  const normalizeKey = (value) => String(value || "").trim().toLowerCase();
  const fieldByLabel = new Map(
    section.fields.flatMap((field) => [
      [normalizeKey(field.label), field],
      [normalizeKey(field.name), field],
    ]),
  );

  return rows
    .map((row) => {
      const record = {};
      let hasValue = false;

      Object.entries(row).forEach(([key, rawValue]) => {
        const field = fieldByLabel.get(normalizeKey(key));
        if (!field) return;

        if (field.type === "number") {
          const numberValue = Number(rawValue);
          record[field.name] = Number.isFinite(numberValue) ? numberValue : 0;
        } else {
          record[field.name] = String(rawValue ?? "").trim();
        }

        if (record[field.name] !== "" && record[field.name] !== 0) {
          hasValue = true;
        }
      });

      return hasValue ? record : null;
    })
    .filter(Boolean);
}
