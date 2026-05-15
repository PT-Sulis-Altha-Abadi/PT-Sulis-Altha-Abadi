import { cookies } from "next/headers";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/message-store";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (!isAdminSessionValid(session)) {
    return Response.json(
      {
        ok: false,
        message: "Akses admin dibutuhkan.",
      },
      { status: 401 },
    );
  }

  const messages = await getContactMessages();

  return Response.json({
    ok: true,
    messages,
  });
}
