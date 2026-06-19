"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homeSchema } from "./home.schemas";
import { api, type UploadResult } from "@/src/services/api";
import type { ToastVariant } from "@/src/components/ui/Toast";
import type { z } from "zod";

type FormValues = z.infer<typeof homeSchema>;

type Toast = {
  message: string;
  variant: ToastVariant;
} | null;

export function useHome() {
  const [media, setMedia] = useState<UploadResult | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(homeSchema),
    defaultValues: { name: "", city: "", message: "", media: "" },
  });

  const showToast = (message: string, variant: ToastVariant) => {
    setToast({ message, variant });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await api.sendMessage({
        name: data.name,
        city: data.city,
        message: data.message,
        mediaUrl: media?.url,
        mediaType: media?.type,
      });

      showToast("Mensagem enviada com sucesso!", "success");
      form.reset();
      setMedia(null);
    } catch (err: any) {
      showToast(
        err?.message ?? "Erro ao enviar. Tente novamente.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    media,
    setMedia,
    toast,
    clearToast: () => setToast(null),
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}