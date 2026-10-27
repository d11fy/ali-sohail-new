import {
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  Folder,
  Github,
  Instagram,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  siFigma,
  siFlutter,
  siGithub,
  siNextdotjs,
  siReact,
  siSupabase,
  siTypescript,
} from "simple-icons";
import { lazy, Suspense, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { TransitionProvider, usePageNavigation } from "./transitions/usePageNavigation";
import SplitText from "./component/SplitText";
import ClickSpark from "./component/ClickSpark";
import DecryptedText from "./component/DecryptedText";
import Magnet from "./component/Magnet";
import SpotlightCard from "./component/SpotlightCard";

const ShapeWaves = lazy(() => import("./component/ShapeWaves"));
const ElasticMesh = lazy(() => import("./component/ElasticMesh"));
const CardSwap = lazy(() => import("./component/CardSwap"));
const FolderFloat = lazy(() => import("./component/FolderFloat"));
const Lanyard = lazy(() => import("./component/Lanyard"));
const FolderBox = lazy(() => import("./component/Folder"));
const SplineScene = lazy(() => import("./component/SplineScene"));
import type { CardSwapItem } from "./component/CardSwap";
import type { FolderItem } from "./component/Folder";

const projectFolderItems: FolderItem[] = [
  { title: "Alosh Store", description: "متجر متكامل بذكاء اصطناعي" },
  { title: "WhatsApp CRM", description: "أتمتة مبيعات ذكية ومحادثات" },
  { title: "ATHAR Platform", description: "منصة ويب بهوية وتصميم حديث" },
  { title: "CoreX System", description: "أنظمة برمجية متطورة" }
];

const solutionFolderItems: FolderItem[] = [
  { title: "Next.js & React 19", description: "واجهات فائقة السرعة والسلاسة" },
  { title: "AI Integration", description: "نماذج ذكاء اصطناعي وأتمتة" },
  { title: "من غزة للعالم", description: "برمجة وحلول رقمية بمعايير عالمية" }
];

const contactFolderItems: FolderItem[] = [
  { title: "واتساب مباشر", description: "+972 59 741 0422" },
  { title: "البريد الإلكتروني", description: "shylmm086@gmail.com" },
  { title: "ابدأ مشروعك الآن", description: "مستعد لتحويل فكرتك لكود واقعي" }
];

gsap.registerPlugin(ScrollTrigger);

const details = {
  name: "علي سهيل الكحلوت",
  email: "shylmm086@gmail.com",
  github: "https://github.com/d11fy",
  instagram: "https://instagram.com/d11fy",
};

type Project = {
  title: string;
  arabic: string;
  type: string;
  tag: string;
  url?: string;
  theme: string;
  mark: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Alosh Store",
    arabic: "متجر المنتجات والاشتراكات الرقمية",
    type: "تجارة رقمية",
    tag: "E-COMMERCE",
    url: "https://aloshstore.com/",
    theme: "amber",
    mark: "A",
    image: "/assets/real-alosh-store.png",
  },
  {
    title: "AI WhatsApp CRM",
    arabic: "نظام ذكي لإدارة العملاء والمبيعات",
    type: "ذكاء اصطناعي",
    tag: "AI / SAAS",
    url: "https://crm-ai-whatsapp22.vercel.app/",
    theme: "mint",
    mark: "AI",
    image: "/assets/real-whatsapp-crm.png",
  },
  {
    title: "ATHAR",
    arabic: "أثر للحلول الرقمية",
    type: "مواقع",
    tag: "CORPORATE",
    url: "https://atherv1.vercel.app/ar",
    theme: "lilac",
    mark: "أثر",
    image: "/assets/real-athar.png",
  },
  {
    title: "CoreX",
    arabic: "حلول برمجية وذكاء اصطناعي",
    type: "مواقع",
    tag: "AGENCY",
    url: "https://corex1-puce.vercel.app/ar",
    theme: "blue",
    mark: "X",
    image: "/assets/real-corex.png",
  },
  {
    title: "Gaza Pathways",
    arabic: "منصة تعليمية",
    type: "منصات",
    tag: "EDUCATION",
    url: "https://masart.study/",
    theme: "sky",
    mark: "مسارات",
    image: "/assets/real-masart.png",
  },
  {
    title: "CoachPro",
    arabic: "منصة لياقة رقمية",
    type: "منصات",
    tag: "FITNESS",
    url: "https://bodybuilding-system.vercel.app/",
    theme: "lime",
    mark: "C",
    image: "/assets/real-coachpro.png",
  },
  {
    title: "CosmiBook",
    arabic: "متجر منتجات رقمية",
    type: "تجارة رقمية",
    tag: "E-COMMERCE",
    theme: "rose",
    mark: "C",
  },
  {
    title: "Digital Academy",
    arabic: "أكاديمية رقمية",
    type: "منصات",
    tag: "EDUCATION",
    url: "https://alosh.nzmly.com/",
    theme: "sky",
    mark: "D",
    image: "/assets/real-digital-academy.png",
  },
  {
    title: "Personal Branding",
    arabic: "هوية شخصية رقمية",
    type: "مواقع",
    tag: "WEBSITE",
    theme: "amber",
    mark: "P",
  },
  {
    title: "CLICK STORE",
    arabic: "سوق اشتراكات رقمية",
    type: "تجارة رقمية",
    tag: "MARKETPLACE",
    url: "https://clickstorev2.vercel.app/",
    theme: "lilac",
    mark: "CLICK",
    image: "/assets/real-clickstore.png",
  },
  {
    title: "SABA STORE",
    arabic: "منصة لإنشاء المتاجر",
    type: "منصات",
    tag: "SAAS",
    url: "https://sub-store-platform.vercel.app/",
    theme: "mint",
    mark: "S",
    image: "/assets/real-saba-store.png",
  },
  {
    title: "AI Builder",
    arabic: "برنامج تعلم البرمجة بالذكاء الاصطناعي",
    type: "ذكاء اصطناعي",
    tag: "EDUCATION / AI",
    url: "https://ai-builder-gray.vercel.app/",
    theme: "blue",
    mark: "AI",
    image: "/assets/real-ai-builder.png",
  },
];

const featuredSwapItems: CardSwapItem[] = [
  {
    title: "Alosh Store",
    subtitle: "متجر المنتجات والاشتراكات الرقمية",
    tag: "E-COMMERCE",
    image: "/assets/real-alosh-store.png",
    url: "https://aloshstore.com/",
    mark: "A",
  },
  {
    title: "AI WhatsApp CRM",
    subtitle: "نظام ذكي لإدارة العملاء والمبيعات",
    tag: "AI / SAAS",
    image: "/assets/real-whatsapp-crm.png",
    url: "https://crm-ai-whatsapp22.vercel.app/",
    mark: "WA",
  },
  {
    title: "ATHAR",
    subtitle: "أثر للحلول الرقمية وتطوير الأعمال",
    tag: "CORPORATE",
    image: "/assets/real-athar.png",
    url: "https://atherv1.vercel.app/ar",
    mark: "أثر",
  },
  {
    title: "CoreX",
    subtitle: "حلول برمجية ونظم ذكاء اصطناعي",
    tag: "AGENCY / AI",
    image: "/assets/real-corex.png",
    url: "https://corex1-puce.vercel.app/ar",
    mark: "X",
  },
  {
    title: "CLICK STORE",
    subtitle: "سوق الاشتراكات والبطاقات الرقمية",
    tag: "MARKETPLACE",
    image: "/assets/real-clickstore.png",
    url: "https://clickstorev2.vercel.app/",
    mark: "CLICK",
  },
  {
    title: "SABA STORE",
    subtitle: "منصة إنشاء وإدارة المتاجر الإلكترونية",
    tag: "SAAS",
    image: "/assets/real-saba-store.png",
    url: "https://sub-store-platform.vercel.app/",
    mark: "S",
  },
  {
    title: "CoachPro",
    subtitle: "منصة تدريب ولياقة رقمية متكاملة",
    tag: "FITNESS SAAS",
    image: "/assets/real-coachpro.png",
    url: "https://bodybuilding-system.vercel.app/",
    mark: "C",
  },
  {
    title: "Gaza Pathways",
    subtitle: "منصة مسارات للدراسة والتعليم الذكي",
    tag: "EDUCATION",
    image: "/assets/real-masart.png",
    url: "https://masart.study/",
    mark: "مسار",
  },
  {
    title: "Digital Academy",
    subtitle: "أكاديمية رقمية تفاعلية",
    tag: "EDUCATION",
    image: "/assets/real-digital-academy.png",
    url: "https://alosh.nzmly.com/",
    mark: "D",
  },
  {
    title: "AI Builder",
    subtitle: "برنامج تعلم البرمجة بالذكاء الاصطناعي",
    tag: "AI / EDUCATION",
    image: "/assets/real-ai-builder.png",
    url: "https://ai-builder-gray.vercel.app/",
    mark: "AI",
  },
];

type Tech = {
  label: string;
  icon: { path: string };
  tone: string;
  className?: string;
};
const technologies: Tech[] = [
  { label: "Next.js", icon: siNextdotjs, tone: "black", className: "tech-one" },
  { label: "React", icon: siReact, tone: "cyan", className: "tech-two" },
  { label: "Figma", icon: siFigma, tone: "figma", className: "tech-three" },
  {
    label: "Supabase",
    icon: siSupabase,
    tone: "green",
    className: "tech-four",
  },
  { label: "Flutter", icon: siFlutter, tone: "blue", className: "tech-five" },
  { label: "GitHub", icon: siGithub, tone: "black", className: "tech-six" },
  {
    label: "TypeScript",
    icon: siTypescript,
    tone: "blue",
    className: "tech-seven",
  },
];

function TechIcon({ item, mini = false }: { item: Tech; mini?: boolean }) {
  return (
    <div
      className={`tech-icon tone-${item.tone} ${item.className ?? ""} ${mini ? "mini" : ""}`}
      title={item.label}
      aria-label={item.label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={item.icon.path} />
      </svg>
    </div>
  );
}

function useMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        ".hero-person",
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: "power3.out",
          delay: 0.22,
        },
      );
      gsap.fromTo(
        ".entry-card",
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 1,
          ease: "power3.out",
          delay: 0.45,
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
      gsap.to(".hero-person", {
        yPercent: 13,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".stretch-line", {
        scaleX: 1.55,
        transformOrigin: "50% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".type-break",
          start: "top 75%",
          end: "bottom 30%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);
}

function usePointerDepth() {
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointer.matches || reducedMotion.matches) return;

    const hero = document.querySelector<HTMLElement>(".hero");
    const cards = gsap.utils.toArray<HTMLElement>(".entry-card");
    if (!hero) return;

    let frame = 0;
    const moveHero = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty("--photo-x", `${(x * 22).toFixed(1)}px`);
        hero.style.setProperty("--photo-y", `${(y * 14).toFixed(1)}px`);
      });
    };
    const resetHero = () => {
      cancelAnimationFrame(frame);
      hero.style.setProperty("--photo-x", "0px");
      hero.style.setProperty("--photo-y", "0px");
    };
    hero.addEventListener("pointermove", moveHero);
    hero.addEventListener("pointerleave", resetHero);

    const cleanups = cards.map((card) => {
      gsap.set(card, { transformPerspective: 800, transformOrigin: "center" });
      const rotateX = gsap.quickTo(card, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(card, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      });
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateX(-y * 9);
        rotateY(x * 11);
      };
      const enter = () => gsap.to(card, { y: -7, duration: 0.35 });
      const leave = () => {
        rotateX(0);
        rotateY(0);
        gsap.to(card, { y: 0, duration: 0.45 });
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(card);
      };
    });

    return () => {
      hero.removeEventListener("pointermove", moveHero);
      hero.removeEventListener("pointerleave", resetHero);
      cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

function AloshMesh() {
  const [webgl, setWebgl] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    setWebgl(Boolean(canvas.getContext("webgl2")));
  }, []);

  return (
    <div className="name-mesh-shell">
      {webgl ? (
        <Suspense fallback={<span className="name-mesh-fallback">ALOSH</span>}>
          <ElasticMesh
            text="ALOSH"
            fontFamily="Outfit, sans-serif"
            fontWeight={900}
            color="#247c61"
            material="jelly"
            theme="light"
            inflate={1.15}
            wobble={0.7}
            stretch={0.55}
            press={0.6}
            shadow={0.35}
            dpr={1.5}
          />
        </Suspense>
      ) : (
        <span className="name-mesh-fallback">ALOSH</span>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <section className="white-story" id="about">
      <div className="section-kicker" data-reveal>
        <span>01</span> / عنّي
      </div>
      <div className="story-center">
        <span className="story-small" data-reveal>أنا علي سهيل الكحلوت</span>
        <h1>
          <SplitText
            text="أحوّل الأفكار"
            tag="span"
            splitType="words"
            trigger="view"
            effect="rise"
            delay={150}
            duration={0.9}
            mask
          />
          <br />
          <SplitText
            text="لتجارب رقمية."
            tag="span"
            className="story-accent"
            splitType="words"
            trigger="view"
            effect="rise"
            delay={150}
            duration={0.9}
            mask
          />
        </h1>
        <p data-reveal>
          مطوّر Full-Stack من غزة، فلسطين. أعمل عند تقاطع البرمجة والذكاء
          الاصطناعي والتجارة الرقمية لبناء منتجات مفيدة وقابلة للنمو.
        </p>
      </div>

      {/* بطاقة الاعتماد البرمجي الرسمية مع الـ 3D Lanyard والصورة الرسمية لعلي */}
      <div className="about-pass-container" data-reveal>
        <div className="about-pass-card">
          <div className="pass-meta">
            <div className="pass-badge-pill">
              <span className="pass-status-dot" />
              <span>OFFICIAL DEV PASS • بطاقة الاعتماد البرمجي</span>
            </div>
            <h3 className="pass-title">علي سهيل الكحلوت</h3>
            <p className="pass-role">Full-Stack Engineer & AI Solutions Architect</p>

            <div className="pass-specs">
              <div className="pass-spec-item">
                <span className="spec-label">الموقع الجغرافي</span>
                <strong className="spec-val">غزة، فلسطين 🇵🇸</strong>
              </div>
              <div className="pass-spec-item">
                <span className="spec-label">رمز الاعتماد</span>
                <strong className="spec-val mono">
                  <DecryptedText
                    text="DEV-ALOSH-2026"
                    speed={25}
                    maxIterations={15}
                    animateOn="hover"
                  />
                </strong>
              </div>
              <div className="pass-spec-item">
                <span className="spec-label">حالة التوفر</span>
                <strong className="spec-val status-available">متاح للمشاريع الجديدة ✓</strong>
              </div>
              <div className="pass-spec-item">
                <span className="spec-label">التخصص الأساسي</span>
                <strong className="spec-val">Web Apps • React / Next.js • AI Automations</strong>
              </div>
            </div>

            <div className="pass-interactive-hint">
              <Sparkles size={16} />
              <span>اسحب بطاقة الهوية التفاعلية ثلاثية الأبعاد (3D Lanyard) أو حرّكها بالماوس لتفحص تفاصيلها وخلفيتها</span>
            </div>
          </div>

          <div className="pass-lanyard-stage">
            <Suspense
              fallback={
                <div className="lanyard-loading">
                  <div className="lanyard-spinner" />
                  <span>جاري تحميل بطاقة الهوية ثلاثية الأبعاد...</span>
                </div>
              }
            >
              <Lanyard
                frontImage="/assets/ali-official.jpg"
                elasticity={0.4}
                strapLength={0.75}
                cornerRadius={0.25}
                cardColor="#ffffff"
                strapColor="#0f172a"
                size={0.62}
                interactive={true}
                intro={true}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="floating-tech" aria-hidden="true">
        {technologies.slice(0, 6).map((item) => (
          <TechIcon key={item.label} item={item} />
        ))}
      </div>
      <div className="story-bottom" data-reveal>
        <span>React / Next.js / TypeScript / AI</span>
        <span>
          مرّر لتكتشف أكثر <ArrowDown size={16} />
        </span>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <>
      <section className="skills-scene" id="skills">
        <div className="section-kicker" data-reveal>
          <span>02</span> / الأدوات
        </div>
        <div className="skills-grid">
          <div className="skills-copy" data-reveal>
            <span>تقنية تخدم الفكرة</span>
            <h2>
              الأدوات
              <br />
              اللي ببني <em>بها.</em>
            </h2>
            <p>
              أختار التقنية حسب المشكلة، وأربط الواجهة بالخادم والبيانات
              والذكاء الاصطناعي في تجربة واحدة.
            </p>
          </div>
          <div className="skills-icons" data-reveal>
            {technologies.map((item) => (
              <SpotlightCard
                key={item.label}
                spotlightColor="rgba(36, 124, 97, 0.22)"
                className="skill-spotlight-item"
              >
                <div className="skill-row-inner">
                  <TechIcon item={item} mini />
                  <span>{item.label}</span>
                  <ArrowUpLeft size={17} />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
      <section className="name-interlude" aria-label="ALOSH">
        <AloshMesh />
        <div className="name-copy" data-reveal>
          <span>ALOSH / علي سهيل الكحلوت</span>
          <h2>
            أكتب الكود.
            <br />
            وأفكّر بالنتيجة.
          </h2>
          <p>
            من تطبيقات ويب وSaaS إلى أدوات تعليمية ذكية وأنظمة CRM وأتمتة.
          </p>
        </div>
      </section>
      <section className="type-break">
        <div className="section-kicker" data-reveal>
          <span>03</span> / الفكرة
        </div>
        <div className="break-inner" data-reveal>
          <p>كل شيء يبدأ بسؤال بسيط:</p>
          <h2>ليش نضيّع</h2>
          <h2 className="stretch-line">وقــــــــت؟</h2>
          <span>حين ممكن نبني حلًّا أذكى.</span>
        </div>
      </section>
    </>
  );
}

function ProjectsSection({
  filter,
  setFilter,
  onNavigateContact,
}: {
  filter: string;
  setFilter: (f: string) => void;
  onNavigateContact?: () => void;
}) {
  return (
    <>
      <section className="works" id="work">
        <div className="section-kicker" data-reveal>
          <span>04</span> / المشاريع
        </div>
        <div className="works-head" data-reveal>
          <div>
            <span className="eyebrow">SELECTED WORK / 2026</span>
            <h2>
              أعمال تتحوّل
              <br />
              <em>لأثر.</em>
            </h2>
          </div>
          <p>
            هذه مشاريع من معرض أعمالي، من المتاجر والمنصات إلى أنظمة الذكاء
            الاصطناعي. كل مشروع له فكرته وتحدياته.
          </p>
        </div>
        <div className="folder-float-showcase" data-reveal>
          <div className="folder-float-header">
            <span className="folder-badge">
              <Folder size={14} /> مجلد المشاريع التفاعلي (Folder Float)
            </span>
            <h3>المشاريع تنطلق وتطفو فيزيائياً في الهواء</h3>
            <p>
              مرّر الماوس أو اضغط على المجلد لتخرج بطاقات المشاريع وتطفو
              بفيزياء تفاعلية. يمكنك سحب أي مشروع أو النقر عليه لفتحه مباشرة.
            </p>
          </div>
          <div className="folder-float-stage">
            <Suspense fallback={<div>جاري تحميل المجلد...</div>}>
              <FolderFloat
                items={projects.map((p) => ({
                  label: p.title,
                  value: p.title,
                  tag: p.tag,
                  url: p.url,
                }))}
                label="مشاريع علي"
                sublabel={`${projects.length} مشاريع رقمية`}
                trigger="hover"
                defaultOpen={true}
                physics={true}
                drift={0.6}
                spread={260}
                lift={36}
                frontColor="#ffffff"
                paperColor="#94a3b8"
                itemColor="#0057ff"
                itemTextColor="#000000"
                folderColor="#1e1b26"
                labelColor="#18181b"
                width={240}
                height={165}
                onSelect={(value) => {
                  const target = projects.find((p) => p.title === value);
                  if (target?.url) {
                    window.open(target.url, "_blank");
                  }
                }}
              />
            </Suspense>
          </div>
        </div>
        <div className="work-swap-showcase" data-reveal>
          <div className="work-swap-badge">
            <Sparkles size={15} /> واجهات المشاريع التفاعلية — ثلاثية الأبعاد
          </div>
          <div className="work-swap-container">
            <Suspense
              fallback={
                <div style={{ color: "#aaa", fontSize: "14px" }}>
                  جاري تحميل معرض المشاريع...
                </div>
              }
            >
              <CardSwap
                items={featuredSwapItems}
                width={480}
                height={350}
                cardDistance={52}
                verticalDistance={60}
                depth={85}
                skewAmount={4}
                visibleCards={4}
                delay={4500}
                autoplay={true}
                pauseOnHover={true}
                draggable={true}
                theme="dark"
                cardRadius={20}
              />
            </Suspense>
          </div>
          <div className="work-swap-nav-hint">
            <span>
              💡 اسحب البطاقة أو حرّكها بالماوس للتنقل بين واجهات المشاريع، أو
              اضغط «زيارة المشروع» للفتح المباشر.
            </span>
          </div>
        </div>
        <div className="work-filters" aria-label="تصفية المشاريع">
          {["الكل", "ذكاء اصطناعي", "منصات", "تجارة رقمية", "مواقع"].map(
            (item) => (
              <button
                className={filter === item ? "selected" : ""}
                key={item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <div className="work-grid">
          {projects
            .filter((project) => filter === "الكل" || project.type === filter)
            .map((project, index) => (
              <article
                className={`work-card theme-${project.theme}`}
                key={project.title}
              >
                <div className="work-visual">
                  <span className="work-counter">
                    {String(index + 1).padStart(2, "0")} / {project.tag}
                  </span>
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="work-visual-img"
                        loading="lazy"
                      />
                      <div className="work-visual-overlay" />
                    </>
                  ) : (
                    <div className="work-glass">
                      <span>{project.mark}</span>
                      <i />
                      <i />
                    </div>
                  )}
                </div>
                <div className="work-info">
                  <div>
                    <span>{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.arabic}</p>
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`زيارة ${project.title}`}
                    >
                      <ArrowUpLeft size={22} />
                    </a>
                  ) : (
                    <span className="no-link">الرابط غير متاح</span>
                  )}
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* --- مختبر الأبعاد الثلاثية والذكاء الاصطناعي (Spline 3D & React Bits Lab) --- */}
      <section className="spline-lab-section" id="lab" data-reveal>
        <div className="section-kicker">
          <span>05</span> / مختبر 3D & AI
        </div>

        <div className="spline-lab-container">
          <div className="spline-lab-meta">
            <div className="lab-badge-pill">
              <span className="lab-pulse" />
              <DecryptedText
                text="SPLINE 3D × REACT BITS LAB"
                speed={35}
                maxIterations={12}
                animateOn="view"
              />
            </div>

            <h2 className="lab-title">
              مختبر الأبعاد الثلاثية
              <br />
              <span className="lab-gradient-text">والذكاء الاصطناعي.</span>
            </h2>

            <p className="lab-desc">
              تجربة تفاعلية تجمع بين برمجة الـ WebGL ثلاثية الأبعاد من Spline مع واجهات المستخدم فائقة الأداء من React Bits. تتيح للمستخدمين استكشاف النماذج والتحكم بها لحظياً في الفضاء الرقمي.
            </p>

            <div className="lab-features-grid">
              <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.2)" className="lab-card">
                <div className="lab-card-icon">⚡</div>
                <h4>محركات WebGL تفاعلية</h4>
                <p>أداء 60fps مع معالجة فيزيائية وتتبع المؤشر في الوقت الفعلي.</p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="lab-card">
                <div className="lab-card-icon">🧠</div>
                <h4>أنظمة ذكاء اصطناعي</h4>
                <p>أتمتة ذكية، وكلاء AI مستقلين، وربط نماذج لغوية بالواجهات البرمجية.</p>
              </SpotlightCard>
            </div>

            <div className="lab-cta-row">
              <Magnet padding={40} magnetStrength={3}>
                <button
                  className="lab-action-btn"
                  onClick={
                    onNavigateContact ||
                    (() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" }))
                  }
                >
                  <span>ابنِ تجربة ثلاثية الأبعاد لمشروعك</span>
                  <ArrowUpLeft size={18} />
                </button>
              </Magnet>
            </div>
          </div>

          <div className="spline-viewport-card">
            <Suspense
              fallback={
                <div className="spline-loading">
                  <span>جاري تحميل المشهد ثلاثي الأبعاد...</span>
                </div>
              }
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                hintText="اسحب بالماوس أو لمس الشاشة لتحريك روبوت الذكاء الاصطناعي في الفضاء 3D"
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactSection({
  form,
  setForm,
  sendEmail,
  onHome,
}: {
  form: { name: string; email: string; message: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  sendEmail: (event: FormEvent<HTMLFormElement>) => void;
  onHome: () => void;
}) {
  return (
    <>
      <section className="statement" data-reveal>
        <div className="statement-icons" aria-hidden="true">
          {technologies.slice(0, 4).map((item) => (
            <TechIcon key={item.label} item={item} mini />
          ))}
        </div>
        <h2>
          الفكرة بداية.
          <br />
          <span>والتنفيذ هو الفرق.</span>
        </h2>
        <p>أحب التفاصيل اللي تجعل المنتج واضحًا، سريعًا، ومفيدًا للناس.</p>
      </section>
      <section className="contact" id="contact">
        <div className="section-kicker" data-reveal>
          <span>05</span> / تواصل
        </div>
        <div className="contact-grid">
          <div className="contact-copy" data-reveal>
            <span>عندك مشروع أو فكرة؟</span>
            <h2>
              فكرتك الجاية.
              <br />
              نخلّيها <em>حقيقة.</em>
            </h2>
            <a href={`mailto:${details.email}`}>{details.email}</a>
            <div className="contact-social">
              <a href={details.github} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub
              </a>
              <a href={details.instagram} target="_blank" rel="noreferrer">
                <Instagram size={17} /> Instagram
              </a>
            </div>
          </div>
          <form onSubmit={sendEmail} data-reveal>
            <label>
              اسمك
              <input
                required
                name="name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="كيف أناديك؟"
              />
            </label>
            <label>
              الإيميل
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="you@company.com"
              />
            </label>
            <label>
              احكيلي عن فكرتك
              <textarea
                required
                name="message"
                rows={3}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="موقع، تطبيق، أو فكرة تحب نحولها لشيء حقيقي..."
              />
            </label>
            <button type="submit">
              ابدأ المحادثة <ArrowDownLeft size={20} />
            </button>
            <small>يفتح تطبيق البريد لديك مع الرسالة جاهزة للإرسال.</small>
          </form>
        </div>
        <footer>
          <span>
            © {new Date().getFullYear()} {details.name}
          </span>
          <button onClick={onHome}>
            العودة للبداية <ArrowLeft size={16} />
          </button>
        </footer>
      </section>
    </>
  );
}

function PortfolioApp() {
  const { currentRoute, navigate } = usePageNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [wavesFailed, setWavesFailed] = useState(false);
  const [filter, setFilter] = useState("الكل");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useMotion();
  usePointerDepth();

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    if (currentRoute !== "/") {
      navigate("/").then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 60);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`طلب تعاون من ${form.name}`);
    const body = encodeURIComponent(
      `الاسم: ${form.name}\nالبريد: ${form.email}\n\nالفكرة:\n${form.message}`,
    );
    window.location.href = `mailto:${details.email}?subject=${subject}&body=${body}`;
  };

  return (
    <ClickSpark sparkColor="#38bdf8" sparkCount={8} sparkRadius={24} duration={450}>
      <nav className="floating-dock" aria-label="التنقل الرئيسي">
        <Magnet padding={35} magnetStrength={2.2}>
          <button
            className={`dock-lang ${currentRoute === "/" ? "active" : ""}`}
            onClick={() => {
              if (currentRoute === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            aria-label="الرئيسية"
          >
            AR
          </button>
        </Magnet>
        <span className="dock-divider" />
        <Magnet padding={35} magnetStrength={2.2}>
          <button
            className={`dock-app dock-green ${currentRoute === "/contact" ? "active" : ""}`}
            onClick={() => navigate("/contact")}
            aria-label="تواصل"
          >
            ✉
          </button>
        </Magnet>
        <Magnet padding={35} magnetStrength={2.2}>
          <button
            className={`dock-app dock-coral ${currentRoute === "/about" ? "active" : ""}`}
            onClick={() => navigate("/about")}
            aria-label="عني"
          >
            ✳
          </button>
        </Magnet>
        <Magnet padding={35} magnetStrength={2.2}>
          <button
            className={`dock-app dock-orange ${currentRoute === "/projects" ? "active" : ""}`}
            onClick={() => navigate("/projects")}
            aria-label="الأعمال"
          >
            ↗
          </button>
        </Magnet>
        <Magnet padding={35} magnetStrength={2.2}>
          <a
            className="dock-app dock-blue"
            href={details.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
        </Magnet>
        <Magnet padding={35} magnetStrength={2.2}>
          <button
            className="dock-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </Magnet>
      </nav>
      <div
        className={`menu-screen ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          الرئيسية <span>01</span>
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/about");
          }}
        >
          عنّي <span>02</span>
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/process");
          }}
        >
          من الفكرة للكود (الأدوات) <span>03</span>
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/projects");
          }}
        >
          المشاريع <span>04</span>
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/contact");
          }}
        >
          تواصل <span>05</span>
        </button>
      </div>

      {currentRoute === "/" ? (
        <main>
          <div className="dark-opening" id="home">
            <section className="hero">
              {!wavesFailed && (
                <Suspense fallback={null}>
                  <ShapeWaves
                    className="hero-waves"
                    shapes="mixed"
                    cellSize={15}
                    dotSize={0.58}
                    color="#c9b7a4"
                    hoverColor="#c6e7c9"
                    backgroundColor="#332720"
                    speed={0.6}
                    brightness={0.55}
                    glow={0.18}
                    fade={0.12}
                    splashStrength={0.35}
                    onError={() => setWavesFailed(true)}
                  />
                </Suspense>
              )}
              <div className="hero-grain" />
              <div className="hero-word hero-first">علي</div>
              <div className="hero-word hero-last">سهيل</div>
              <div className="hero-person">
                <img src="/assets/ali-cutout.png" alt="علي سهيل" />
              </div>
              <div className="hero-mini-note">
                <span className="note-dot" />{" "}
                <DecryptedText
                  text="علي سهيل الكحلوت / مطوّر Full-Stack وذكاء اصطناعي"
                  speed={32}
                  maxIterations={12}
                  animateOn="hover"
                />
              </div>
              <Magnet padding={40} magnetStrength={2.6}>
                <button
                  className="hero-scroll"
                  onClick={() => navigate("/about")}
                >
                  اكتشف أكثر <ArrowDown size={15} />
                </button>
              </Magnet>
            </section>
            <section className="entry-deck" aria-label="استكشف الموقع">
              {/* البطاقة الأولى: من الفكرة للكود -> /process */}
              <button
                className="entry-card entry-tools"
                onClick={() => navigate("/process")}
              >
                <div className="entry-icons">
                  {technologies.slice(0, 4).map((item) => (
                    <TechIcon key={item.label} item={item} mini />
                  ))}
                </div>
                <span>الأدوات اللي ببني بها</span>
                <strong>من الفكرة للكود.</strong>
                <ArrowUpLeft size={18} />
              </button>

              {/* المجلد الأول: المشاريع -> /projects */}
              <div
                className="entry-card-folder"
                onClick={() => navigate("/projects")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/projects")}
              >
                <div className="entry-folder-header">
                  <span className="entry-badge">01 / 12</span>
                  <span>مختارات من أعمالي</span>
                  <ArrowUpLeft size={16} />
                </div>
                <div className="entry-folder-stage">
                  <Suspense
                    fallback={<div className="folder-loading">المشاريع...</div>}
                  >
                    <FolderBox
                      label="المشاريع"
                      color="#ffffff"
                      paperColor="#9e662c"
                      mode="flap"
                      variant="solid"
                      size={0.88}
                      openOn="hover"
                      items={projectFolderItems}
                      onItemClick={() => navigate("/projects")}
                    />
                  </Suspense>
                </div>
                <div className="entry-folder-footer">
                  <strong>المشاريع</strong>
                  <small>افتح معرض الأعمال ↗</small>
                </div>
              </div>

              {/* المجلد الثاني: أبني حلولًا -> /about */}
              <div
                className="entry-card-folder"
                onClick={() => navigate("/about")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/about")}
              >
                <div className="entry-folder-header">
                  <span className="entry-badge">FULL-STACK × AI</span>
                  <span>من غزة، إلى العالم</span>
                  <ArrowUpLeft size={16} />
                </div>
                <div className="entry-folder-stage">
                  <Suspense
                    fallback={<div className="folder-loading">أبني حلولًا...</div>}
                  >
                    <FolderBox
                      label="أبني حلولًا"
                      color="#ffffff"
                      paperColor="#9e662c"
                      mode="flap"
                      variant="solid"
                      size={0.88}
                      openOn="hover"
                      items={solutionFolderItems}
                      onItemClick={() => navigate("/about")}
                    />
                  </Suspense>
                </div>
                <div className="entry-folder-footer">
                  <strong>أبني حلولًا</strong>
                  <small>لأفكار تستحق النجاح ↗</small>
                </div>
              </div>

              {/* المجلد الثالث: عندك فكرة؟ -> /contact */}
              <div
                className="entry-card-folder"
                onClick={() => navigate("/contact")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}
              >
                <div className="entry-folder-header">
                  <span className="entry-badge">HELLO@ALI</span>
                  <span>لنبدأ من هنا</span>
                  <ArrowUpLeft size={16} />
                </div>
                <div className="entry-folder-stage">
                  <Suspense
                    fallback={<div className="folder-loading">عندك فكرة؟...</div>}
                  >
                    <FolderBox
                      label="عندك فكرة؟"
                      color="#ffffff"
                      paperColor="#9e662c"
                      mode="flap"
                      variant="solid"
                      size={0.88}
                      openOn="hover"
                      items={contactFolderItems}
                      onItemClick={() => navigate("/contact")}
                    />
                  </Suspense>
                </div>
                <div className="entry-folder-footer">
                  <strong>عندك فكرة؟</strong>
                  <small>خلّينا نحكي عنها ↗</small>
                </div>
              </div>
            </section>
          </div>

          <AboutSection />
          <ProcessSection />
          <ProjectsSection
            filter={filter}
            setFilter={setFilter}
            onNavigateContact={() => navigate("/contact")}
          />
          <ContactSection
            form={form}
            setForm={setForm}
            sendEmail={sendEmail}
            onHome={() => goTo("home")}
          />
        </main>
      ) : (
        <div className="subpage-container">
          {currentRoute === "/about" && (
            <>
              <div className="subpage-nav-bar">
                <button
                  className="subpage-back-link"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للرئيسية
                </button>
                <span className="subpage-nav-crumb">/about • من غزة إلى العالم</span>
              </div>
              <AboutSection />
              <div className="subpage-bottom-actions">
                <button
                  className="subpage-back-pill"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للصفحة الرئيسية
                </button>
              </div>
            </>
          )}

          {currentRoute === "/process" && (
            <>
              <div className="subpage-nav-bar">
                <button
                  className="subpage-back-link"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للرئيسية
                </button>
                <span className="subpage-nav-crumb">/process • من الفكرة للكود</span>
              </div>
              <ProcessSection />
              <div className="subpage-bottom-actions">
                <button
                  className="subpage-back-pill"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للصفحة الرئيسية
                </button>
              </div>
            </>
          )}

          {currentRoute === "/projects" && (
            <>
              <div className="subpage-nav-bar">
                <button
                  className="subpage-back-link"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للرئيسية
                </button>
                <span className="subpage-nav-crumb">/projects • المشاريع والأعمال</span>
              </div>
              <ProjectsSection
                filter={filter}
                setFilter={setFilter}
                onNavigateContact={() => navigate("/contact")}
              />
              <div className="subpage-bottom-actions">
                <button
                  className="subpage-back-pill"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للصفحة الرئيسية
                </button>
              </div>
            </>
          )}

          {currentRoute === "/contact" && (
            <>
              <div className="subpage-nav-bar">
                <button
                  className="subpage-back-link"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للرئيسية
                </button>
                <span className="subpage-nav-crumb">/contact • عندك فكرة؟</span>
              </div>
              <ContactSection
                form={form}
                setForm={setForm}
                sendEmail={sendEmail}
                onHome={() => navigate("/")}
              />
              <div className="subpage-bottom-actions">
                <button
                  className="subpage-back-pill"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} /> العودة للصفحة الرئيسية
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </ClickSpark>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <PortfolioApp />
    </TransitionProvider>
  );
}
