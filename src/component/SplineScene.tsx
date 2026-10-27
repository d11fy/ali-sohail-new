import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';
import './SplineScene.css';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
  hintText?: string;
}

export default function SplineScene({
  scene,
  className = '',
  onLoad,
  hintText = 'اسحب وحرّك الماوس للتفاعل المباشر في الفضاء ثلاثي الأبعاد 3D'
}: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    const app = new Application(canvas);

    app.load(scene)
      .then(() => {
        if (mounted) {
          setLoading(false);
          onLoad?.();
        }
      })
      .catch((err) => {
        console.warn('Spline load error:', err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
      try {
        app.dispose();
      } catch (e) {
        // Safe disposal
      }
    };
  }, [scene, onLoad]);

  return (
    <div className={`spline-wrapper ${className}`}>
      {loading && (
        <div className="spline-loader-card">
          <div className="spline-pulsar">
            <div className="spline-ring" />
            <div className="spline-ring-inner" />
          </div>
          <span className="spline-loader-text">جاري تحميل المجسم ثلاثي الأبعاد (Spline 3D)...</span>
          <small className="spline-loader-sub">WebGL 3D Engine • Realtime Rendering</small>
        </div>
      )}

      {error ? (
        <div className="spline-fallback">
          <div className="spline-fallback-icon">✦</div>
          <p>عرض تفاعلي ثلاثي الأبعاد مدعوم بـ Spline 3D</p>
        </div>
      ) : (
        <canvas ref={canvasRef} className="spline-canvas-view" />
      )}

      {!loading && !error && hintText && (
        <div className="spline-hint-badge">
          <span className="spline-hint-dot" />
          <span>{hintText}</span>
        </div>
      )}
    </div>
  );
}
