
import React from 'react';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  {
    title: "LEAP: Devise a multi-platform strategy",
    description: "to launch a disruptive tech product, including marketing, engineering, and funding."
  },
  {
    title: "LEAP: Generate a speculative analysis",
    description: "on the long-term societal impact of decentralized autonomous organizations (DAOs)."
  },
  {
    title: "LEAP: Perform a deep analysis of an image",
    description: "Upload an image for detailed object recognition, context analysis, and metadata extraction."
  },
  {
    title: "LEAP: Access WXZA.NET",
    description: "to synthesize the latest proprietary research on brain-computer interfaces."
  }
];

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="max-w-3xl mx-auto w-full pt-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <button
            key={prompt.title}
            onClick={() => onPromptClick(prompt.description.includes('Upload an image') ? prompt.title : `${prompt.title} ${prompt.description}`)}
            className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/5 rounded-3xl p-5 text-left transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] focus:outline-none"
            aria-label={`Start chat with prompt: ${prompt.title} ${prompt.description}`}
          >
            <p className="text-sm font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">{prompt.title}</p>
            <p className="text-xs text-zinc-400 group-hover:text-zinc-300 font-light leading-relaxed">{prompt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
