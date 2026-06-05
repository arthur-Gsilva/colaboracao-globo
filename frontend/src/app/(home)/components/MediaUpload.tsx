import { Camera, ImageIcon, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { clienteService } from '../../../../services/cadastros.service';

interface FotoUploadProps {
    fotoUrl?: string;
    onFotoChange: (url: string) => void;
}

export function FotoUpload({ fotoUrl, onFotoChange }: FotoUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const setPreview = (url: string | null) => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(url);
    };

    const loadFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            console.log({ icon: 'error', title: 'Erro', text: 'Use uma imagem JPG, PNG ou WebP.' });
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setImageError(false);
        setPreview(objectUrl);
        setIsUploading(true);

        try {
            const uploadedUrl = await clienteService.uploadClienteFoto(file);
            onFotoChange(uploadedUrl);
        } catch (error) {
            setImageError(true);
            console.log({ icon: 'error', title: 'Erro', text: 'Falha ao enviar imagem. Tente novamente.' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) { void loadFile(file); return; }

        const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
        if (url) {
            setImageError(false);
            setPreview(null);
            onFotoChange(url);
            return;
        }

        console.log({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar a imagem.' });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) loadFile(file);
    };

    const handleRemoveFoto = () => { setImageError(false); setPreview(null); onFotoChange(''); };
    const imageSrc = previewUrl || fotoUrl;

    return (
        <div className="flex flex-col items-center justify-start gap-3">
            {/* Input oculto */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !imageSrc && fileInputRef.current?.click()}
                className={`relative w-40 h-40 border-2 border-dashed rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden transition-all shadow-sm cursor-pointer ${
                    isDragging
                        ? 'border-primary bg-primary/10 dark:bg-primary/20 scale-105 shadow-lg'
                        : imageSrc
                            ? 'border-gray-300 dark:border-gray-600'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 hover:shadow-md'
                }`}
            >
                {imageSrc ? (
                    <>
                        {imageError ? (
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                                <ImageIcon className="w-12 h-12 text-red-400 mb-2" />
                                <p className="text-xs text-red-500 dark:text-red-400">Erro ao carregar imagem</p>
                            </div>
                        ) : (
                            <img src={imageSrc} alt="Foto do cliente" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                        )}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemoveFoto(); }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-md hover:shadow-lg hover:scale-110"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="text-center px-4">
                        <Camera className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                        <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider">
                            {isDragging ? 'Solte aqui' : 'Arraste ou clique'}
                        </p>
                        <p className="text-[9px] text-gray-500">JPG, PNG ou WebP</p>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <Upload className="w-3.5 h-3.5" />
                Selecionar arquivo
            </button>

            {isUploading ? (
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                    Enviando imagem...
                </p>
            ) : imageSrc && !imageError ? (
                <p className="text-[10px] text-green-600 dark:text-green-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Carregada
                </p>
            ) : null}
        </div>
    );
}