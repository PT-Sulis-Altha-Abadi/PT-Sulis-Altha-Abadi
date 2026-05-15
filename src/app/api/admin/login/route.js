import { cookies } from "next/headers";
import { z } from "zod";
import {
  adminSessionCookieName,
  createAdminSessionToken,
  credentialsMatch,
  getAdminSessionCookieOptions,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(1).max(120),
});

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success || !credentialsMatch(parsed.data.username, parsed.data.password)) {
    return Response.json(
      {
        ok: false,
        message: "Username atau password admin belum benar.",
      },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    adminSessionCookieName,
    createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );

  return Response.json({
    ok: true,
    message: "Login berhasil.",
  });
}
