import {
  ArrowDown,
  ArrowLeft,
  ArrowUpLeft,
  Bot,
  Briefcase,
  CheckCircle2,
  Github,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
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
import ClickSpark from "./component/ClickSpark";
import DecryptedText from "./component/DecryptedText";
import Magnet from "./component/Magnet";
import SpotlightCard from "./component/SpotlightCard";

const CardSwap = lazy(() => import("./component/CardSwap"));
const Lanyard = lazy(() => import("./component/Lanyard"));
const SplineScene = lazy(() => import("./component/SplineScene"));
const FinanceBentoDemo = lazy(() => import("./components/ui/demo"));
const PerspectiveTunnelHero = lazy(() => import("./components/ui/perspective-tunnel-hero"));
import type { CardSwapItem } from "./component/CardSwap";
import { LiquidNavbar, NimbusIcons } from "./components/ui/liquid-glass-navbar";
import type { LiquidNavItem } from "./components/ui/liquid-glass-navbar";
import { GlassFolder } from "./components/ui/glass-folder-cards";

const details = {
  name: "علي سهيل الكحلوت",
  role: "Full-Stack Engineer & AI Solutions Architect",
  location: "غزة، فلسطين 🇵🇸",
  email: "shylmm086@gmail.com",
  phone: "+972 56 750 8786",
  whatsappUrl: "https://wa.me/972567508786?text=" + encodeURIComponent("مرحباً علي، أرغب في مناقشة مشروع برمجي جديد معك."),
  github: "https://github.com/d11fy",
  instagram: "https://instagram.com/d11fy",
};

export type Project = {
  title: string;
  arabic: string;
  category: "ذكاء اصطناعي" | "أنظمة SaaS" | "تجارة رقمية" | "منصات تعليمية" | "مواقع وهوية";
  tag: string;
  url: string;
  image: string;
  tech: string[];
  description: string;
};

const allProjects: Project[] = [
  {
    title: "Alosh Store",
    arabic: "متجر المنتجات والاشتراكات الرقمية",
    category: "تجارة رقمية",
    tag: "E-COMMERCE / SAAS",
    url: "https://aloshstore.com/",
    image: "/assets/real-alosh-store.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "Payment Gateways"],
    description: "منصة تجارة رقمية متكاملة لبيع الاشتراكات والمنتجات مع ربط بوابات الدفع والتسليم الفوري الآلي.",
  },
  {
    title: "AI WhatsApp CRM",
    arabic: "نظام ذكي لإدارة العملاء والمبيعات",
    category: "ذكاء اصطناعي",
    tag: "AI / SAAS",
    url: "https://crm-ai-whatsapp22.vercel.app/",
    image: "/assets/real-whatsapp-crm.png",
    tech: ["OpenAI API", "WhatsApp Business", "Next.js", "Supabase"],
    description: "وكيل ذكاء اصطناعي مستقل يقوم بالرد الفوري على استفسارات العملاء، إتمام الطلبات، وتصنيف المحادثات آلياً.",
  },
  {
    title: "ATHAR",
    arabic: "أثر للحلول الرقمية وتطوير الأعمال",
    category: "مواقع وهوية",
    tag: "CORPORATE",
    url: "https://atherv1.vercel.app/ar",
    image: "/assets/real-athar.png",
    tech: ["React", "Next.js", "GSAP Motion", "Tailwind"],
    description: "منصة رقمية ذات هوية بصرية متميزة للشركات والمؤسسات، مصممة بأعلى معايير السرعة وسلاسة الحركة.",
  },
  {
    title: "CoreX",
    arabic: "حلول برمجية ونظم ذكاء اصطناعي",
    category: "مواقع وهوية",
    tag: "AGENCY / AI",
    url: "https://corex1-puce.vercel.app/ar",
    image: "/assets/real-corex.png",
    tech: ["Next.js 15", "TypeScript", "3D WebGL", "Tailwind"],
    description: "موقع تفاعلي حديث لوكالة حلول برمجية وذكاء اصطناعي يعكس المستقبل الرقمي مع تأثيرات حركية متطورة.",
  },
  {
    title: "CLICK STORE",
    arabic: "سوق الاشتراكات والبطاقات الرقمية",
    category: "تجارة رقمية",
    tag: "MARKETPLACE",
    url: "https://clickstorev2.vercel.app/",
    image: "/assets/real-clickstore.png",
    tech: ["React", "Supabase", "REST API", "Tailwind"],
    description: "سوق إلكتروني سريع لشراء وتوزيع البطاقات الرقمية والأكواد مع لوحة تحكم ذكية لإدارة البائعين والمخزون.",
  },
  {
    title: "SABA STORE",
    arabic: "منصة لإنشاء وإدارة المتاجر السحابية",
    category: "أنظمة SaaS",
    tag: "SAAS PLATFORM",
    url: "https://sub-store-platform.vercel.app/",
    image: "/assets/real-saba-store.png",
    tech: ["Multi-tenant", "Next.js", "PostgreSQL", "Tailwind"],
    description: "نظام SaaS متقدم يمكّن التجار من إطلاق متاجرهم المستقلة في دقائق مع إدارة المخزون والمبيعات والفواتير.",
  },
  {
    title: "CoachPro",
    arabic: "منصة تدريب ولياقة رقمية متكاملة",
    category: "أنظمة SaaS",
    tag: "FITNESS SAAS",
    url: "https://bodybuilding-system.vercel.app/",
    image: "/assets/real-coachpro.png",
    tech: ["Next.js", "Supabase Auth", "Chart.js", "Tailwind"],
    description: "تطبيق ويب متكامل للمدربين والرياضيين لإدارة الجداول الغذائية والتدريبية ومتابعة التطور البدني بالأرقام.",
  },
  {
    title: "Gaza Pathways",
    arabic: "منصة مسارات للدراسة والتعليم التفاعلي",
    category: "منصات تعليمية",
    tag: "EDTECH",
    url: "https://masart.study/",
    image: "/assets/real-masart.png",
    tech: ["Next.js", "Video Streaming", "Interactive LMS"],
    description: "بيئة تعليمية ذكية تدعم آلاف الطلاب بمحتوى دراسي منظم، اختبارات تفاعلية، ولوحات تحصيل دراسي فورية.",
  },
  {
    title: "Digital Academy",
    arabic: "أكاديمية رقمية تفاعلية",
    category: "منصات تعليمية",
    tag: "EDUCATION",
    url: "https://alosh.nzmly.com/",
    image: "/assets/real-digital-academy.png",
    tech: ["React", "LMS API", "Responsive UI"],
    description: "أكاديمية تدريبية متخصصة في تأهيل الكفاءات وتطوير المهارات البرمجية والمهنية عبر مسارات تطبيقية.",
  },
  {
    title: "AI Builder",
    arabic: "برنامج تعلم البرمجة بالذكاء الاصطناعي",
    category: "ذكاء اصطناعي",
    tag: "AI / EDUCATION",
    url: "https://ai-builder-gray.vercel.app/",
    image: "/assets/real-ai-builder.png",
    tech: ["OpenAI Code Gen", "Next.js", "Monaco Editor"],
    description: "أداة تعليمية تفاعلية تمكن المبتدئين من إنشاء وبرمجة تطبيقاتهم عبر حوارات ذكية مع نماذج الذكاء الاصطناعي.",
  },
];

const featuredSwapItems: CardSwapItem[] = allProjects.slice(0, 6).map((p) => ({
  title: p.title,
  subtitle: p.arabic,
  tag: p.tag,
  image: p.image,
  url: p.url,
  mark: p.title.slice(0, 2),
}));

const techStack = [
  { name: "Next.js 15", icon: siNextdotjs, desc: "تطبيقات Full-Stack فائقة السرعة" },
  { name: "React 19", icon: siReact, desc: "واجهات مستخدم تفاعلية وسلسة" },
  { name: "TypeScript", icon: siTypescript, desc: "كود آمن وخالٍ من الأخطاء" },
  { name: "Supabase", icon: siSupabase, desc: "قواعد بيانات وأمان لحظي" },
  { name: "AI Automations", icon: null, lucide: Bot, desc: "OpenAI & وكلاء أذكياء" },
  { name: "Flutter", icon: siFlutter, desc: "تطبيقات جوال مشتركة للأجهزة" },
  { name: "Figma", icon: siFigma, desc: "تصميم واجهات وتجربة مستخدم" },
  { name: "GitHub & CI/CD", icon: siGithub, desc: "إدارة مشاريع ونشر آلي" },
];

function FloatingDock({ currentRoute, navigate }: { currentRoute: string; navigate: (r: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route: string) => {
    setMobileOpen(false);
    navigate(route);
  };

  const navItems: LiquidNavItem[] = [
    { label: "الرئيسية", icon: NimbusIcons.home, fx: "glow" },
    { label: "عنّي", icon: NimbusIcons.user, fx: "wave" },
    { label: "المشاريع", icon: NimbusIcons.globe, fx: "spin" },
    { label: "الأدوات", icon: NimbusIcons.plane, fx: "plane" },
    { label: "تواصل", icon: NimbusIcons.drop, fx: "drop" },
  ];
  const routes = ["/", "/about", "/projects", "/process", "/contact"];
  const activeIndex = routes.indexOf(currentRoute) >= 0 ? routes.indexOf(currentRoute) : 0;

  return (
    <>
      <div className="floating-dock-wrapper">
        <nav className="floating-dock" aria-label="التنقل الرئيسي">
          <Magnet padding={20} magnetStrength={2}>
            <button
              className="dock-brand"
              onClick={() => handleNav("/")}
              aria-label="الرئيسية"
            >
              <span className="brand-dot" />
              <span>AS / ALOSH</span>
            </button>
          </Magnet>

          <div className="dock-nav-links" dir="ltr">
            <LiquidNavbar
              items={navItems}
              active={activeIndex}
              onChange={(index) => handleNav(routes[index])}
              tone="dark"
            />
          </div>

          <div className="dock-divider" />

          <Magnet padding={20} magnetStrength={2}>
            <a
              href={details.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="dock-whatsapp-btn"
            >
              <span className="dock-whatsapp-pulse" />
              <MessageCircle size={15} />
              <span>واتساب مباشر</span>
            </a>
          </Magnet>

          <button
            className="dock-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      <div className={`mobile-menu-screen ${mobileOpen ? "open" : ""}`}>
        <button className={`mobile-nav-link ${currentRoute === "/" ? "active" : ""}`} onClick={() => handleNav("/")}>
          الرئيسية <span>01</span>
        </button>
        <button className={`mobile-nav-link ${currentRoute === "/about" ? "active" : ""}`} onClick={() => handleNav("/about")}>
          عنّي وتخصصاتي <span>02</span>
        </button>
        <button className={`mobile-nav-link ${currentRoute === "/projects" ? "active" : ""}`} onClick={() => handleNav("/projects")}>
          المشاريع الرقمية <span>03</span>
        </button>
        <button className={`mobile-nav-link ${currentRoute === "/process" ? "active" : ""}`} onClick={() => handleNav("/process")}>
          منهجية التطوير <span>04</span>
        </button>
        <button className={`mobile-nav-link ${currentRoute === "/contact" ? "active" : ""}`} onClick={() => handleNav("/contact")}>
          تواصل معي <span>05</span>
        </button>
      </div>
    </>
  );
}

function HeroSection({ onExploreProjects }: { onExploreProjects: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx alosh-portfolio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-wrapper" id="home">
      <div className="hero-content">
        <div className="hero-text-side">
          <div className="hero-badge-row">
            <div className="status-pill">
              <span className="status-dot-pulse" />
              <span>متاح للمشاريع الجديدة والتعاقد</span>
            </div>
            <div className="location-pill">
              <span>{details.location}</span>
            </div>
          </div>

          <h1 className="hero-title">
            أهندس حلولاً برمجية ذكية،
            <br />
            <span className="hero-title-highlight">وتجارب رقمية تصنع فارقاً.</span>
          </h1>

          <p className="hero-desc">
            أنا <strong>علي سهيل الكحلوت</strong>، مهندس برمجيات ومطوّر ذكاء اصطناعي.
            أدمج دقة كود <strong>Full-Stack</strong> مع إمكانيات نماذج <strong>AI</strong> الحديثة
            لبناء منتجات ويب وتطبيقات SaaS فائقة السرعة، آمنة، وقابلة للتوسع.
          </p>

          <div className="hero-cta-group">
            <Magnet padding={30} magnetStrength={2}>
              <a
                href={details.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={18} />
                <span>محادثة واتساب مباشرة</span>
                <ArrowUpLeft size={18} />
              </a>
            </Magnet>

            <Magnet padding={30} magnetStrength={2}>
              <button onClick={onExploreProjects} className="btn-secondary">
                <Briefcase size={18} />
                <span>استكشف المشاريع (+10)</span>
                <ArrowDown size={16} />
              </button>
            </Magnet>

            <button onClick={copyCommand} className="terminal-pill" title="انسخ الأمر">
              <Terminal size={14} />
              <span><span className="prefix">$</span> npx alosh-portfolio</span>
              {copied && <span style={{ color: "#10b981" }}>✓ تم النسخ</span>}
            </button>
          </div>
        </div>

        <div className="hero-visual-side">
          <div className="hero-tech-card">
            <div className="tech-card-header">
              <div className="tech-card-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="tech-card-title">
                <DecryptedText text="DEV_STATUS // VERIFIED" speed={28} maxIterations={10} animateOn="view" />
              </span>
            </div>

            <div className="tech-card-portrait">
              <img src="/assets/ali-official.jpg" alt="علي سهيل الكحلوت" />
              <div className="portrait-glow-overlay" />
              <div className="portrait-role-badge">
                <strong>علي سهيل الكحلوت</strong>
                <span>Full-Stack & AI</span>
              </div>
            </div>

            <div className="tech-card-code">
              <div><span className="code-keyword">const</span> engineer = &#123;</div>
              <div style={{ paddingLeft: "14px" }}>
                name: <span className="code-str">"Ali Sohail"</span>,
              </div>
              <div style={{ paddingLeft: "14px" }}>
                focus: [<span className="code-str">"Next.js 15"</span>, <span className="code-str">"AI Automations"</span>],
              </div>
              <div style={{ paddingLeft: "14px" }}>
                mission: <span className="code-str">"Turning complexity into elegant software"</span>
              </div>
              <div>&#125;;</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-metrics-strip">
        <div className="metric-item">
          <span className="metric-number">+10</span>
          <span className="metric-label">مشاريع وتطبيقات مكتملة</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">100%</span>
          <span className="metric-label">التزام بمواعيد الإطلاق والجودة</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">Full-Stack</span>
          <span className="metric-label">من واجهات المستخدم حتى الخوادم والـ AI</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">SaaS & CRM</span>
          <span className="metric-label">أنظمة مبيعات وأتمتة رقمية ذكية</span>
        </div>
      </div>
    </section>
  );
}

function BentoAboutSection() {
  return (
    <section className="section-wrapper" id="about">
      <div className="section-header">
        <div className="section-kicker">
          <span>01</span> / عنّي وتخصصاتي
        </div>
        <h2 className="section-title">
          من غزة إلى العالم: هندسة تقنية بمعايير عالمية.
        </h2>
        <p className="section-subtitle">
          أؤمن بأن التحديات تصنع قوة المطور. كل سطر كود أكتبه يهدف لخدمة فكرة حقيقية
          وخلق قيمة ملموسة للشركات والمستخدمين.
        </p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Main Story */}
        <div className="bento-card bento-main-story">
          <div>
            <span className="bento-tag">ENGINEER PHILOSOPHY</span>
            <h3 className="bento-title">الكود وسيلة، والنتيجة هي الأثر.</h3>
            <p className="bento-text">
              بدأت رحلتي البرمجية من غزة، وطوّرت مهاراتي بالعمل على مشاريع متنوعة تشمل
              متاجر رقمية متكاملة، أنظمة CRM مدعومة بنماذج لغوية ذكية، ومنصات تعليمية
              تخدم آلاف الطلاب. هدفي دائماً ليس مجرد تسليم المشروع، بل جعله سريعاً، جذاباً،
              ومربحاً لصاحبه.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span className="project-tag" style={{ color: "var(--color-primary)" }}>✓ React 19 & Next.js 15</span>
            <span className="project-tag" style={{ color: "var(--color-primary-hover)" }}>✓ OpenAI & AI Agents</span>
            <span className="project-tag" style={{ color: "var(--color-text-secondary)" }}>✓ Modern UI/UX Architecture</span>
          </div>
        </div>

        {/* Card 2: 3D Dev Pass */}
        <div className="bento-card bento-lanyard-stage">
          <div className="lanyard-card-inner">
            <Suspense
              fallback={
                <div style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>
                  جاري تشغيل بطاقة الاعتماد ثلاثية الأبعاد...
                </div>
              }
            >
              <Lanyard
                frontImage="/assets/ali-official.jpg"
                elasticity={0.4}
                strapLength={0.72}
                cornerRadius={0.22}
                cardColor="#2D2424"
                strapColor="#FF503C"
                size={0.62}
                interactive={true}
                intro={true}
              />
            </Suspense>
          </div>
        </div>

        {/* Card 3: Tech Matrix */}
        <div className="bento-card bento-tech-matrix">
          <span className="bento-tag">TECH STACK MATRIX</span>
          <h3 className="bento-title">الأدوات التي أتقنها وأبني بها</h3>
          <p className="bento-text" style={{ marginBottom: "10px" }}>
            أختار الأدوات الحديثة والمستقرة لضمان أفضل تجربة للمستخدم وأعلى أداء خادم:
          </p>

          <div className="tech-grid-items">
            {techStack.map((tech) => (
              <SpotlightCard
                key={tech.name}
                spotlightColor="rgba(56, 189, 248, 0.25)"
                className="tech-matrix-item"
              >
                {tech.icon ? (
                  <svg className="tech-matrix-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={tech.icon.path} />
                  </svg>
                ) : tech.lucide ? (
                  <tech.lucide className="tech-matrix-icon" size={24} />
                ) : null}
                <span>{tech.name}</span>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Card 4: Quality Pillars */}
        <div className="bento-card bento-pillars">
          <div>
            <span className="bento-tag">ENGINEERING STANDARDS</span>
            <h3 className="bento-title">ركائز الجودة في كل مشروع</h3>
          </div>

          <div className="pillars-list">
            <div className="pillar-item">
              <div className="pillar-icon">
                <Zap size={18} />
              </div>
              <div>
                <h5>أداء فائق وسرعة تحميل 60fps</h5>
                <p>تحسين كود الواجهة والـ Core Web Vitals لتجربة خالية من التقطيع.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon" style={{ color: "var(--color-primary)", background: "rgba(255, 80, 60, 0.12)" }}>
                <Bot size={18} />
              </div>
              <div>
                <h5>ذكاء اصطناعي وأتمتة فعالة</h5>
                <p>ربط النماذج الذكية بأعمالك لتوفير الوقت وزيادة المبيعات والتحويل.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon" style={{ color: "var(--color-primary-hover)", background: "rgba(255, 116, 99, 0.12)" }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <h5>كود نظيف وقابل للتوسع</h5>
                <p>بنية معمارية متينة تسهل إضافة المميزات دون إعادة بناء النظام.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState<string>("الكل");

  const categories = ["الكل", "ذكاء اصطناعي", "أنظمة SaaS", "تجارة رقمية", "منصات تعليمية", "مواقع وهوية"];

  const filteredProjects = activeFilter === "الكل"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="section-wrapper" id="projects">
      <div className="section-header">
        <div className="section-kicker">
          <span>02</span> / معرض الأعمال
        </div>
        <h2 className="section-title">
          مشاريع حقيقية تصنع أثراً وقيمة.
        </h2>
        <p className="section-subtitle">
          مجموعة مختارة من الأنظمة والمواقع وتطبيقات الـ SaaS التي قمت بتطويرها.
          جميع المشاريع تعمل على بيئات إنتاج حقيقية ومتاحة للمعاينة المباشرة.
        </p>
      </div>

      {/* 3D Showcase Deck */}
      <div className="card-swap-stage-wrapper">
        <div className="showcase-stage-header">
          <span className="showcase-badge">
            <Sparkles size={14} /> معرض الواجهات التفاعلي — ثلاثي الأبعاد
          </span>
          <h3 className="showcase-stage-title">استكشف واجهات المشاريع ثلاثية الأبعاد</h3>
          <p className="showcase-stage-desc">
            اسحب البطاقات بالماوس أو حرّكها للتنقل بين واجهات وتطبيقات المشاريع
          </p>
        </div>

        <div className="card-swap-container">
          <Suspense
            fallback={
              <div style={{ color: "#64748b", padding: "40px" }}>
                جاري تحميل معرض المشاريع ثلاثي الأبعاد...
              </div>
            }
          >
            <CardSwap
              items={featuredSwapItems}
              width={480}
              height={340}
              cardDistance={52}
              verticalDistance={55}
              depth={85}
              skewAmount={4}
              visibleCards={4}
              delay={4200}
              autoplay={true}
              pauseOnHover={true}
              draggable={true}
              theme="dark"
              cardRadius={20}
            />
          </Suspense>
        </div>
      </div>

      {/* 3D Glass Folders Archive */}
      <div className="folders-showcase-wrapper">
        <div className="folders-header">
          <h3 className="folders-title">أرشيف المشاريع ثلاثي الأبعاد</h3>
          <p className="folders-subtitle">
            انقر على أي مجلد لتفتحه في مساحة ثلاثية الأبعاد، واستكشف ملفات الأنظمة والروابط الحية لكل مشروع
          </p>
        </div>

        <div className="folders-grid">
          <GlassFolder
            label="حلول الذكاء الاصطناعي"
            meta="3 أنظمة ذكية مباشرة"
            tone="dark"
            art="aurora"
            width={330}
            files={[
              { name: "AI WhatsApp CRM", meta: "وكيل الرد والمبيعات", href: "https://crm-ai-whatsapp22.vercel.app/" },
              { name: "AI Builder", meta: "أداة برمجة التطبيقات", href: "https://ai-builder-gray.vercel.app/" },
              { name: "OpenAI Logic Core", meta: "نواة المعالجة اللغوية" },
            ]}
          />

          <GlassFolder
            label="أنظمة SaaS والتجارة"
            meta="متاجر وبوابات دفع"
            tone="dark"
            art="glacier"
            width={330}
            files={[
              { name: "Alosh Store", meta: "متجر الاشتراكات الرقمية", href: "https://aloshstore.com/" },
              { name: "Automated Payment Gateways", meta: "Stripe & FastPay" },
              { name: "Real-time Order Dispatch", meta: "تسليم فوري للمنتجات" },
            ]}
          />

          <GlassFolder
            label="المنصات وهوية الشركات"
            meta="مواقع وتجارب WebGL"
            tone="dark"
            art="ember"
            width={330}
            files={[
              { name: "ATHAR Platform", meta: "أثر لحلول الأعمال", href: "https://atherv1.vercel.app/ar" },
              { name: "CoreX Agency", meta: "حلول برمجية وهوية مؤسسية", href: "https://corex1-puce.vercel.app/ar" },
              { name: "Digital Training Academy", meta: "منصة تدريب المهارات", href: "https://alosh.nzmly.com/" },
            ]}
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="projects-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rich Project Cards Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-thumbnail">
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="project-thumb-overlay" />
              <span className="project-type-badge">{project.tag}</span>
            </div>

            <div className="project-body">
              <div>
                <div className="project-title-row">
                  <h4 className="project-title">{project.title}</h4>
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-primary)", marginBottom: "6px", fontWeight: "600" }}>
                  {project.arabic}
                </p>
                <p className="project-desc">{project.description}</p>
              </div>

              <div>
                <div className="project-tags-list">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>

                <div className="project-footer-row">
                  <span className="project-status">
                    <CheckCircle2 size={14} />
                    <span>مباشر على السيرفر</span>
                  </span>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-btn"
                  >
                    <span>معاينة المشروع</span>
                    <ArrowUpLeft size={16} />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinanceBentoSection() {
  return (
    <section className="finance-fullpage-section" id="finance-bento">
      <div className="finance-fullpage-inner">
        <div className="section-header">
          <div className="section-kicker">
            <span>03</span> / أنظمة SaaS والبيانات المالية
          </div>
          <h2 className="section-title">
            لوحة بيانات مالية تفاعلية فائقة السرعة بـ 60fps.
          </h2>
          <p className="section-subtitle">
            هندسة واجهات SaaS مالية متكاملة تدمج الرسوم البيانية اللحظية، محاكاة حركة السيولة النقدية، وتوزيع المحافظ الرقمية والأصول بدقة متناهية.
          </p>
        </div>

        <div className="finance-bento-stage full-page">
          <Suspense
            fallback={
              <div style={{ display: "grid", placeItems: "center", minHeight: "500px", color: "var(--color-primary)" }}>
                <span>جاري تحميل لوحة البيانات المالية التفاعلية...</span>
              </div>
            }
          >
            <FinanceBentoDemo />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function InnovationLabSection({ onNavigateContact }: { onNavigateContact: () => void }) {
  return (
    <section className="section-wrapper" id="lab">
      <div className="section-header">
        <div className="section-kicker">
          <span>04</span> / مختبر 3D & AI
        </div>
        <h2 className="section-title">
          مختبر الواجهات الذكية والـ WebGL.
        </h2>
        <p className="section-subtitle">
          هنا ندمج محركات الـ WebGL مع واجهات المستقبل لخلق تجارب استثنائية تميز منتجك في السوق.
        </p>
      </div>

      <div className="lab-card-wrapper">
        <div className="lab-meta">
          <span className="bento-tag">WEBGL & INTELLIGENCE LAB</span>
          <h3 className="lab-title">
            تجارب بصرية تفاعلية تفوق التوقعات.
          </h3>
          <p className="lab-desc">
            أستخدم تقنيات مثل Spline و Three.js و Matter.js لبناء عناصر ومحاكاة ثلاثية الأبعاد
            تتفاعل مع حركة المؤشر ولمسات المستخدم وتمنح تطبيقك طابعاً مستقبلياً رفيع المستوى.
          </p>

          <div className="lab-specs-grid">
            <div className="lab-spec-box">
              <h5><Zap size={15} color="var(--color-primary)" /> سرعة أداء 60fps</h5>
              <p>استهلاك منخفض لموارد المعالج وتوافق مع الهواتف.</p>
            </div>
            <div className="lab-spec-box">
              <h5><Bot size={15} color="var(--color-primary-hover)" /> أتمتة AI مدمجة</h5>
              <p>تكامل مباشر مع روبوتات ووكلاء الـ AI الذاتية.</p>
            </div>
          </div>

          <div>
            <Magnet padding={30} magnetStrength={2}>
              <button onClick={onNavigateContact} className="btn-primary">
                <span>اطلب تجربة 3D لمشروعك</span>
                <ArrowUpLeft size={18} />
              </button>
            </Magnet>
          </div>
        </div>

        <div className="lab-3d-stage">
          <Suspense
            fallback={
              <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#64748b" }}>
                <span>جاري تحميل المشهد ثلاثي الأبعاد...</span>
              </div>
            }
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              hintText=""
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`طلب تعاون جديد من ${form.name}`);
    const body = encodeURIComponent(`الاسم: ${form.name}\nالبريد: ${form.email}\n\nالرسالة:\n${form.message}`);
    window.location.href = `mailto:${details.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section-wrapper" id="contact">
      <div className="section-header">
        <div className="section-kicker">
          <span>05</span> / تواصل معي
        </div>
        <h2 className="section-title">
          عندك فكرة أو مشروع؟ دعنا نحولها لكود وواقع.
        </h2>
        <p className="section-subtitle">
          سواء كنت تبحث عن مطور Full-Stack لبناء منتجك من الصفر، أو ترغب في دمج الذكاء الاصطناعي
          في نظامك القائم، يسعدني التحدث معك.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-panel">
          {/* Direct WhatsApp High-Converting Card */}
          <a
            href={details.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="contact-direct-card whatsapp"
          >
            <div className="contact-icon-bubble">
              <MessageCircle size={24} />
            </div>
            <div className="contact-card-text">
              <span>تواصل مباشر عبر واتساب (الرد الأسرع)</span>
              <strong>{details.phone}</strong>
            </div>
            <ArrowUpLeft size={20} style={{ marginRight: "auto" }} />
          </a>

          <a href={`mailto:${details.email}`} className="contact-direct-card">
            <div className="contact-icon-bubble">
              <Mail size={24} />
            </div>
            <div className="contact-card-text">
              <span>البريد الإلكتروني المباشر</span>
              <strong>{details.email}</strong>
            </div>
            <ArrowUpLeft size={20} style={{ marginRight: "auto" }} />
          </a>

          <div className="social-links-row">
            <a href={details.github} target="_blank" rel="noreferrer" className="social-btn">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href={details.instagram} target="_blank" rel="noreferrer" className="social-btn">
              <Instagram size={18} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>الاسم الكامل</label>
              <input
                required
                className="form-input"
                placeholder="كيف أناديك؟"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                required
                type="email"
                className="form-input"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>تفاصيل الفكرة أو المشروع</label>
              <textarea
                required
                className="form-textarea"
                rows={4}
                placeholder="احكيلي عن تطبيقك، موعدك المتوقع، أو الميزات التي تحتاجها..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="form-submit-btn">
              <span>إرسال الرسالة وبدء المحادثة</span>
              <Send size={16} />
            </button>
            {sent && (
              <p style={{ color: "#10b981", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                ✓ سيتم فتح تطبيق البريد لديك فوراً لإرسال الرسالة.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-copy">
        <strong>{details.name} — {details.role}</strong>
        <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
      </div>

      <div className="footer-palestine-badge">
        <span>صُنع بشغف وإتقان من</span>
        <strong>غزة، فلسطين 🇵🇸</strong>
      </div>
    </footer>
  );
}

/* Dedicated Subpages */
function SubpageAbout({ onHome, onNavigateContact }: { onHome: () => void; onNavigateContact: () => void }) {
  return (
    <div className="subpage-container">
      <div className="subpage-breadcrumbs">
        <button onClick={onHome} className="breadcrumb-back-link">
          <ArrowLeft size={16} /> العودة للرئيسية
        </button>
        <span className="breadcrumb-current-tag">/about • عنّي وتخصصاتي</span>
      </div>
      <BentoAboutSection />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <button onClick={onNavigateContact} className="btn-primary">
          <span>دعنا نعمل معاً</span>
          <ArrowUpLeft size={18} />
        </button>
      </div>
    </div>
  );
}

function SubpageProjects({ onHome }: { onHome: () => void }) {
  return (
    <div className="subpage-container">
      <div className="subpage-breadcrumbs">
        <button onClick={onHome} className="breadcrumb-back-link">
          <ArrowLeft size={16} /> العودة للرئيسية
        </button>
        <span className="breadcrumb-current-tag">/projects • أرشيف المشاريع الكامل</span>
      </div>
      <ProjectsShowcaseSection />
    </div>
  );
}

function SubpageProcess({ onHome, onNavigateContact }: { onHome: () => void; onNavigateContact: () => void }) {
  return (
    <div className="subpage-container">
      <div className="subpage-breadcrumbs">
        <button onClick={onHome} className="breadcrumb-back-link">
          <ArrowLeft size={16} /> العودة للرئيسية
        </button>
        <span className="breadcrumb-current-tag">/process • منهجية التطوير من الفكرة للكود</span>
      </div>

      <section className="section-wrapper">
        <div className="section-header">
          <div className="section-kicker">WORKFLOW</div>
          <h2 className="section-title">كيف نحول الفكرة إلى منتج برمجي ناجح؟</h2>
          <p className="section-subtitle">
            خطوات واضحة ومنظمة تضمن لك تسليم كود متقن وتجربة استخدام تزيد مبيعاتك.
          </p>
        </div>

        <div className="process-timeline">
          <div className="process-step-card">
            <span className="process-step-number">01</span>
            <h4>الاستكشاف والتخطيط</h4>
            <p>فهم أهداف المشروع، دراسة سلوك المستخدمين، وتحديد الهيكل البرمجي والتقنيات الأنسب.</p>
          </div>

          <div className="process-step-card">
            <span className="process-step-number">02</span>
            <h4>التصميم وهندسة الواجهات</h4>
            <p>بناء واجهات Figma عصرية مع نماذج تفاعلية ونظام تصميم (Design Tokens) متكامل.</p>
          </div>

          <div className="process-step-card">
            <span className="process-step-number">03</span>
            <h4>البرمجة ودمج الـ AI</h4>
            <p>كتابة كود نظيف بـ Next.js و TypeScript، مع ربط قواعد البيانات ووكلاء الذكاء الاصطناعي.</p>
          </div>

          <div className="process-step-card">
            <span className="process-step-number">04</span>
            <h4>الاختبار، النشر والنمو</h4>
            <p>فحص الأداء والأمان، إطلاق المشروع على سيرفرات سريعة، والمتابعة المستمرة لضمان النجاح.</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button onClick={onNavigateContact} className="btn-primary">
            <span>ابدأ مشروعك معنا الآن</span>
            <ArrowUpLeft size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function SubpageContact({ onHome }: { onHome: () => void }) {
  return (
    <div className="subpage-container">
      <div className="subpage-breadcrumbs">
        <button onClick={onHome} className="breadcrumb-back-link">
          <ArrowLeft size={16} /> العودة للرئيسية
        </button>
        <span className="breadcrumb-current-tag">/contact • ابدأ مشروعك الآن</span>
      </div>
      <ContactSection />
    </div>
  );
}

function PortfolioApp() {
  const { currentRoute, navigate } = usePageNavigation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentRoute]);

  const scrollToSection = (id: string) => {
    if (currentRoute !== "/") {
      navigate("/").then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ClickSpark sparkColor="#FF503C" sparkCount={8} sparkRadius={22} duration={400}>
      {/* Ambient Visual Atmosphere */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
        <div className="ambient-glow-3" />
        <div className="ambient-grid" />
      </div>

      <FloatingDock currentRoute={currentRoute} navigate={navigate} />

      {currentRoute === "/" && (
        <main>
          <HeroSection onExploreProjects={() => scrollToSection("spatial-tunnel")} />
          <Suspense fallback={<div className="h-screen w-full bg-[#191515] flex items-center justify-center text-[#FF503C] font-mono text-sm">جاري تجهيز ممر المشاريع ثلاثي الأبعاد...</div>}>
            <PerspectiveTunnelHero usePageScroll={true} subtitle="" />
          </Suspense>
          <BentoAboutSection />
          <ProjectsShowcaseSection />
          <FinanceBentoSection />
          <InnovationLabSection onNavigateContact={() => scrollToSection("contact")} />
          <ContactSection />
          <SiteFooter />
        </main>
      )}

      {currentRoute === "/about" && (
        <SubpageAbout onHome={() => navigate("/")} onNavigateContact={() => navigate("/contact")} />
      )}

      {currentRoute === "/projects" && (
        <SubpageProjects onHome={() => navigate("/")} />
      )}

      {currentRoute === "/process" && (
        <SubpageProcess onHome={() => navigate("/")} onNavigateContact={() => navigate("/contact")} />
      )}

      {currentRoute === "/contact" && (
        <SubpageContact onHome={() => navigate("/")} />
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
