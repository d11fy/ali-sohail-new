import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 14,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  tag: Tag = 'span'
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : characters.split('');

  const getRandomChar = () => {
    return availableChars[Math.floor(Math.random() * availableChars.length)] || '*';
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let currentIteration = 0;

    const getNextIndex = (revealed: Set<number>) => {
      const textLen = text.length;
      switch (revealDirection) {
        case 'start':
          return revealed.size;
        case 'end':
          return textLen - 1 - revealed.size;
        case 'center': {
          const middle = Math.floor(textLen / 2);
          const offset = Math.floor(revealed.size / 2);
          const nextIndex = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLen && !revealed.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLen; i++) {
            if (!revealed.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealed.size;
      }
    };

    const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return getRandomChar();
        })
        .join('');
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => clearInterval(interval);
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrambling) {
          setIsHovering(true);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [animateOn, isScrambling]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setRevealedIndices(new Set());
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovering(false);
    }
  };

  return (
    <Tag
      ref={containerRef as any}
      className={`decrypted-text-wrapper ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', unicodeBidi: 'plaintext' }}
    >
      <span className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = !isScrambling || revealedIndices.has(index) || char === ' ';
          return (
            <span
              key={index}
              className={isRevealed ? undefined : (encryptedClassName || 'encrypted-char')}
              style={{
                transition: 'color 0.15s ease',
                color: isRevealed ? undefined : '#FF503C'
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
