import {
  company,
  constructionFeatures,
  constructionServices,
  divisions,
  exportMarkets,
  faqs,
  spicesProducts,
  telecomFeatures,
  telecomServices,
} from "@/data/site";

export const runtime = "nodejs";

const maxQuestionLength = 800;
const inceptionEndpoint = "https://api.inceptionlabs.ai/v1/chat/completions";

function toList(items, mapper) {
  return items.map(mapper).join(", ");
}

function buildWebsiteContext() {
  const divisionText = divisions
    .map((division) => `${division.title}: ${division.subtitle}`)
    .join("; ");
  const faqText = faqs
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  return `
Konteks website PT Sulis Altha Abadi:
- Nama perusahaan: ${company.name}
- Tagline: ${company.tagline}
- Lokasi: ${company.location}
- Alamat: ${company.address}
- WhatsApp: ${company.phone}
- Email: ${company.email}
- Divisi usaha: ${divisionText}
- Produk Altha Spices Export: ${toList(spicesProducts, (item) => `${item.name} (${item.en})`)}
- Pasar ekspor: ${toList(exportMarkets, (item) => item.name)}
- Layanan konstruksi: ${toList(constructionServices, (item) => item.title)}
- Keunggulan konstruksi: ${toList(constructionFeatures, (item) => item.title)}
- Layanan telekomunikasi: ${toList(telecomServices, (item) => item.title)}
- Keunggulan telekomunikasi: ${toList(telecomFeatures, (item) => item.title)}

FAQ resmi:
${faqText}
`.trim();
}

function extractAiText(payload) {
  return String(payload?.choices?.[0]?.message?.content ?? "").trim();
}

export async function POST(request) {
  try {
    const apiKey = process.env.INCEPTION_API_KEY;
    const model = process.env.INCEPTION_MODEL || "mercury-2";

    if (!apiKey) {
      return Response.json(
        { answer: "AI belum aktif. INCEPTION_API_KEY belum diatur di server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const question = String(body?.question ?? "").trim();

    if (!question) {
      return Response.json(
        { answer: "Silakan tulis pertanyaan terlebih dahulu." },
        { status: 400 },
      );
    }

    if (question.length > maxQuestionLength) {
      return Response.json(
        { answer: `Pertanyaan terlalu panjang. Maksimal ${maxQuestionLength} karakter.` },
        { status: 400 },
      );
    }

    const prompt = `
Kamu adalah asisten AI untuk website ${company.name}.
Jawab dalam Bahasa Indonesia yang ramah, ringkas, dan profesional.
Utamakan informasi dari konteks website di bawah.
Jika pertanyaan di luar konteks website/perusahaan, jawab singkat dan arahkan user menghubungi perusahaan lewat WhatsApp atau Email.
Jangan mengarang data harga, kontrak, legal, stok real-time, atau jadwal yang tidak tersedia.

${buildWebsiteContext()}

Pertanyaan user:
${question}
`.trim();

    const response = await fetch(inceptionEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.35,
        max_tokens: 420,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      const message =
        payload?.error?.message ||
        "AI sedang tidak bisa menjawab. Silakan coba beberapa saat lagi.";

      return Response.json({ answer: message }, { status: response.status });
    }

    const answer = extractAiText(payload);

    return Response.json({
      answer:
        answer ||
        "Maaf, AI belum menghasilkan jawaban. Silakan ulangi pertanyaan dengan lebih spesifik.",
    });
  } catch {
    return Response.json(
      { answer: "Terjadi kendala saat menghubungi AI. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
