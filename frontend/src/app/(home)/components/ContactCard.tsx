import { Card } from "@/src/components/ui/Card";
import { FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa";

export const ContactCard = () => {
    return (
        <Card>
            <div className="text-center space-y-2">
                <h2 className="uppercase text-2xl font-semibold">
                    Interaja com a gente!
                </h2>

                <p className="text-gray-500">
                    Conecte-se conosco através dos nossos canais
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full">
                <a
                    href="#"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl text-white font-medium bg-linear-to-r from-sky-400 to-blue-500 shadow-md hover:opacity-90 transition"
                >
                    <FaWhatsapp size={20} />
                    WhatsApp
                </a>

                <a
                    href="#"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl text-white font-medium bg-linear-to-r from-indigo-500 to-blue-600 shadow-md hover:opacity-90 transition"
                >
                    <FaInstagram size={20} />
                    Instagram
                </a>

                <a
                    href="#"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl text-white font-medium bg-linear-to-r from-red-500 to-red-900 shadow-md hover:opacity-90 transition"
                >
                    <FaGlobe size={18} />
                    G1
                </a>

                <a
                    href="#"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl text-white font-medium bg-linear-to-r from-green-500 to-emerald-400 shadow-md hover:opacity-90 transition"
                >
                    <FaGlobe size={18} />
                    GE
                </a>
            </div>

            <div className="mt-8 text-sm text-gray-400 text-center">
                © 2026 Todos os direitos reservados.
            </div>
        </Card>
    );
};