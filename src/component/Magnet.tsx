import { useState, useRef } from 'react';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  style?: CSSProperties;
}

export default function Magnet({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 2.5,
  activeTransition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
  inactiveTransition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
  wrapperClassName = '',
  innerClassName = '',
  style,
  ...props
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (
      Math.abs(distanceX) < width / 2 + padding &&
      Math.abs(distanceY) < height / 2 + padding
    ) {
      setIsActive(true);
      setPosition({
        x: distanceX / magnetStrength,
        y: distanceY / magnetStrength
      });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnet-wrapper ${wrapperClassName}`}
      data-magnet-active={isActive}
      style={{ display: 'inline-block', position: 'relative', ...style }}
      {...props}
    >
      <div
        className={`magnet-inner ${innerClassName}`}
        style={{
          display: 'inline-block',
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
