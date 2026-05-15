import { cookies } from "next/headers";
import { adminSessionCookieName, shouldUseSecureAdminCookie } from "@/lib/admin-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureAdminCookie(),
    path: "/",
    maxAge: 0,
  });

  return Response.json({
    ok: true,
    message: "Logout berhasil.",
  });
}
