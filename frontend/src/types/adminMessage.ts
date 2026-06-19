export type AdminMessage = {
  id: string;
  name: string;
  city: string;
  message: string;
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;
  createdAt: string;
};