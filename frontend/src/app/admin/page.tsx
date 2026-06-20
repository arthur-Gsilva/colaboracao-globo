"use client";

import { useAdmin } from "./useAdmin";
import { MessageCard } from "./components/MessageCard";
import { AdminFilters } from "./components/AdminFilters";
import { MessageIcon } from "./components/MessageIcon";
import Image from "next/image";

export default function AdminPage() {
    const {
        messages,
        isLoading,
        error,
        filters,
        setFilters,
        filtered,
    } = useAdmin();

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-6 flex-1 ">
                {/* Header */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">
                        <Image
                            src='/logo.png'
                            alt='Logo'
                            width={50}
                            height={50}
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {isLoading
                                    ? "Carregando..."
                                    : `${filtered.length} mensagem${filtered.length !== 1 ? "s" : ""}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filtros */}
                <AdminFilters filters={filters} onChange={setFilters} />

                {/* Estados */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {!isLoading && !error && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
                        <MessageIcon className="w-10 h-10" />
                        <p className="text-sm">Nenhuma mensagem encontrada.</p>
                    </div>
                )}

                {/* Lista */}
                <div className="grid grid-cols-2 gap-4">
                    {filtered.map((msg) => (
                        <MessageCard key={msg.id} message={msg} />
                    ))}
                </div>
            </div>
        </main>
    );
}
