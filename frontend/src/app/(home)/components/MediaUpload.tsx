"use client";

import { Film, ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api, type UploadResult } from "../../../services/api";

interface MediaUploadProps {
  onMediaChange: (result: UploadResult | null) => void;
}

const ACCEPTED_TYPES = "image/*,video/*";

const ACCEPTED_EXTENSIONS = {
  image: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
  video: [".mp4", ".mov", ".avi", ".webm", ".mkv"],
};

function isAccepted(file: File): boolean {
  return (
    file.type.startsWith("image/") || file.type.startsWith("video/")
  );
}

export function MediaUpload({ onMediaChange }: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const clearPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setMediaType(null);
  };

  const processFile = async (file: File) => {
    if (!isAccepted(file)) {
      setError("Formato inválido. Envie uma imagem ou vídeo.");
      return;
    }

    setError(null);
    clearPreview();

    const type = file.type.startsWith("image/") ? "image" : "video";
    setMediaType(type);
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const result = await api.uploadMedia(file);
      onMediaChange(result);
    } catch {
      setError("Falha ao enviar mídia. Tente novamente.");
      clearPreview();
      onMediaChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void processFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleRemove = () => {
    clearPreview();
    onMediaChange(null);
    setError(null);
  };

  const hasMedia = Boolean(previewUrl);

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !hasMedia && fileInputRef.current?.click()}
        className={[
          "relative w-full h-44 border-2 border-dashed rounded-xl",
          "bg-gray-50 flex items-center justify-center overflow-hidden",
          "transition-all duration-200",
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : hasMedia
            ? "border-gray-300 cursor-default"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer",
        ].join(" ")}
      >
        {hasMedia ? (
          <>
            {mediaType === "image" ? (
              <img
                src={previewUrl!}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={previewUrl!}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            )}

            {/* Overlay escuro com tipo */}
            <div className="absolute inset-0 bg-black/20 flex items-end p-2 pointer-events-none">
              <span className="text-white text-xs font-semibold bg-black/50 rounded px-2 py-0.5 flex items-center gap-1">
                {mediaType === "image" ? (
                  <ImageIcon className="w-3 h-3" />
                ) : (
                  <Film className="w-3 h-3" />
                )}
                {mediaType === "image" ? "Imagem" : "Vídeo"}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center px-4 select-none">
            <div className="flex gap-3 text-gray-400">
              <ImageIcon className="w-8 h-8" />
              <Film className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {isDragging ? "Solte aqui" : "Arraste ou clique para enviar"}
            </p>
            <p className="text-xs text-gray-400">
              Imagens: JPG, PNG, WebP, GIF · Vídeos: MP4, MOV, WebM
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between min-h-5">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          Selecionar arquivo
        </button>

        {isUploading && (
          <span className="text-xs text-blue-600 font-medium animate-pulse">
            Enviando...
          </span>
        )}
        {!isUploading && hasMedia && (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Pronto
          </span>
        )}
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    </div>
  );
}