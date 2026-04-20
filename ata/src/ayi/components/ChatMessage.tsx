
import React from 'react';
import { ChatMessage, Source } from '../types';
import { BotIcon, LinkIcon, MapPinIcon, WxzaIcon } from './icons';
import { Typewriter } from './Typewriter';

declare var marked: { parse: (markdown: string, options?: object) => string };

interface ChatMessageProps {
  message: ChatMessage;
  onPromptClick: (prompt: string) => void;
}

const Spinner: React.FC = () => (
  <svg className="animate-spin h-8 w-8 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ImageLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3">
      <Spinner />
      <p className="text-sm font-semibold text-zinc-300 tracking-tight">Generating liquid visual...</p>
    </div>
  );
};

const VideoLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3">
      <Spinner />
      <p className="text-sm font-semibold text-zinc-300 tracking-tight">Synthesizing animated manifestation...</p>
    </div>
  );
};

const ThinkingIndicator: React.FC<{ isLeap?: boolean }> = ({ isLeap }) => (
  <div className="flex items-center gap-3 py-2 pl-1">
    <div className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLeap ? 'bg-blue-500' : 'bg-zinc-500'}`}></span>
      <span className={`relative inline-flex rounded-full h-3 w-3 ${isLeap ? 'bg-blue-400' : 'bg-zinc-400'} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}></span>
    </div>
    <span className={`text-xs font-mono tracking-widest uppercase ${isLeap ? 'text-blue-300' : 'text-zinc-400'} animate-pulse`}>
      {isLeap ? 'Processing Leap...' : 'Thinking...'}
    </span>
  </div>
);


const SourcePill: React.FC<{ source: Source }> = ({ source }) => {
    if (source.type === 'wxza') {
        return (
          <span
            className="inline-flex items-center gap-1.5 bg-indigo-500/20 backdrop-blur-lg border border-indigo-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-indigo-100 text-xs font-medium px-3 py-1.5 rounded-full cursor-default tracking-wide"
            title={source.title}
          >
            <WxzaIcon className="w-3.5 h-3.5 flex-shrink-0 drop-shadow-sm" />
            <span className="truncate">{source.title}</span>
          </span>
        );
    }

    const isMapSource = source.type === 'map';
    const Icon = isMapSource ? MapPinIcon : LinkIcon;
    const pillColor = isMapSource 
        ? "bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/20 text-emerald-100" 
        : "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300";
  
    return (
      <a
        href={source.uri}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 ${pillColor} backdrop-blur-lg border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
        title={source.title || source.uri}
      >
        <Icon className="w-3 h-3 flex-shrink-0 opacity-80" />
        <span className="truncate">{source.title || new URL(source.uri).hostname}</span>
      </a>
    );
};

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onPromptClick }) => {
  const isModel = message.role === 'model';
  const isSystem = message.content?.startsWith('**[SYSTEM]**');

  const getSanitizedHtml = (markdown: string) => {
    return marked.parse(markdown, { gfm: true, breaks: true });
  };
  
  // Subtle System Style
  if (isSystem) {
      return (
          <div className="flex justify-center my-6 animate-fade-in-up">
              <div className="px-6 py-2 rounded-full border border-white/5 bg-white/2 backdrop-blur-md shadow-lg flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                    {message.content.replace('**[SYSTEM]**', '').trim()}
                  </span>
              </div>
          </div>
      );
  }

  const bubbleStyle = isModel 
    ? "bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-2xl border-white/10 rounded-tl-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    : "bg-gradient-to-br from-blue-600/30 to-blue-700/30 backdrop-blur-2xl border-blue-400/20 rounded-br-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]";

  const leapEffectClass = isModel && message.isLeap 
    ? 'shadow-[0_0_30px_rgba(59,130,246,0.15),inset_0_0_20px_rgba(59,130,246,0.05)] border-blue-400/30' 
    : 'border';

  return (
    <div className={`flex items-start gap-4 my-6 ${isModel ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
      {isModel && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
            <BotIcon className="w-5 h-5 text-zinc-300 drop-shadow-md"/>
        </div>
      )}
      <div
        className={`max-w-2xl px-5 py-4 rounded-3xl ${bubbleStyle} ${leapEffectClass} transition-all duration-500`}
      >
        <div className="text-[15px] leading-7 space-y-2 font-light tracking-normal">
            {!isModel && message.imageUrl && (
              <img src={message.imageUrl} alt="User upload" className="rounded-2xl max-w-xs max-h-64 border border-white/10 shadow-lg mb-2" />
            )}
            
            {!isModel && message.fileName && (
              <div className="flex items-center gap-2 h-12 px-4 bg-white/5 rounded-xl border border-white/10 shadow-lg mb-2 w-fit">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                  <span className="text-sm text-zinc-200 max-w-[200px] truncate">{message.fileName}</span>
              </div>
            )}
            
            {isModel && message.generationStatus === 'generating' && (
              <ImageLoader />
            )}

            {isModel && message.generationStatus === 'generating-video' && (
              <VideoLoader />
            )}
            
            {isModel && message.isStreaming && !message.content && (
                <ThinkingIndicator isLeap={message.isLeap} />
            )}

            {isModel && message.imageUrl && (
              <img src={message.imageUrl} alt="Generated image" className="rounded-2xl max-w-full border border-white/10 shadow-2xl" />
            )}

            {isModel && message.videoUrl && (
              <video src={message.videoUrl} controls autoPlay loop className="rounded-2xl max-w-full border border-white/10 shadow-2xl" />
            )}

            {message.content && (
              isModel ? (
                message.isStreaming ? (
                  <div className="whitespace-pre-wrap">
                    <Typewriter text={message.content} isStreaming={true} />
                  </div>
                ) : (
                  <div className="prose" dangerouslySetInnerHTML={{ __html: getSanitizedHtml(message.content) }} />
                )
              ) : (
                <p className="whitespace-pre-wrap drop-shadow-sm">{message.content}</p>
              )
            )}
        </div>
        {isModel && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-wider opacity-80">Sources Verified</h4>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, index) => (
                <SourcePill key={index} source={source} />
              ))}
            </div>
          </div>
        )}
        {isModel && message.followUpPrompts && message.followUpPrompts.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-wider opacity-80">Suggested Vectors</h4>
            <div className="flex flex-wrap gap-2">
              {message.followUpPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onPromptClick(prompt)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] text-zinc-200 text-xs font-medium px-3 py-1.5 rounded-xl transition-all duration-300 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
