import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ChatMessageComponent } from './ChatMessage';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onPromptClick: (prompt: string) => void;
  children?: React.ReactNode;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading, onPromptClick, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <ChatMessageComponent key={msg.id} message={msg} onPromptClick={onPromptClick} />
      ))}
      {children}
      <div ref={scrollRef} />
    </div>
  );
};