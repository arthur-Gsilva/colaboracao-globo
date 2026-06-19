"use client";

import { useState } from "react";
import { Check, Copy, Download, Film, ImageIcon, MapPin, User } from "lucide-react";
import type { AdminMessage } from "@/src/types/adminMessage";

interface MessageCardProps {
  message: AdminMessage;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

async function downloadFile(url: string, fileName: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
}

export function MessageCard({ message }: MessageCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!message.mediaUrl) return;
    setDownloading(true);
    try {
      const ext = message.mediaUrl.split(".").pop() ?? "bin";
      const fileName = `${message.name.replace(/\s+/g, "_")}_${message.id.slice(0, 8)}.${ext}`;
      await downloadFile(message.mediaUrl, fileName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mídia */}
      {message.mediaUrl && (
        <div className="relative w-full h-52 bg-gray-100">
          {message.mediaType === "image" ? (
            <img
              src={message.mediaUrl}
              alt="Mídia enviada"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={message.mediaUrl}
              className="w-full h-full object-cover"
              controls
              playsInline
            />
          )}

          {/* Badge de tipo */}
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs rounded-md px-2 py-0.5">
            {message.mediaType === "image" ? (
              <ImageIcon className="w-3 h-3" />
            ) : (
              <Film className="w-3 h-3" />
            )}
            {message.mediaType === "image" ? "Imagem" : "Vídeo"}
          </span>

          {/* Botão download */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            title="Baixar mídia"
            className="absolute top-2 right-2 flex items-center gap-1.5 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 shadow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            {downloading ? "Baixando..." : "Baixar"}
          </button>
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 flex flex-col gap-3">
        {/* Meta */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 font-semibold text-gray-900 text-sm">
              <User className="w-3.5 h-3.5 text-gray-400" />
              {message.name}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-gray-400" />
              {message.city}
            </span>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
            {formatDate(message.createdAt)}
          </span>
        </div>

        {/* Mensagem */}
        <div className="relative bg-gray-50 rounded-lg px-3 py-2.5">
          <p className="text-sm text-gray-700 leading-relaxed pr-8">
            {message.message}
          </p>
          <button
            onClick={handleCopy}
            title="Copiar mensagem"
            className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
