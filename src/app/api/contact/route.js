import { z } from "zod";
import { saveContactMessage } from "@/lib/message-store";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Data belum lengkap atau format email belum benar.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const message = await saveContactMessage(parsed.data);

  return Response.json({
    ok: true,
    message: "Pesan berhasil dikirim dan masuk ke admin.",
    data: {
      id: message.id,
      receivedAt: message.createdAt,
    },
  });
}
