
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, PaperclipIcon, XCircleIcon, GlobeAltIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string, attachedFile?: File, useSearch?: boolean) => void;
  isLoading: boolean;
  generationMode: 'chat' | 'image';
  isLeapMode: boolean;
  setIsLeapMode: (isLeap: boolean) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  imageSize: string;
  setImageSize: (size: string) => void;
}

const placeholders = {
    chat: 'Message AYI_all...',
    image: 'Describe an image to generate...'
};

const aspectRatios = [
    { label: '1:1', value: '1:1', title: 'Square' },
    { label: '16:9', value: '16:9', title: 'Landscape' },
    { label: '9:16', value: '9:16', title: 'Portrait' },
    { label: '4:3', value: '4:3', title: 'Standard' },
    { label: '3:4', value: '3:4', title: 'Tall' },
];

const imageSizes = [
    { label: '1K', value: '1K' },
    { label: '2K', value: '2K' },
    { label: '4K', value: '4K' },
];

export const ChatInput: React.FC<ChatInputProps> = ({ 
    onSendMessage, 
    isLoading, 
    generationMode, 
    isLeapMode,
    setIsLeapMode,
    aspectRatio,
    setAspectRatio,
    imageSize,
    setImageSize
}) => {
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (attachedFile) {
        if (attachedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(attachedFile);
        } else {
            setFilePreview(null);
        }
    } else {
        setFilePreview(null);
    }
  }, [attachedFile]);
  
  // Clear file when switching to image generation mode
  useEffect(() => {
    if (generationMode === 'image') {
        removeFile();
    }
  }, [generationMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || attachedFile) && !isLoading) {
      onSendMessage(input.trim(), attachedFile || undefined, useSearch);
      setInput('');
      removeFile();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setAttachedFile(e.target.files[0]);
      }
  };
  
  const removeFile = () => {
      setAttachedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-8 pt-2">
        <div 
            className={`
                relative flex flex-col 
                bg-zinc-900/40 backdrop-blur-2xl 
                border border-white/10 
                shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.05)]
                rounded-3xl
                transition-all duration-500 ease-out
                focus-within:bg-zinc-800/50 focus-within:shadow-[0_12px_40px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] focus-within:border-white/15
            `}
        >
            {/* Background Glow for LEAP Mode */}
            {isLeapMode && (
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-2xl opacity-60 pointer-events-none transition-opacity duration-700" />
            )}

            {/* Image Generation Controls (Quality & Aspect Ratio) */}
            {generationMode === 'image' && (
                <div className="flex items-center gap-4 px-5 py-3 border-b border-white/5 overflow-x-auto no-scrollbar">
                    
                    {/* Quality Selector */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Fidelity</span>
                        <div className="flex bg-black/20 rounded-xl p-0.5 border border-white/5 shadow-inner">
                            <button 
                                type="button"
                                onClick={() => setIsLeapMode(false)}
                                disabled={isLoading}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${!isLeapMode ? 'bg-white/10 text-zinc-100 shadow-sm border border-white/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Quick Draft
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsLeapMode(true)}
                                disabled={isLoading}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${isLeapMode ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                High Fidelity
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-5 bg-white/10 flex-shrink-0" />

                    {/* Aspect Ratio */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex-shrink-0">Ratio</span>
                        {aspectRatios.map((ratio) => (
                            <button
                                key={ratio.value}
                                type="button"
                                onClick={() => setAspectRatio(ratio.value)}
                                disabled={isLoading}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                                    aspectRatio === ratio.value
                                        ? 'bg-white/10 border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                                        : 'bg-white/5 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/10'
                                }`}
                                title={ratio.title}
                            >
                                {ratio.label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-5 bg-white/10 flex-shrink-0" />

                    {/* Image Size */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex-shrink-0">Size</span>
                        {imageSizes.map((size) => (
                            <button
                                key={size.value}
                                type="button"
                                onClick={() => setImageSize(size.value)}
                                disabled={isLoading}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                                    imageSize === size.value
                                        ? 'bg-white/10 border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                                        : 'bg-white/5 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/10'
                                }`}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col relative z-10">
                {(filePreview || attachedFile) && (
                    <div className="relative group self-start mx-5 mt-4 mb-1">
                        {filePreview ? (
                            <img src={filePreview} alt="Image preview" className="h-24 w-auto rounded-xl border border-white/10 shadow-xl"/>
                        ) : (
                            <div className="flex items-center gap-2 h-16 px-4 bg-zinc-800/80 rounded-xl border border-white/10 shadow-xl">
                                <PaperclipIcon className="w-5 h-5 text-blue-400" />
                                <span className="text-sm text-zinc-200 max-w-[200px] truncate">{attachedFile?.name}</span>
                            </div>
                        )}
                        <button 
                            onClick={removeFile}
                            className="absolute -top-2 -right-2 text-zinc-400 hover:text-white bg-zinc-900/80 backdrop-blur rounded-full p-1 border border-white/10 opacity-0 group-hover:opacity-100 transition-all shadow-md"
                            aria-label="Remove file"
                        >
                            <XCircleIcon className="w-4 h-4"/>
                        </button>
                    </div>
                )}
                
                <div className="flex items-end gap-3 p-3">
                    {/* Tool Buttons Container */}
                    <div className="flex items-center gap-1.5 pb-2 pl-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="*/*"
                            className="hidden"
                            disabled={isLoading || generationMode === 'image'}
                        />
                        
                        {/* Attach Button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading || generationMode === 'image'}
                            className={`
                                p-2.5 rounded-xl transition-all duration-300
                                ${generationMode === 'image' 
                                    ? 'text-zinc-700 cursor-not-allowed' 
                                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10 active:scale-95'
                                }
                            `}
                            aria-label="Attach image"
                            title="Attach image"
                        >
                             <PaperclipIcon className="w-5 h-5" />
                        </button>

                        {/* Search Button */}
                        <button
                            type="button"
                            onClick={() => setUseSearch(!useSearch)}
                            disabled={isLoading}
                            className={`
                                p-2.5 rounded-xl transition-all duration-300
                                ${useSearch 
                                    ? 'text-sky-400 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.2)] border border-sky-500/30' 
                                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10 active:scale-95'
                                }
                            `}
                            aria-label="Toggle Web Search"
                            title={useSearch ? "Web Search Active" : "Enable Web Search"}
                        >
                             <GlobeAltIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Textarea */}
                    <div className="flex-1 min-w-0 py-2 px-1">
                         <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={generationMode === 'image' ? (isLeapMode ? "Describe a high-fidelity image..." : "Describe a quick draft image...") : placeholders[generationMode]}
                            rows={1}
                            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500/70 resize-none focus:outline-none max-h-48 text-[15px] leading-relaxed py-1 font-light tracking-wide"
                            disabled={isLoading}
                         />
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isLoading || (!input.trim() && !attachedFile)}
                        className={`
                            flex items-center justify-center flex-shrink-0
                            w-11 h-11 rounded-2xl 
                            transition-all duration-300 shadow-lg
                            ${isLeapMode 
                                ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white border border-blue-400/30' 
                                : 'bg-white/10 hover:bg-white/20 text-zinc-100 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'}
                            disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-white/10
                        `}
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5 transform group-active:scale-95 drop-shadow-sm" />
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};
