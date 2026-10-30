"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useScroll,
    MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpLeft, Sparkles } from "lucide-react";

export interface TunnelProjectItem {
    title: string;
    subtitle?: string;
    tag?: string;
    src: string;
    url?: string;
}

const DEFAULT_PROJECT_ITEMS: TunnelProjectItem[] = [
    {
        title: "Alosh Store",
        subtitle: "متجر الاشتراكات والمنتجات الرقمية",
        tag: "E-COMMERCE / SAAS",
        src: "/assets/real-alosh-store.png",
        url: "https://aloshstore.com/",
    },
    {
        title: "AI WhatsApp CRM",
        subtitle: "نظام ذكي لإدارة العملاء والمبيعات",
        tag: "AI / AUTOMATION",
        src: "/assets/real-whatsapp-crm.png",
        url: "https://crm-ai-whatsapp22.vercel.app/",
    },
    {
        title: "ATHAR",
        subtitle: "أثر للحلول الرقمية وتطوير الأعمال",
        tag: "CORPORATE / BRAND",
        src: "/assets/real-athar.png",
        url: "https://atherv1.vercel.app/ar",
    },
    {
        title: "CoreX",
        subtitle: "حلول برمجية ونظم ذكاء اصطناعي",
        tag: "AGENCY / SAAS",
        src: "/assets/real-corex.png",
        url: "https://corex1-puce.vercel.app/ar",
    },
    {
        title: "Digital Academy",
        subtitle: "أكاديمية التدريب المهني والتقني",
        tag: "ED-TECH / LMS",
        src: "/assets/real-digital-academy.png",
        url: "https://alosh.nzmly.com/",
    },
    {
        title: "AI Builder",
        subtitle: "برنامج تعلم البرمجة بالذكاء الاصطناعي",
        tag: "AI / CODE GEN",
        src: "/assets/real-ai-builder.png",
        url: "https://ai-builder-gray.vercel.app/",
    },
    {
        title: "Finance Bento",
        subtitle: "لوحة البيانات المالية التفاعلية 60fps",
        tag: "FINTECH / DASHBOARD",
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        url: "#lab",
    },
    {
        title: "Glass Folders UI",
        subtitle: "واجهات زجاجية تفاعلية ثلاثية الأبعاد",
        tag: "3D WEBGL / UI",
        src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        url: "#projects",
    },
];

interface TunnelCardData {
    item: TunnelProjectItem;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    // Flight staggered gracefully
    const flightStart = 0.04;
    const flightEnd = 0.96;
    const staggerSpan = 0.46;
    const start = flightStart + (card.index / total) * (flightEnd - flightStart - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });

    const farZ = stage.isMobile ? -1600 : -2600;
    const nearZ = stage.isMobile ? 360 : 620;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(160, Math.min(220, stage.width * 0.44))
        : Math.max(260, Math.min(380, stage.width * 0.23));

    let rawBaseX = card.angleCos * (stage.width * card.radiusFactorX);
    let rawBaseY = card.angleSin * (stage.height * card.radiusFactorY);

    const minCenterGapY = stage.isMobile ? 150 : 220;
    if (Math.abs(rawBaseY) < minCenterGapY) {
        rawBaseY = rawBaseY >= 0 ? minCenterGapY : -minCenterGapY;
    }

    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = rawBaseX - px * panStrength;
            const offsetY = rawBaseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 10,
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[16/10] will-change-transform select-none cursor-pointer"
            onClick={() => {
                if (card.item.url) {
                    if (card.item.url.startsWith("#")) {
                        document.querySelector(card.item.url)?.scrollIntoView({ behavior: "smooth" });
                    } else {
                        window.open(card.item.url, "_blank");
                    }
                }
            }}
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#241D1D]/90 shadow-2xl shadow-black/90 ring-1 ring-white/15 transition-all duration-500 hover:ring-[#FF503C]/90 hover:shadow-[#FF503C]/30">
                <img
                    src={card.item.src}
                    alt={card.item.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    {card.item.tag && (
                        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#FF7463] font-semibold mb-1">
                            {card.item.tag}
                        </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md">
                        {card.item.title}
                    </span>
                    {card.item.subtitle && (
                        <span className="text-xs text-[#BFAEAA] mt-0.5 line-clamp-1">
                            {card.item.subtitle}
                        </span>
                    )}
                    {card.item.url && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FF7463] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>معاينة المشروع</span>
                            <ArrowUpLeft size={13} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    items?: TunnelProjectItem[];
    title?: React.ReactNode;
    kicker?: string;
    subtitle?: string;
    className?: string;
    usePageScroll?: boolean;
}

export default function PerspectiveTunnelHero({
    items = DEFAULT_PROJECT_ITEMS,
    title,
    kicker = "SPATIAL PROJECTS CORRIDOR • ممر المشاريع ثلاثي الأبعاد",
    subtitle = "",
    className = "",
    usePageScroll = true,
}: PerspectiveTunnelHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Generate tunnel card coordinates with wide radial spread
    const tunnelCards = useMemo<TunnelCardData[]>(() => {
        return items.map((item, i) => {
            const goldenAngle = (i * 137.5 + 40) * (Math.PI / 180);
            const radiusFactorX = 0.42 + (i % 3) * 0.05;
            const radiusFactorY = 0.38 + (i % 2) * 0.06;

            return {
                item,
                angleCos: Math.cos(goldenAngle),
                angleSin: Math.sin(goldenAngle),
                radiusFactorX,
                radiusFactorY,
                rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 4) * 2),
                index: i,
            };
        });
    }, [items]);

    // Page Scroll Integration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const localRawProgress = useMotionValue(0);

    useEffect(() => {
        if (usePageScroll) return;
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const current = localRawProgress.get();
            const delta = e.deltaY * 0.0008;
            const next = Math.min(1, Math.max(0, current + delta));
            localRawProgress.set(next);
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [usePageScroll, localRawProgress]);

    const activeProgress = usePageScroll ? scrollYProgress : localRawProgress;

    const smoothProgress = useSpring(activeProgress, {
        stiffness: 85,
        damping: 28,
        restDelta: 0.0001,
    });

    const pointer = useCameraParallax(!reduce);

    // Title sequence: starts at 100% opacity, dissolves as scroll begins
    const titleScale = useTransform(smoothProgress, [0, 0.16], [1, 1.15]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.18], [1, 0.6, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.07], [1, 0]);

    // Cards sequence: HIDDEN at start (0 opacity), fades in ONLY as the title fades out
    const cardsContainerOpacity = useTransform(smoothProgress, [0, 0.08, 0.18], [0, 0.2, 1]);

    const contentStage = (
        <div
            className={`sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none bg-[#191515] text-[#FFF0E5] ${className}`}
            style={{
                perspective: stage.isMobile ? "900px" : "1300px",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Top & Bottom Seamless Edge Blending */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#191515] to-transparent z-1" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#191515] to-transparent z-1" />

            {/* Immersive Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[#191515] z-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#382C2B_1px,transparent_1px)] [background-size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_50%,transparent_100%)] z-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,80,60,0.18)_0%,rgba(232,63,44,0.15)_40%,transparent_75%)] z-0" />

            {/* Central Anchor Typography */}
            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-30 flex flex-col items-center text-center px-6 max-w-4xl"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D2424]/90 border border-[#FF503C]/40 text-[#FF7463] text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(255,80,60,0.2)] backdrop-blur-md">
                    <Sparkles size={13} className="text-[#FF503C]" />
                    <span>{kicker}</span>
                </div>

                <h2
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#FFF0E5] leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {title || (
                        <>
                            <span>مشاريع استثنائية</span>
                            <br />
                            <span className="bg-gradient-to-r from-[#FF503C] via-[#FF7463] to-[#FFF0E5] bg-clip-text text-transparent">
                                تصنع الفارق.
                            </span>
                        </>
                    )}
                </h2>

                {subtitle && (
                    <p className="mt-5 max-w-[560px] text-sm sm:text-base font-normal text-[#BFAEAA] leading-relaxed drop-shadow-md">
                        {subtitle}
                    </p>
                )}
            </motion.div>

            {/* Scroll Indicator Prompt */}
            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-10 z-30 flex flex-col items-center gap-2 text-xs font-mono tracking-wider text-[#938581]"
            >
                <span className="flex items-center gap-2 text-[#FF7463] font-sans font-semibold text-xs sm:text-sm">
                    <span>مرر للأسفل للغوص داخل المشاريع</span>
                    <ArrowDown size={14} className="animate-bounce" />
                </span>
                <div className="h-8 w-px bg-gradient-to-b from-[#FF503C] via-[#FF7463] to-transparent" />
            </motion.div>

            {/* 3D Z-Space Plane */}
            <motion.div
                style={{ opacity: cardsContainerOpacity }}
                className="absolute inset-0 pointer-events-none z-10"
            >
                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {tunnelCards.map((card, i) => (
                        <TunnelCard
                            key={i}
                            card={card}
                            progress={smoothProgress}
                            pointer={pointer}
                            total={tunnelCards.length}
                            stage={stage}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );

    if (usePageScroll) {
        return (
            <section
                ref={containerRef}
                className="relative w-full h-[260vh] bg-[#191515]"
                id="spatial-tunnel"
            >
                {contentStage}
            </section>
        );
    }

    return (
        <div ref={containerRef} className="relative h-full w-full">
            {contentStage}
        </div>
    );
}

export { PerspectiveTunnelHero as CurtainSplitHero };
