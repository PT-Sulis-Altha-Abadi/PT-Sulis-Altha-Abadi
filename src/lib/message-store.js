import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), ".data");
const messagesFile = path.join(dataDirectory, "contact-messages.json");
const messageBlobStoreName = "contact-messages";

function shouldUseNetlifyBlobs() {
  const configuredStorage = process.env.MESSAGE_STORAGE;

  if (configuredStorage) {
    return configuredStorage === "netlify-blobs";
  }

  return Boolean(process.env.SITE_ID);
}

function sortMessages(messages) {
  return messages.sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

async function getNetlifyBlobStore() {
  const { getStore } = await import("@netlify/blobs");

  return getStore({
    name: messageBlobStoreName,
    consistency: "strong",
  });
}

async function readRawMessages() {
  try {
    const contents = await readFile(messagesFile, "utf8");
    const parsed = JSON.parse(contents);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeMessages(messages) {
  await mkdir(dataDirectory, { recursive: true });

  const tempFile = `${messagesFile}.${randomUUID()}.tmp`;
  await writeFile(tempFile, JSON.stringify(messages, null, 2), "utf8");
  await rename(tempFile, messagesFile);
}

async function readNetlifyMessages() {
  const store = await getNetlifyBlobStore();
  const { blobs } = await store.list({ prefix: "messages/" });
  const messages = await Promise.all(
    blobs.map((blob) => {
      return store.get(blob.key, { type: "json" });
    }),
  );

  return messages.filter(Boolean);
}

async function writeNetlifyMessage(message) {
  const store = await getNetlifyBlobStore();
  await store.setJSON(`messages/${message.id}`, message);
}

export async function getContactMessages() {
  const messages = shouldUseNetlifyBlobs()
    ? await readNetlifyMessages()
    : await readRawMessages();

  return sortMessages(messages);
}

export async function saveContactMessage(payload) {
  const message = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  if (shouldUseNetlifyBlobs()) {
    await writeNetlifyMessage(message);
    return message;
  }

  const messages = await readRawMessages();
  messages.push(message);
  await writeMessages(messages);

  return message;
}
