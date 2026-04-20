import React, { useState, useEffect } from 'react';

const BlinkingCursor: React.FC = () => (
    <span className="inline-block w-2 h-5 bg-zinc-400 align-bottom animate-blink" />
);

interface TypewriterProps {
    text: string;
    isStreaming: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, isStreaming }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        // If we've displayed everything, stop.
        if (displayedText.length >= text.length) {
            return; 
        }

        // Calculate how far behind we are
        const charsRemaining = text.length - displayedText.length;

        // Base typing speed (ms per char) - Fast but readable
        let currentDelay = 15 + (Math.random() * 20);

        // Punctuation pauses - creating natural cadence
        const lastChar = displayedText.slice(-1);
        
        // Significant pause for sentence endings
        if (['.', '!', '?'].includes(lastChar)) {
            currentDelay += 300 + Math.random() * 200; 
        } 
        // Moderate pause for commas and clauses
        else if ([',', ';', ':'].includes(lastChar)) {
            currentDelay += 100 + Math.random() * 100;
        } 
        // Pause for paragraphs
        else if (lastChar === '\n') {
            currentDelay += 200 + Math.random() * 100;
        }

        // "Warm up" - slightly slower start
        if (displayedText.length < 5) {
            currentDelay += 40;
        }

        // Catch-up mechanism: if the stream is way ahead, speed up drastically
        // This prevents the typewriter from lagging too far behind the model
        if (charsRemaining > 50) {
            currentDelay = 2; // Almost instant
        } else if (charsRemaining > 20) {
            currentDelay = Math.min(currentDelay, 10); // Speed up
        }

        // Variable chunking to simulate bursts of typing
        // If we are behind, take larger chunks
        let chunkSize = 1;
        if (charsRemaining > 5) {
            // Randomly chunk 1-3 chars when falling behind
            chunkSize = Math.floor(Math.random() * 3) + 1; 
        }

        const nextTextIndex = Math.min(displayedText.length + chunkSize, text.length);

        const timeoutId = setTimeout(() => {
            setDisplayedText(text.slice(0, nextTextIndex));
        }, currentDelay);

        return () => clearTimeout(timeoutId);

    }, [text, displayedText]);
    
    return (
        <>
            {displayedText}
            {/* The cursor should remain visible as long as the parent indicates it's streaming.
                This prevents the cursor from flickering when the animation briefly catches up
                to the incoming text stream, providing a smoother user experience. */}
            {isStreaming && <BlinkingCursor />}
        </>
    );
};