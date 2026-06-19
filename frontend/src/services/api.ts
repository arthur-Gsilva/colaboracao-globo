import type { AdminMessage } from "../types/adminMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type UploadResult = {
  url: string;
  type: "image" | "video";
  fileName: string;
};

export type SendPayload = {
  name: string;
  city: string;
  message: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
};

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Erro desconhecido.");
  return json.data as T;
}

export const api = {
  uploadMedia: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    return handleResponse<UploadResult>(res);
  },

  sendMessage: async (payload: SendPayload): Promise<void> => {
    const res = await fetch(`${API_URL}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return handleResponse<void>(res);
  },

  getMessages: async (): Promise<AdminMessage[]> => {
    const res = await fetch(`${API_URL}/api/messages`);
    return handleResponse<AdminMessage[]>(res);
  },
};