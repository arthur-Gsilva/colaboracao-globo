export type CreateMessageDto = {
  name: string;
  city: string;
  message: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
};