"use client";

import { Card } from "@/src/components/ui/Card";
import { Toast } from "@/src/components/ui/Toast";
import { MediaUpload } from "./MediaUpload";
import { useHome } from "../useHome";

export function FormBox() {
  const { form, setMedia, toast, clearToast, isSubmitting, onSubmit } =
    useHome();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <Card>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ex: Maria Silva"
                {...register("name")}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="city">
                Município
              </label>
              <input
                id="city"
                type="text"
                placeholder="Ex: Olinda"
                {...register("city")}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.city && (
                <span className="text-xs text-red-500">{errors.city.message}</span>
              )}
            </div>
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Conte-nos o que aconteceu"
              {...register("message")}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="flex justify-between">
              {errors.message ? (
                <span className="text-xs text-red-500">{errors.message.message}</span>
              ) : (
                <span />
              )}
              <span className="text-xs text-gray-400">
                {form.watch("message")?.length ?? 0}/200
              </span>
            </div>
          </div>

          {/* Mídia */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Mídia (opcional)
            </label>
            <MediaUpload
              onMediaChange={(result) => setMedia(result)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </Card>

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={clearToast}
        />
      )}
    </>
  );
}