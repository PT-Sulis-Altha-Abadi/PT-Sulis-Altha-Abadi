import { cookies } from "next/headers";
import { z } from "zod";
import {
  createDashboardRecord,
  deleteDashboardRecord,
  getAdminDashboardData,
  updateDashboardRecord,
} from "@/lib/admin-dashboard-store";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";

const dashboardMutationSchema = z.object({
  section: z.string().min(1),
  id: z.string().optional(),
  record: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  return isAdminSessionValid(session);
}

function errorResponse(error) {
  return Response.json(
    {
      ok: false,
      message: error.message || "Terjadi kesalahan pada dashboard admin.",
    },
    { status: error.status ?? 500 },
  );
}

export async function GET() {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        ok: false,
        message: "Akses admin dibutuhkan.",
      },
      { status: 401 },
    );
  }

  const data = await getAdminDashboardData();

  return Response.json({
    ok: true,
    data,
  });
}

export async function POST(request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        ok: false,
        message: "Akses admin dibutuhkan.",
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = dashboardMutationSchema.safeParse(body);

  if (!parsed.success || !parsed.data.record) {
    return Response.json(
      {
        ok: false,
        message: "Data yang dikirim belum lengkap.",
      },
      { status: 422 },
    );
  }

  try {
    const data = await createDashboardRecord(parsed.data.section, parsed.data.record);

    return Response.json({
      ok: true,
      data,
      message: "Data berhasil ditambahkan.",
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        ok: false,
        message: "Akses admin dibutuhkan.",
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = dashboardMutationSchema.safeParse(body);

  if (!parsed.success || !parsed.data.id || !parsed.data.record) {
    return Response.json(
      {
        ok: false,
        message: "Data yang mau diedit belum lengkap.",
      },
      { status: 422 },
    );
  }

  try {
    const data = await updateDashboardRecord(parsed.data.section, parsed.data.id, parsed.data.record);

    return Response.json({
      ok: true,
      data,
      message: "Data berhasil diperbarui.",
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        ok: false,
        message: "Akses admin dibutuhkan.",
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = dashboardMutationSchema.safeParse(body);

  if (!parsed.success || !parsed.data.id) {
    return Response.json(
      {
        ok: false,
        message: "Data yang mau dihapus belum lengkap.",
      },
      { status: 422 },
    );
  }

  try {
    const data = await deleteDashboardRecord(parsed.data.section, parsed.data.id);

    return Response.json({
      ok: true,
      data,
      message: "Data berhasil dihapus.",
    });
  } catch (error) {
    return errorResponse(error);
  }
}
