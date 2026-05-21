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
const geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models";

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

function extractGeminiText(payload) {
  return (
    payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() ?? ""
  );
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return Response.json(
        { answer: "AI belum aktif. GEMINI_API_KEY belum diatur di server." },
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

    const response = await fetch(`${geminiEndpoint}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 420,
        },
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      const message =
        payload?.error?.message ||
        "AI sedang tidak bisa menjawab. Silakan coba beberapa saat lagi.";

      return Response.json({ answer: message }, { status: response.status });
    }

    const answer = extractGeminiText(payload);

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
